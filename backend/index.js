const express = require("express");
const session = require("express-session");
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const cors = require('cors');
const { search, productInfo, updateStock, generateOrderNumber, searchOrders } = require('./utils/index');
const { User, Product, Order } = require('./models');
require('dotenv').config();


const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'https://allinsuplementos.vercel.app',
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
};
app.use(cors(corsOptions));


mongoose.connect(process.env.MONGODB_CONNECT_URL);

app.set('trust proxy', 1);

require('./connectMongoDB')()

app.post('/login', async (req, res) => {
    const { tel } = req.body;
    try {
        let user = await User.findOne({ tel });

        if (!user) {
            const newUser = new User({ tel });
            user = await newUser.save();
        }

        return res.json('Autenticação bem-sucedida');
    } catch (error) {
        console.error(error);
        return res.status(500).json('Erro ao processar a requisição');
    }
});

app.post('/check-auth', (req, res) => {
    const { tel } = req.body
    if (tel) {
        return res.json({ isAuthenticated: true });
    } else {
        return res.status(400).json({ isAuthenticated: false });
    }
});



app.post('/user', async (req, res) => {
    const { tel } = req.body
    try {
        const user = await User.findOne({ tel })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ isAuthenticated: false });
    }
})

app.patch('/update-user', async (req, res) => {
    try {
        const { address, tel } = req.body;

        await User.findOneAndUpdate({ tel }, { $set: { address } }, { new: true });

        return res.status(200).json("Usuario atualizado com sucesso.")
    } catch (error) {
        return res.status(400).json("algo deu errado.")
    }

});


app.delete('/delete-user', async (req, res) => {

    const { tel } = req.body
    try {
        const foundUser = User.findOne({ tel: tel })
        if (!foundUser) return res.status(404).json("Usuario nao encontrado.")

        await foundUser.deleteOne()

        return res.status(200).json("Sua conta foi deletada com sucesso.")
    } catch (error) {
        console.log(error)
        return res.status(400).json("ocorreu algum erro ao deletar sua conta.")
    }
})
app.get('/products', async (req, res) => {
    try {
        const { q, page = 1, limit } = req.query;
        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);

        const skip = (parsedPage - 1) * (parsedLimit ? parsedLimit : 10);


        const products = await Product.find().skip(skip).limit(parsedLimit || 10);

        return res.status(200).json(q ? search(products, q) : products);
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.get("/productBrand", async (req, res) => {
    try {

        const { brand, page = 1, limit } = req.query

        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);

        const skip = (parsedPage - 1) * (parsedLimit ? parsedLimit : 10);

        const products = await Product.find({ brand: brand.toLocaleLowerCase() }).skip(skip).limit(parsedLimit || 10)

        if (products.length === 0) {
            const products = await Product.find().skip(skip).limit(parsedLimit || 10)
            return res.status(201).json(products)
        }

        return res.status(201).json(products)
    } catch (error) {
        console.log(error)
        return res.status(400).json("algmo de errado")
    }
})


app.get('/ordersSearch', async (req, res) => {
    try {
        const { q, page = 1, limit } = req.query;
        const parsedPage = parseInt(page)
        const parsedLimit = parseInt(limit)

        const skip = (parsedPage - 1) * (parsedLimit ? parsedLimit : 10)

        const orders = await Order.find().skip(skip).limit(parsedLimit || 10)
        return res.status(200).json(q ? searchOrders(orders, q) : orders)

    } catch (error) {
        console.log(error)
        return res.status(400).json("algo deu errado")
    }
})

app.get('/products/highlight', async (req, res) => {
    try {
        const products = await Product.find({ highlight: { $exists: true, $ne: null, $type: 'number' } })
        return res.status(201).json(products)
    } catch (error) {
        console.log(error)
        return res.status(400)
    }
})

app.get('/productInfo', async (req, res) => {
    try {
        const { size, flavor, _id } = req.query
        const id = _id.replace(/,/g, '')
        const product = await Product.findOne({ _id: id });

        if (!product) return res.status(404).send("product not found")

        return res.status(200).send(productInfo(product, flavor, size))
    } catch (error) {
        console.log(error)
        return res.status(401).send("aaaaaaa")
    }
})

app.post('/newProduct', async (req, res) => {
    try {

        const { name, highlight, desc, brand, category, variants } = req.body

        const findProduct = await Product.findOne({ name, category })

        if (findProduct) return res.send("product already created!")

        const newProduct = new Product({ name, desc, highlight, brand, category, variants })
        await newProduct.save()

        return res.status(200).send({ newProduct, msg: "product created with successfully" })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})



const currentDay = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
};

app.post('/newOrder', async (req, res) => {
    try {
        const { price, products, extra, tel } = req.body;

        const user = await User.findOne({ tel });

        if (!user) {
            console.log(user, 'aaaa')
            return res.status(404).json("Usuário não encontrado.");
        }
        const { address } = user

        if (!address) return res.status(401).json("Endereço de entrega não encontrado")

        let orderId = generateOrderNumber()
        const foundOrder = await Order.findOne({ orderId })
        if (foundOrder) orderId = generateOrderNumber()

        const newOrder = new Order({ userId: user._id, address, products, status: "Encomendado", price, extra, purchaseDate: currentDay(), orderId });

        await newOrder.save();
        updateStock(products)
        return res.status(200).json({ msg: "Sua encomenda foi aceita com sucesso.", orderId: newOrder.orderId });

    } catch (error) {
        console.log(error);
        return res.status(400).json("Algo deu errado");
    }
});

app.put('/updateProduct/:productId', async (req, res) => {
    const productId = req.params.productId;
    const updatedProduct = req.body.product;

    try {
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json('Produto não encontrado');
        }

        const updated = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });


        return res.status(200).json(updated);
    } catch (error) {

        return res.status(500).json('Erro ao atualizar o produto');
    }
});

app.delete("/productDelete/:productId", async (req, res) => {
    try {
        const productId = req.params.productId
        const product = await Product.findOneAndDelete({ _id: productId })
        if (!product) return res.status(404).json("produto não encontrado")
        return res.status(200).json("produto deletado com sucesso!")

    } catch (error) {
        res.status(400).json("Algo deu errado :(")
    }
})


app.get('/orders', async (req, res) => {
    const { tel } = req.body
    try {
        if (!tel) return res.status(404).json()
        const user = await User.findOne({ tel })

        const orders = await Order.find({ userId: user._id })

        return res.status(200).json(orders)

    } catch (error) {
        return res.status(404).json("Algo deu errado")
    }
})

app.get('/admin-orders', async (req, res) => {
    try {
        const orders = await Order.find()
        return res.status(200).json(orders)

    } catch (error) {
        return res.status(400).json("houve algum error")
    }
})

app.get('/admin-orderInfo', async (req, res) => {
    try {
        const { orderId } = req.query
        const order = await Order.findOne({ orderId })

        if (!order) return res.status(404).json("Pedido nao encontrado.")

        return res.status(200).json(order)

    } catch (error) {
        console.log(error)
        return res.status(400).json("Algo deu errado")
    }
})


app.get('/orderInfo', async (req, res) => {
    try {
        const { tel } = req.body
        const { orderId } = req.query

        const user = await User.findOne({ tel })

        const order = await Order.findOne({ orderId, userId: user._id })

        if (!order) return res.status(404).json("Pedido nao encontrado.")

        return res.status(200).json(order)

    } catch (error) {
        console.log(error)
        return res.status(400).json("Algo deu errado")
    }
})

app.patch('/updateOrder', async (req, res) => {
    try {
        const { orderId, updatedOrder } = req.body
        console.log(updatedOrder)
        await Order.findOneAndUpdate({ orderId }, { $set: updatedOrder }, { new: true });
        return res.status(200).json("Encomenda atualizada com sucesso")

    } catch (error) {
        console.log(error)
        return res.status(400).json("Algo deu errado")
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

app.listen(3000, () => console.log("listening at port 3000"))
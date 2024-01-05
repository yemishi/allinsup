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

app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: true,
            httpOnly: true,
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_CONNECT_URL,
            ttl: 7 * 24 * 60 * 60, 
        }),
    })
);

require('./connectMongoDB')()



app.post('/login', async (req, res) => {
    const { tel } = req.body;
    try {
        let user = await User.findOne({ tel });

        if (!user) {
            const newUser = new User({ tel });
            user = await newUser.save();
        }
        req.session.user = user;
        console.log('Session created:', req.session.user);
        return res.json('Autenticação bem-sucedida');
    } catch (error) {
        console.error(error);
        return res.status(500).json('Erro ao processar a requisição');
    }
});

app.get('/check-auth', (req, res) => {
    console.log({ user: req.session.user })
    if (req.session.user) {
        return res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        return res.status(400).json({ isAuthenticated: false, test: req.session });
    }
});


app.get('/user', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.user._id })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ isAuthenticated: false });
    }
})
app.patch('/update-user', async (req, res) => {
    try {
        const user = await req.session.user
        const { address } = req.body;

        await User.findOneAndUpdate({ _id: user._id }, { $set: { address } }, { new: true });

        return res.status(200).json("Usuario atualizado com sucesso.")
    } catch (error) {
        return res.status(400).json("algo deu errado.")
    }

});

app.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy()
        return res.status(200).json("Usuario desconectado com sucesso!")
    }

})

app.delete('/delete-user', async (req, res) => {
    try {
        const { user } = req.session
        const foundUser = User.findOne({ _id: user._id })
        if (!foundUser) return res.status(404).json("Usuario nao encontrado.")

        req.session.destroy()
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
        const user = await User.findOne({ _id: req.session.user._id });
        const { price, products, extra } = req.body;

        if (!user) {
            console.log(user, 'aaaa')
            return res.status(404).json("Usuário não encontrado.");
        }
        const { address } = user

        if (!address) return res.status(401).json("Endereço de entrega não encontrado")

        let orderId = generateOrderNumber()
        const foundOrder = await Order.findOne({ orderId })
        if (foundOrder) orderId = generateOrderNumber()
        console.log(user)
        const newOrder = new Order({ userId: user._id, address, products, status: "Encomendado", price, extra, purchaseDate: currentDay(), orderId });

        await newOrder.save();
        updateStock(products, currentDay(), req.session.user._id)
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
    try {
        if (!req.session.user) return res.status(404).json()
        const user = await User.findOne({ _id: req.session.user._id })

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
        const { orderId } = req.query
        const order = await Order.findOne({ orderId, userId: req.session.user._id })

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
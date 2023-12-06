const express = require("express")

const session = require("express-session")
const passport = require('passport')
const bcrypt = require('bcrypt')
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
};

app.use(cors(corsOptions));
require('./auth');

require('./connectMongoDB')()

const { User, Product, NavCollection } = require('./models')

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



function isLoggedIn(req, res, next) {
    req.user ? next() : res.redirect('/')
}

app.get('/', (req, res) => {
    res.send(`<div>
    <a href='/auth/google'>Authenticate with Google</a>
   
    </div>`);
})

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))



app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: "/auth/failure"
    }),
    (req, res) => {

        res.redirect('http://localhost:5173/rota-no-frontend')
    }
);

app.get('/test', (req, res) => {
    res.send({ ...req.user })
})
app.get('/auth/failure', (req, res) => {
    res.send('something went wrong :(')
})

app.get('/protect', isLoggedIn, (req, res) => {

    res.send(`HEYOO!! ${req.user.name} <a href="/test">spread out</a>`)
})

app.get('/logout', (req, res) => {
    req.logout();
    res.send('Dattebayo!!');
})

app.post('/newProduct', async (req, res) => {
    try {
        const { title, desc, price, mainPhoto, hightLight, brand, amount, photos, category, promotion, options } = await req.body
        console.log(req.body.title)
        const findProduct = await Product.findOne({ title, category })
        if (findProduct) return res.send("product already created!")

        const newProduct = new Product({ title, desc, price, mainPhoto, hightLight, brand, amount, options, photos, price, category, promotion })
        await newProduct.save()

        return res.status(200).send({ newProduct, msg: "product created with successfully" })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})
app.post('/login', passport.authenticate('local', {
    successRedirect: '/logged',
    failureRedirect: "/failedLogin"
}))
app.get('/logged', (req, res) => {
    console.log(req.user)
    return res.send({ ...req.user })
})

app.get('/failedLogin', (req, res) => {
    return res.send("error baby")
})


app.post('/updateProduct', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate({ _id: req.body._id }, { $set: req.body.updateData }, { new: true });
        return res.status(200).send({ message: "product updated with successfully!", product })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.get('/nav/collections', async (req, res) => {
    try {
        const collections = await NavCollection.find({})
        return res.status(201).json(collections)

    } catch (error) {
        console.log(error)
        return res.status(401)
    }
})

app.post('/new/nav/collection', async (req, res) => {
    try {
        const { banner, name, color } = await req.body

        if (!(banner, name)) return res.status(401)
        const findCollection = await NavCollection.findOne({ name, banner })

        console.log(findCollection)
        if (findCollection) return res.status(401).json("collection already created")

        const collection =  new NavCollection({ banner, name, color })
        collection.save()

        return res.status(201).json("collection saved with successfully")

    } catch (error) {
        console.log(error)
        return res.status(401)
    }
})

app.get('/products', async (req, res) => {
    try {
        const { category } = req.query

        if (!category) {
            const products = await Product.find({});
            return res.status(200).send(products)
        }

        const products = await Product.find({ category })

        return res.status(200).send(products)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.get('/products/highlight', async (req, res) => {
    try {
        const products = await Product.find({ hightLight: true })

        return res.status(201).json(products)
    } catch (error) {
        console.log(error)
        return res.status(400)
    }
})

app.get('/product/:productName/:productId', async (req, res) => {
    try {
        const { productId, productName } = req.params
        const product = await Product.findOne({ _id: productId, name: productName })

        if (!product) return res.status(404).send("product not found")

        return res.status(200).send(product)
    } catch (error) {
        console.log(error)
        return res.status(401).send("aaaaaaa")
    }
})

app.patch('/products/buy', async (req, res) => {
    try {
        const { products } = await req.body;


        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Invalid product information' });
        }

        for (const { productId, quantity } of products) {

            const product = await Product.findById({ _id: productId });

            if (!product) {
                console.error(`Product with ID ${productId} not found`);
                continue;
            }
            console.log(product, quantity)
            product.amount -= quantity;
            await product.save();
        }

        return res.status(200).json({ message: 'Products updated after purchase' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(3000, () => console.log("listening at port 3000"))
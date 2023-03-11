const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51MkJydSCFtjirD0jInUDGdbNDBd7iNpX5i5rUWYUxEZmeX7ggame7Zr6IW2lYrdVuFPW7c4eaziC96uBvLIM0FCR00KQGIgrlG");
const uuid = require("uuid");

const app = express();


//middleware
app.use(express.json())
app.use(cors())

//routes
app.get("/", (req,res)=>{
    res.send("IT working as the way we want to do ")
})

app.post("/payment",(req,res)=>{
    const {product, token} = req.body;
    console.log("Product",product);
    console.log("Price",product.price);
    const idempontencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer =>{
        stripe.charges.create({
            amount : product.price * 100, //10 dollars
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `The purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country,
                },

            }
        },{idempontencyKey})
    }).then( result => res.status(200).json(result))
    .catch(err => console.log(err))
})

//listen

app.listen(8080, () => console.log("Listening to port 8080"))
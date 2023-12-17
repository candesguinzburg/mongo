const mongoose = require('mongoose')
 require("dotenv").config()

const dbName =  process.env.DB_NAME
const password =  process.env.PASSWORD
const CONNECTION_URL =`mongodb+srv://cande2003:${password}@cluster0.wlqaceu.mongodb.net/${dbName}`


mongoose.connect(CONNECTION_URL,
   {
    useNewUrlParser: true,
  
   } )

   const Product = mongoose.model('Producto',{
    nombre: String,
    precio: Number,
    stock: Number,
    descripcion: String
   })

   module.exports = Product

   
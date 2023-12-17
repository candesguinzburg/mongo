const express = require('express');
const mongoose = require('mongoose')

const { createUser, isValidCredentials } = require('./dao/controllers/userController') 
const hbs = require ('hbs')
const bcrypt = require('bcrypt')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const dotenv= require("dotenv");
dotenv.config()

const app= express()

app.use(cookieParser())

const PORT = process.env.PORT || 8080
const dbName =  process.env.DB_NAME
const password =  process.env.PASSWORD
const CONNECTION_URL =`mongodb+srv://cande2003:${password}@cluster0.wlqaceu.mongodb.net/${dbName}`
 

mongoose.connect(CONNECTION_URL,{
    useNewUrlParser: true,
})
.then(() =>{
    console.log('conexion exitosa')
})
.catch((err) =>{
console.error(err)
})

/* configuracion handlebars */
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:false}))/* permite recibir forms */

app.use(session({
    secret: 'mi-clave',
    resave: false,
    saveUninitialized: false
}))


const productRouter = require('./routes/productRouter')
const servicesRouter = require('./routes/servicesRoutes');
const sessionMiddlewere = require('./middleweres/sessionMiddleweres');

/* ENDPOINTS */
app.use('/product',sessionMiddlewere, productRouter)
app.use('/services', servicesRouter)

app.get('/register', (req, res) =>{
    res.render('register')
})

app.post('/register', async (req, res) =>{
    const user = req.body
   let sal = 10
   const hashedPassword = await bcrypt.hash(user.password, sal)
    let usuarioCreado = await createUser({...user, password:hashedPassword })
    console.log(usuarioCreado)
    res.redirect('/')
})

app.get('/', (req, res) =>{
    res.render('login')
})

app.post('/', async (req, res) =>{
    const {mail, password} = req.body
    const user = {mail, password}

    let result = await isValidCredentials(user)
    if(result.ok){
        req.session.user = user
        res.redirect('/product')
    }
    else{
        res.render('login', {error: result.message})
    }

})

app.listen(PORT,() => {
    console.log( `el servidor se esta escuchando en http://localhost:${PORT}/product`)
})
/* createProduct ({
    nombre: 'heladera',
    precio: 44000,
    stock: 5,
    descripcion: 'consume poca energia'
       
    })  
 */

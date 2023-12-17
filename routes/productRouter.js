const express = require('express')
const Product = require('../dao/models/products')
const productRouter = express.Router()
const {CreateProduct, getProduct, getProductByid,updateProductById, deleteProductById}= require('../dao/controllers/productController')


productRouter.get('/', async (req, res) =>{
    if(!req.session.user){
        res.redirect('/')}
    console.log('session', req.session.user)

    const {order} = req.query
    try{
        const products = await getProduct(order)
        res.status(200).render('products', {products})
    }
    catch(err){
        res.status(500).send('Error al obtener la lista de productos')
    }

})


productRouter.get('/detail', async (req, res) => {
    const {productid} = req.query
    const product = await getProductByid(productid)
    if(product){
        res.render('detail', {product, editMode: false})
    }
    else{
        res.render('error')
    }
    
})


productRouter.post('/edit', async (req, res)=>{
    const {nombre, descripcion, precio, stock, id} = req.body
    const updateProduct= await updateProductById(id, precio, stock, nombre, descripcion)
    res.redirect('/product/detail?productid=' + id)/*  */
}
)


productRouter.get('/new', (req, res) =>{

    res.render('newProduct')
})

productRouter.post(('/new'), async(req, res) =>{
    const{nombre, precio, stock, descripcion} = req.body
    if(nombre && descripcion && stock && precio){
    const result = await CreateProduct({nombre, precio, stock, descripcion})
    if (result){
        res.redirect('/product')
    }
   else{
    res.render('error')
   }}
   res.render('newProduct', {error: 'no has llenado todos los campos'})
})

productRouter.post('/delete',  async (req,res) =>{
  const {productid}= req.body
  await deleteProductById(productid)
  res.redirect('/product')  
})




module.exports = productRouter
const Product = require('../models/products')

const getProduct = async (order) =>{
  let products = await Product.find()
  if(order){
    if(order == 'asc'){
        return products.sort((a, b)=> a.precio - b.precio)
    }else{
        return products.sort((a, b)=> b.precio - a.precio)
    }
}
return products}

const getProductByid = async (productid) => {
    return await  Product.findById(productid)}


const CreateProduct = async (product) =>{
    try {
        const newProduct = new Product(product)
        await newProduct.save()
        return true
        console.log('producto guardado')
    }
    catch(error){
        throw error
        return null
    }
} 

const updateProductById = async (id, precio, stock, nombre, descripcion) =>{
   return await Product.findByIdAndUpdate(id,{ precio, stock, nombre, descripcion}, {new: true})
  
}
const deleteProductById = async (productoid) =>{
    return await Product.findByIdAndDelete(productoid)
 }

module.exports={
    CreateProduct,
    getProduct,
    getProductByid,
    updateProductById,
    deleteProductById
}

/* deleteProductById() */


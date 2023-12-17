const express = require('express')
const servicesRouter= express.Router()
const Product = require('../dao/models/products') 

servicesRouter.get('/editmode', async (req,res) =>{
    const {productid} = req.query
    const product = await Product.findById(productid)
    if(product){
        res.render('detail', {product, editMode: true})
    }
    else{
        res.render('error') 
    }

})

module.exports= servicesRouter
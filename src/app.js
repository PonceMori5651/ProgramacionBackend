const ProductManager = require("./ProductManager")
const express = require('express')
const app = express()

const manager = new ProductManager('../products.json')


app.get('/products', async (req,res)=>{
    try {
        const products = await manager.getProducts()
        const queryLimit = parseInt(req.query.limit)
        if (!queryLimit) return res.send(products)
        const productLimit = products.slice(0,queryLimit)
        res.send(productLimit)
    } catch (e) {
        res.send("ERROR INTERNO DEL SISTEMA");
    }
})
app.get('/products/:pid', async (req,res)=>{
    try {
        const products = await manager.getProducts()
        const productID = parseInt(req.params.pid)
        if(!productID || productID>products.length){
            return res.send("Producto no Encontrado")
        }
        const encontrarId = products.findIndex(el=>el.id===productID)
        res.send(products[encontrarId])
    } catch (e) {
        res.send("ERROR INTERNO DEL SISTEMA");
    }
})

app.listen(8080,()=>{
    console.log("Servidor Escuchando el puerto 8080")
})
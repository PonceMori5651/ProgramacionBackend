const fs = require('fs')
class ProductManager{
    constructor(path){
        this.path = path
    }
    addProduct(data){
        if(!data.tittle || !data.description || !data.price || !data.thumbnail || !data.code || !data.stock){
            return console.error("Todos los campos son requeridos")
        }
        if(fs.existsSync(this.path)){
            fs.promises.readFile(this.path,'utf-8')
            .then((result) => {
                const arrayObjeto = JSON.parse(result)
                const newProduct = {
                    id: arrayObjeto.length + 1,
                    tittle:data.tittle,
                    description: data.description,
                    price: data.price,
                    thumbnail: data.thumbnail,
                    code: data.code,
                    stock: data.stock
                }
                const existCode = arrayObjeto.findIndex(el=>el.code === data.code)
                if(existCode!==-1){
                    console.error("El code ingresado ya ha sido registrado")
                    return
                }

                arrayObjeto.push(newProduct)
                const stringArrayOb = JSON.stringify(arrayObjeto,null,2)
                return fs.promises.writeFile(this.path,stringArrayOb),1
            })
            .then((result)=>{
                if(result===1){
                    return console.log("Se agregó correctamente el producto")
                }
            })
            .catch(() => {
                console.error("ERROR INTERNO DEL PROGRAMA")
                return
            });
        }
        else{
            fs.promises.writeFile(this.path,'[]')
            .then(()=>{
                return fs.promises.readFile(this.path,'utf-8')
            })
            .then((result) => {
                const arrayObjeto = JSON.parse(result)
                const newProduct = {
                    id: arrayObjeto.length + 1,
                    tittle:data.tittle,
                    description: data.description,
                    price: data.price,
                    thumbnail: data.thumbnail,
                    code: data.code,
                    stock: data.stock
                }
                const existCode = arrayObjeto.findIndex(el=>el.code === data.code)
                if(existCode!==-1){
                    return console.error("El code ingresado ya ha sido registrado")
                }
                arrayObjeto.push(newProduct)
                const stringArrayOb = JSON.stringify(arrayObjeto,null,2)
                return fs.promises.writeFile(this.path,stringArrayOb),1
            })
            .then((result)=>{
                if(result===1){
                    return console.log("Se agregó correctamente el producto")
                }
            })
            .catch(() => {
                console.error("ERROR INTERNO DEL PROGRAMA")
                return
            });
        }
              
    }
    getProducts(){
        return fs.promises.readFile(this.path,'utf-8')
        .then((result)=>{
            const productos = JSON.parse(result)
            return productos
        })
        .catch((e)=>{
            console.error("El archivo no existe",e)
            return
        })
    }
    getProductById(idProduct){
        let comod
        fs.promises.readFile(this.path,'utf-8').
        then((result)=>{
            const arrayObjeto = JSON.parse(result)
            const encontrarId = arrayObjeto.findIndex(el=>el.id===idProduct)
            if(encontrarId===-1){
                console.error("Not Found")
                comod = 2
                return comod
            }
            if(comod!==2){
                console.log(arrayObjeto[encontrarId])
                return
            }
            return 
        })
        .catch((e)=>{
            console.error({e})
            return
        })
    }
    updateProduct(idProduct,updateProduct){
        fs.promises.readFile(this.path,'utf-8')
        .then((result)=>{
            const arrayObjeto = JSON.parse(result)
            const encontrarId = arrayObjeto.findIndex(el=>el.id===idProduct)
            if(encontrarId===-1){
                console.error("Not Found")
                return
            }
            arrayObjeto[encontrarId].tittle = updateProduct.tittle;
            arrayObjeto[encontrarId].description = updateProduct.description;
            arrayObjeto[encontrarId].price = updateProduct.price;
            arrayObjeto[encontrarId].thumbnail = updateProduct.thumbnail;
            arrayObjeto[encontrarId].code = updateProduct.code;
            arrayObjeto[encontrarId].stock = updateProduct.stock;
            const stringArrayOb = JSON.stringify(arrayObjeto,null,2)
            return fs.promises.writeFile(this.path,stringArrayOb),1
        })
        .then((result)=>{
            if(result===1){
                console.log("Producto Actualizado correctamente.")
            }
            return
        })
        .catch((e)=>{
            console.error({e})
            return
        })
    }

    deleteProduct(idProduct){
        fs.promises.readFile(this.path,'utf-8')
        .then((result)=>{
            const arrayObjeto = JSON.parse(result)
            const encontrarId = arrayObjeto.findIndex(el=>el.id===idProduct)
            if(encontrarId===-1){
                console.error("Not Found")
                return
            }
            arrayObjeto.splice(encontrarId,1)
            const stringArrayOb = JSON.stringify(arrayObjeto,null,2)
            return fs.promises.writeFile(this.path,stringArrayOb),1
        })
        .then((result)=>{
            if(result===1){
            console.log("Producto Eliminado correctamente.")
            }
            return
        })
        .catch((e)=>{
            console.error({e})
            return
        })
    }
}
module.exports = ProductManager
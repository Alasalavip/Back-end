import fs from "fs"

class contenedor{
    constructor(path){
        this.path = path
    }

    //traer todos los productos
    getAll = async() =>{
        try {
            if(fs.existsSync(this.path)){
                let info = await fs.promises.readFile(this.path, 'utf-8');
                let products = JSON.parse(info);
                return products
            }else{
                console.log
            }
        } catch (error) {
            console.log(error)
        }
    }

    //agregar productos
    save = async(title,price,thumbnail) =>{
        let producto = {
            title: title,
            price: price,
            thumbnail: thumbnail
        }
        let stock = await this.getAll();
        try {
            if(stock.length === 0){
                producto.id = 0;
                stock.push(producto)
                await fs.promises.writeFile(this.path, JSON.stringify(stock,null,'\t'))
            }else{
                producto.id = stock[stock.length-1].id+1
                stock.push(producto)
                await fs.promises.writeFile(this.path,JSON.stringify(stock,null,'\t'))
            }
        } catch (error) {
            console.log(error)
        }
    }

    //traer por id
    getById = async(number) =>{
        let stock = await this.getAll();
        try {
            let filter = stock.find(e => e.id == number)
            return filter
        } catch (error) {
            console.log(error)
        }
    }

    //borrar por id
    deleteById = async(number) =>{
        let stock = await this.getAll();
        try {
            let filter = stock.filter(product =>product.id != number)
            await fs.promises.writeFile(this.path, JSON.stringify(filter,null,'\t'))
        } catch (error) {
            console.log(error);
        }
    }

    //borrar el archivo
    deleteAll = async() =>{
        try {
            await fs.promises.writeFile(this.path,JSON.parse('[]'))
        } catch (error) {
            console.log(error)
        }
    }
}

export default contenedor;

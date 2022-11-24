const { Router } = require("express");
const router = new Router();

module.exports = app =>{
    let arrProductos = [
        {
            id: 1,
            title: "Regla",
            price: 100,
           
        }
    ];
    
    //Middleware para agregar ID automáticamente.
    let addId = (req, res, next) => {
        req.body.id = ( arrProductos.length === 0 ) ? 1 : arrProductos[arrProductos.length - 1].id + 1;
        next();
    };

    app.use('/api/productos', router);

    //TRAER TODOS LOS PRODUCTOS
    router.get('/', (req, res, next) => {
        try {
            res.json( arrProductos );
        } catch (error) {
            console.log(error)
        }
    });
    
    //TRAER UN PRODUCTO SEGUN ID
    router.get('/:id', (req, res, next) => {
        try{
            let selected = arrProductos.filter(item => item.id == req.params.id);
            selected.length === 0 ? 
            res.send( {error: "Producto no encontrado"} ) : res.json( selected );
        } catch (error){
            console.log(error);
        }
    });

    //AGREGAR UN PRODUCTO NUEVO
    router.post('/', addId, (req, res, next) => {
        try {
            let obj = req.body;
            arrProductos.push(obj);
    
            res.json( arrProductos );
        } catch (error) {
            console.log(error);
        }
    });

    //ACTUALIZAR UN PRODUCTO
    router.put('/:id', (req, res, next) => {
        try {
            let id = Number(req.params.id);
            let { title, price } = req.body;
            if( !title || !price || !id ){
                res.send("No hay datos");
            } else {
                let newProduct = {
                    id,
                    title,
                    price
                };

                arrProductos.map(function(item){
                    if(item.id === newProduct.id){
                        item.title = newProduct.title,
                        item.price = newProduct.price
                        
                    }
                    console.log(`${item.title} actualizado.`);
                });
                res.json( arrProductos );
            };
        } catch (error) {
            console.log(error);
        }
    });

    //ELIMINAR UN PRODUCTO
    router.delete('/:id', (req, res) => {
        try {
            let id = Number(req.params.id);
            let filter = arrProductos.filter(item => item.id !== id)
            arrProductos = filter;
            res.json( arrProductos );
        } catch (error) {
            console.log(error);
        }
    })
}
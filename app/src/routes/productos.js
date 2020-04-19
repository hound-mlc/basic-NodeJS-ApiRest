const eServer = require("express");
const router = eServer.Router();

const conexion = require("../database");

router.get("/productos",(request, respuesta) => {
    conexion.query("SELECT * FROM producto",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas);
        }
        else {
            console.log(error);
        }
    });
});


router.get("/productos/:id", (request, respuesta) => {
    conexion.query("SELECT * FROM producto WHERE ID_PRODUCTO = "+request.params.id,(error, filas, campos) => {
        if (!error){
            respuesta.json(filas[0]);
        }
        else {
            console.log(error);
        }
    });
});

router.post("/productos", (request, respuesta) => {
    conexion.query("INSERT INTO producto (ID_PRODUCTO, NOMBRE_PRODUCTO, CATEGORIA, PRECIO, STOCK, DESCRIPCION, IMAGEN, TIPO) VALUES "+
    "("+request.body.id_producto+",'"+request.body.nombre_producto+"','"+request.body.categoria+"',"+request.body.precio+","+request.body.stock+",'"+request.body.descripcion+"','"+request.body.imagen+"','"+request.body.tipo+"');", (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_producto":'+request.body.id_producto+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.put("/productos/:id", (request, respuesta) => {
    conexion.query("UPDATE producto SET NOMBRE_PRODUCTO='"+request.body.nombre_producto+"', CATEGORIA='"+request.body.categoria+"', PRECIO="
                    +request.body.precio+", STOCK="+request.body.stock+", DESCRIPCION='"+request.body.descripcion+"', IMAGEN='"
                    +request.body.imagen+"', TIPO='"+request.body.tipo
                    +"' WHERE ID_PRODUCTO="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_producto":'+request.params.id+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.delete("/productos/:id", (request, respuesta) => {
    conexion.query("DELETE FROM producto WHERE id_producto="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"mensaje":"exito"}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});



module.exports = router;

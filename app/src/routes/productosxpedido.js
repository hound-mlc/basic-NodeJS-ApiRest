const eServer = require("express");
const router = eServer.Router();

const conexion = require("../database");

router.get("/productos_pedido", (request, respuesta) => {
    conexion.query("SELECT * FROM productoxpedido;",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas);
        }
        else {
            console.log(error);
        }
    });
});

router.get("/productos_pedido/:id", (request, respuesta) => {
    conexion.query("SELECT * FROM producto WHERE producto.ID_PRODUCTO IN (SELECT productoxpedido.ID_PRODUCTO FROM productoxpedido WHERE productoxpedido.ID_PEDIDO="+request.params.id+");",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas);
        }
        else {
            console.log(error);
        }
    });
});

router.post("/productos_pedido", (request, respuesta) => {
    conexion.query("INSERT INTO productoxpedido (ID_REL_PP, ID_PRODUCTO, ID_PEDIDO, CANTIDAD) VALUES "+
    "("+request.body.id_rel_pp+","+request.body.id_producto+","+request.body.id_pedido+","+request.body.cantidad+");", (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_rel_pp":'+request.body.id_rel_pp+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.put("/productos_pedido/:id", (request, respuesta) => {
    conexion.query("UPDATE productoxpedido SET CANTIDAD= "+request.body.cantidad
                    +" WHERE ID_REL_PP="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_rel_pp":'+request.params.id+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.delete("/productos_pedido/:id", (request, respuesta) => {
    conexion.query("DELETE FROM productoxpedido WHERE id_rel_pp="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"mensaje":"exito"}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});

module.exports = router;

const eServer = require("express");
const router = eServer.Router();

const conexion = require("../database");

router.get("/pedidos",(request, respuesta) => {
    conexion.query("SELECT * FROM pedido",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas);
        }
        else {
            console.log(error);
        }
    });
});


router.get("/pedidos/:id", (request, respuesta) => {
    conexion.query("SELECT * FROM pedido WHERE ID_PEDIDO = "+request.params.id,(error, filas, campos) => {
        if (!error){
            respuesta.json(filas[0]);
        }
        else {
            console.log(error);
        }
    });
});

router.post("/pedidos", (request, respuesta) => {
    conexion.query("INSERT INTO pedido (ID_PEDIDO, ID_REALIZADOR, FECHA_REALIZACION) VALUES "+
    "("+request.body.id_pedido+", "+request.body.id_realizador+", '"+request.body.fecha_realizacion+"');", (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_pedido":'+request.body.id_pedido+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.put("/pedidos/:id", (request, respuesta) => {
    conexion.query("UPDATE pedido SET FECHA_REALIZACION='"+request.body.fecha_realizacion
                    +"' WHERE ID_PEDIDO="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_pedido":'+request.params.id+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.delete("/pedidos/:id", (request, respuesta) => {
    conexion.query("DELETE FROM pedido WHERE id_pedido="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"mensaje":"exito"}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});



module.exports = router;
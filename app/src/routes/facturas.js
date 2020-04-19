const eServer = require("express");
const router = eServer.Router();

const conexion = require("../database");

router.get("/facturas",(request, respuesta) => {
    conexion.query("SELECT * FROM factura",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas);
        }
        else {
            console.log(error);
        }
    });
});


router.get("/facturas/:id", (request, respuesta) => {
    conexion.query("SELECT * FROM factura WHERE ID_FACTURA = '"+request.params.id+"'",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas[0]);
        }
        else {
            console.log(error);
        }
    });
});

router.post("/facturas", (request, respuesta) => {
    conexion.query("INSERT INTO factura (ID_FACTURA, ID_PEDIDO, PRECIO_TOTAL, ID_METODO_PAGO) VALUES "+
    "('"+request.body.id_factura+"',"+request.body.id_pedido+","+request.body.precio_total+","+request.body.id_metodo_pago+");", (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_factura":"'+request.body.id_factura+'"}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.delete("/facturas/:id", (request, respuesta) => {
    conexion.query("DELETE FROM factura WHERE id_factura='"+request.params.id+"'", (error, filas, campos) => {
        if (!error){
            respuesta.send('{"mensaje":"exito"}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});



module.exports = router;
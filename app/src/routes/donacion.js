const eServer = require("express");
const router = eServer.Router();

const conexion = require("../database");

router.get("/donaciones",(request, respuesta) => {
    conexion.query("SELECT * FROM donacion",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas);
        }
        else {
            console.log(error);
        }
    });
});


router.get("/donaciones/:id", (request, respuesta) => {
    conexion.query("SELECT * FROM donacion WHERE ID_DONACION = "+request.params.id,(error, filas, campos) => {
        if (!error){
            respuesta.json(filas[0]);
        }
        else {
            console.log(error);
        }
    });
});

router.post("/donaciones", (request, respuesta) => {
    conexion.query("INSERT INTO donacion (ID_DONACION, CANTIDAD, ID_DONANTE, ID_METODO_PAGO) VALUES "+
    "("+request.body.id_donacion+", "+request.body.cantidad+", "+request.body.id_donante+", "+request.body.id_metodo_pago+");", (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_donacion":'+request.body.id_donacion+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.put("/donaciones/:id", (request, respuesta) => {
    conexion.query("UPDATE donacion SET CANTIDAD="+request.body.cantidad
                    +" WHERE ID_DONACION="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_donacion":'+request.params.id+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.delete("/donaciones/:id", (request, respuesta) => {
    conexion.query("DELETE FROM donacion WHERE id_donacion="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"mensaje":"exito"}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});



module.exports = router;
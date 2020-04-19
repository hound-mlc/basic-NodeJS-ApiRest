const eServer = require("express");
const router = eServer.Router();

const conexion = require("../database");

router.get("/metodos_pago",(request, respuesta) => {
    conexion.query("SELECT * FROM metodo_pago",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas);
        }
        else {
            console.log(error);
        }
    });
});


router.get("/metodos_pago/:id", (request, respuesta) => {
    conexion.query("SELECT * FROM metodo_pago WHERE ID_METODO_PAGO = "+request.params.id,(error, filas, campos) => {
        if (!error){
            respuesta.json(filas[0]);
        }
        else {
            console.log(error);
        }
    });
});

router.post("/metodos_pago", (request, respuesta) => {
    conexion.query("INSERT INTO metodo_pago (ID_METODO_PAGO, TIPO, INFORMACION, ID_PERSONA) VALUES "+
    "("+request.body.id_metodo_pago+", '"+request.body.tipo+"', '"+request.body.informacion+"', "+request.body.id_persona+");", (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_metodo_pago":'+request.body.id_metodo_pago+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.put("/metodos_pago/:id", (request, respuesta) => {
    conexion.query("UPDATE metodo_pago SET TIPO='"+request.body.tipo+"', INFORMACION='"+request.body.informacion
                    +"' WHERE ID_METODO_PAGO="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_metodo_pago":'+request.params.id+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});

router.delete("/metodos_pago/:id", (request, respuesta) => {
    conexion.query("DELETE FROM metodo_pago WHERE id_metodo_pago="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"mensaje":"exito"}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});



module.exports = router;
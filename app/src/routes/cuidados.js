const eServer = require("express");
const router = eServer.Router();

const conexion = require("../database");

router.get("/cuidados",(request, respuesta) => {
    conexion.query("SELECT * FROM cuidado",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas);
        }
        else {
            console.log(error);
        }
    });
});


router.get("/cuidados/:id", (request, respuesta) => {
    conexion.query("SELECT * FROM cuidado WHERE ID_CUIDADO = "+request.params.id,(error, filas, campos) => {
        if (!error){
            respuesta.json(filas[0]);
        }
        else {
            console.log(error);
        }
    });
});

router.post("/cuidados", (request, respuesta) => {
    conexion.query("INSERT INTO cuidado (ID_CUIDADO, ID_CUIDADOR, ID_ANIMAL, TIPO_CUIDADO, FECHA_INICIO, FECHA_FIN) VALUES "+
    "("+request.body.id_cuidado+", "+request.body.id_cuidador+", "+request.body.id_animal+", '"+request.body.tipo_cuidado+"','"+request.body.fecha_inicio+"','"+request.body.fecha_fin+"');", (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_cuidado":'+request.body.id_cuidado+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.put("/cuidados/:id", (request, respuesta) => {
    conexion.query("UPDATE cuidado SET TIPO_CUIDADO='"+request.body.tipo_cuidado+"', FECHA_INICIO='"+request.body.fecha_inicio+"', FECHA_FIN='"
                    +request.body.fecha_fin
                    +"' WHERE ID_CUIDADO="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_cuidado":'+request.params.id+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.delete("/cuidados/:id", (request, respuesta) => {
    conexion.query("DELETE FROM cuidado WHERE id_cuidado="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"mensaje":"exito"}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});



module.exports = router;

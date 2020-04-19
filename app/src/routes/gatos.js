const eServer = require("express");
const router = eServer.Router();

const conexion = require("../database");

router.get("/gatos",(request, respuesta) => {
    conexion.query("SELECT * FROM gato",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas);
        }
        else {
            console.log(error);
        }
    });
});


router.get("/gatos/:id", (request, respuesta) => {
    conexion.query("SELECT * FROM gato WHERE ID_GATO = "+request.params.id,(error, filas, campos) => {
        if (!error){
            respuesta.json(filas[0]);
        }
        else {
            console.log(error);
        }
    });
});

router.post("/gatos", (request, respuesta) => {
    conexion.query("INSERT INTO gato (ID_GATO ,ID_ANIMAL, COLOR, PELO, COMUN_EUROPEO, CARACTER) VALUES "+
    "("+request.body.id_gato+","+request.body.id_animal+",'"+request.body.color+"','"+request.body.pelo+"',"+request.body.comun_europeo+",'"+request.body.caracter+"');", (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_gato":'+request.body.id_gato+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.put("/gatos/:id", (request, respuesta) => {
    conexion.query("UPDATE gato SET COLOR='"+request.body.color+"', PELO='"
                    +request.body.pelo+"', COMUN_EUROPEO="+request.body.comun_europeo+", CARACTER='"+request.body.caracter+"'"
                    +" WHERE ID_GATO="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_gato":'+request.params.id+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.delete("/gatos/:id", (request, respuesta) => {
    conexion.query("DELETE FROM gato WHERE id_gato="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"mensaje":"exito"}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});



module.exports = router;
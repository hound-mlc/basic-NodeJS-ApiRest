const eServer = require("express");
const router = eServer.Router();

const conexion = require("../database");

router.get("/perros",(request, respuesta) => {
    conexion.query("SELECT * FROM perro",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas);
        }
        else {
            console.log(error);
        }
    });
});


router.get("/perros/:id", (request, respuesta) => {
    conexion.query("SELECT * FROM perro WHERE ID_PERRO = "+request.params.id,(error, filas, campos) => {
        if (!error){
            respuesta.json(filas[0]);
        }
        else {
            console.log(error);
        }
    });
});

router.post("/perros", (request, respuesta) => {
    conexion.query("INSERT INTO perro (ID_PERRO ,ID_ANIMAL, RAZA, TIENE_CHIP, PELO, COLOR, TAMAÑO, ADIESTRADO) VALUES "+
    "("+request.body.id_perro+","+request.body.id_animal+",'"+request.body.raza+"',"+request.body.tiene_chip+",'"+request.body.pelo+"','"+request.body.color+"','"+request.body.tamaño+"',"+request.body.adiestrado+");", (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_perro":'+request.body.id_perro+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.put("/perros/:id", (request, respuesta) => {
    conexion.query("UPDATE perro SET RAZA='"+request.body.raza+"', TIENE_CHIP="+request.body.tiene_chip+", PELO='"
                    +request.body.pelo+"', COLOR='"+request.body.color+"', TAMAÑO='"+request.body.tamaño+"', ADIESTRADO="
                    +request.body.adiestrado
                    +" WHERE ID_PERRO="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_perro":'+request.params.id+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.delete("/perros/:id", (request, respuesta) => {
    conexion.query("DELETE FROM perro WHERE id_perro="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"mensaje":"exito"}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});



module.exports = router;
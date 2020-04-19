const eServer = require("express");
const router = eServer.Router();

const conexion = require("../database");

const animales = require("../controllers/animal.controller");

router.get("/animales",(request, respuesta) => {
    conexion.query("SELECT * FROM animal",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas);
        }
        else {
            console.log(error);
        }
    });
});



router.get("/animales/:id", (request, respuesta) => {
    conexion.query("SELECT * FROM animal WHERE ID_ANIMAL = "+request.params.id,(error, filas, campos) => {
        if (!error){
            respuesta.json(filas[0]);
        }
        else {
            console.log(error);
        }
    });
});

router.post("/animales", (request, respuesta) => {
    conexion.query("INSERT INTO animal (ID_ANIMAL, NOMBRE_ANIMAL, FECHA_NACIMIENTO, SEXO, PESO, LOCALIDAD, PROVINCIA, IMAGEN, ID_DUEÑO) VALUES "+
    "("+request.body.id_animal+",'"+request.body.nombre_animal+"','"+request.body.fecha_nacimiento+"','"+request.body.sexo+"',"+request.body.peso+",'"+request.body.localidad+"','"+request.body.provincia+"','"+request.body.imagen+"', "+request.body.id_dueno+");", (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_animal":'+request.body.id_animal+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.put("/animales/adopcion/:id", (request, respuesta) => {
    conexion.query("UPDATE animal SET ID_DUEÑO="+request.body.id_dueno
                +" WHERE ID_ANIMAL="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"mensaje": "exito');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});


router.put("/animales/:id", (request, respuesta) => {
    conexion.query("UPDATE animal SET NOMBRE_ANIMAL='"+request.body.nombre_animal+"', FECHA_NACIMIENTO='"+request.body.fecha_nacimiento+"', SEXO='"
                    +request.body.sexo+"', PESO="+request.body.peso+", LOCALIDAD='"+request.body.localidad+"', PROVINCIA='"
                    +request.body.provincia+"', IMAGEN='"+request.body.imagen
                    +"' WHERE ID_ANIMAL="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_animal":'+request.params.id+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error.sql+'"}');
        }
    });
});

router.delete("/animales/:id", (request, respuesta) => {
    conexion.query("DELETE FROM animal WHERE id_animal="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"mensaje":"exito"}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});



module.exports = router;

const eServer = require("express");
const router = eServer.Router();

const conexion = require("../database");

router.get("/personas",(request, respuesta) => {
    conexion.query("SELECT * FROM persona",(error, filas, campos) => {
        if (!error){
            respuesta.json(filas);
        }
        else {
            console.log(error);
        }
    });
});


router.get("/personas/:id", (request, respuesta) => {
    conexion.query("SELECT * FROM persona WHERE ID_PERSONA = "+request.params.id,(error, filas, campos) => {
        if (!error){
            respuesta.json(filas[0]);
        }
        else {
            console.log(error);
        }
    });
});

router.post("/personas", (request, respuesta) => {
    conexion.query("INSERT INTO persona (ID_PERSONA, NOMBRE_PERSONA, APELLIDO1, FECHA_NACIMIENTO, DNI, CORREO, TELEFONO, IMAGEN, DIRECCIÓN, LOCALIDAD, PROVINCIA) VALUES "+
    "("+request.body.id_persona+",'"+request.body.nombre_persona+"','"+request.body.apellido1+"','"+request.body.fecha_nacimiento+"','"+request.body.dni+"','"+request.body.correo+"','"+request.body.telefono+"','"+request.body.imagen+"','"+request.body.direccion+"','"+request.body.localidad+"','"+request.body.provincia+"');", (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_persona":'+request.body.id_persona+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});

router.put("/personas/:id", (request, respuesta) => {
    conexion.query("UPDATE persona SET NOMBRE_PERSONA='"+request.body.nombre_persona+"', APELLIDO1='"+request.body.apellido1+"', FECHA_NACIMIENTO='"
                    +request.body.fecha_nacimiento+"', DNI='"+request.body.dni+"', CORREO='"+request.body.correo+"', TELEFONO='"
                    +request.body.telefono+"', IMAGEN='"+request.body.imagen+"', DIRECCIÓN='"+request.body.direccion+"', LOCALIDAD='"+request.body.localidad+"', PROVINCIA='"+request.body.provincia
                    +"' WHERE ID_PERSONA="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"id_persona":'+request.params.id+'}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});

router.delete("/personas/:id", (request, respuesta) => {
    conexion.query("DELETE FROM persona WHERE id_persona="+request.params.id, (error, filas, campos) => {
        if (!error){
            respuesta.send('{"mensaje":"exito"}');
        }
        else {
            respuesta.send('{"mensaje":"'+error+'"}');
        }
    });
});



module.exports = router;
const mysql = require("mysql");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "anubis"
});

conexion.connect(function(error){
    if (error) {
        console.log(error);
        return;
    }
    else {
        console.log("Conexión exitosa.");
    }
});

module.exports = conexion;
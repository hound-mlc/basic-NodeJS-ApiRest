const eServer = require("express");
const app = eServer();

app.set("puerto",3000);

//Permite que nuestro módulo de express sea capaz de operar con objetos json
app.use(eServer.json());

//Rutas
app.use(require("./routes/animales"));
app.use(require("./routes/personas"));
app.use(require("./routes/perros"));
app.use(require("./routes/gatos"));
app.use(require("./routes/cuidados"));
app.use(require("./routes/metodo_pago"));
app.use(require("./routes/donacion"));
app.use(require("./routes/productos"));
app.use(require("./routes/pedidos"));
app.use(require("./routes/productosxpedido"));
app.use(require("./routes/facturas"));

app.listen(app.get("puerto"), () => {
    console.log("Server en funcionamiento");
});

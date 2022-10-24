const express = require("express");
const apiRoutes = require("./routers/app.routers");
const ecommerce = require("./contenedorDB");
const Chat = require("./contenedorChat");
const dbEcommerce = require("./knexfile");
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");

const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

// hbs
app.engine(
  "handlebars",
  engine({
    extname: ".handlebars",
    defaultLayout: "main.handlebars",
    layoutsDir: __dirname + "/public/layouts",
    partialsDir: __dirname + "/public/partials",
  })
);

app.set("views", "./public");
app.set("view engine", "handlebars");

const bdProduct = new ecommerce(dbEcommerce.development);
const chat = new Chat(dbEcommerce.sqlite);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/api", apiRoutes);

// hbs
app.get("/productoshbs", (req, res) => {
  bdProduct.getAll().then((p) => {
    res.render("indexhbs", { productos: p });
  });
});

app.post("/productoshbs", (req, res) => {
  bdProduct.addProduct(req.body).then(() => {
    res.redirect("/productoshbs");
  });
});

app.get("/productoshbs", (req, res) => {
  chat.getAll().then((c) => {
    res.render("indexhbs", { chat: c });
  });
});

app.post("/productoshbs", (req, res) => {
  chat.addProduct(req.body).then(() => {
    res.redirect("/productoshbs");
  });
});

// Server
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on("error", (error) => console.log(`Server error: ${error}`));

// Socket events

io.on("connection", async (socket) => {
  socket.emit("producto", bdProduct.getAll());

  socket.on("productos", (producto) => {
    bdProduct.addProduct(producto).then(async () => {
      io.sockets.emit("server-productos", await bdProduct.getAll());
    });
  });

  socket.emit("mensajes", await chat.getAll());

  socket.on("nuevoMensaje", async (mensaje) => {
    mensaje.fyh = new Date().toLocaleString();
    await chat.saveMessage(mensaje);
    io.sockets.emit("mensajes", await chat.getAll());
  });
});

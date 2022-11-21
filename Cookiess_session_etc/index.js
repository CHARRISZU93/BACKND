const express = require("express");
const apiRoutes = require("./routers/app.routers");
const Contenedor = require("../manejo_de_archivos/contenedor");
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const session = require("express-session");
const config = require("./config");
const MongoStore = require("connect-mongo");
const path = require("path");

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

const contenedor = new Contenedor("../manejo_de_archivos/productos.json");
const chat = new Contenedor("chat.json");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cnxStr }),
    secret: "frailejon",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);

// Routes
app.use("/api", apiRoutes);

// hbs

app.get("/login", (req, res) => {
  const user = req.session?.user;
  if (user) {
    res.redirect("/productoshbs");
  } else {
    res.sendFile(path.join(process.cwd(), "/public/partials/log-in.html"));
  }
});

app.get("/logout", (req, res) => {
  const user = req.session?.user;
  if (user) {
    req.session.destroy();
    res.render(
      path.join(process.cwd(), "/public/partials/log-out.handlebars"),
      {
        user,
      }
    );
  } else {
    res.redirect("/login");
  }
});

app.post("/login", (req, res) => {
  req.session.user = req.body.user;
  res.redirect("/productoshbs");
});

app.get("/productoshbs", (req, res) => {
  contenedor.getAll().then((p) => {
    res.render("indexhbs", { productos: p, user: req.session.user });
  });
});

app.post("/productoshbs", (req, res) => {
  contenedor.addProduct(req.session.body).then(() => {
    res.redirect("/productoshbs");
  });
});

app.get("/productoshbs", (req, res) => {
  chat.getAll().then((c) => {
    res.render("indexhbs", { chat: c });
  });
});

app.post("/productoshbs", (req, res) => {
  chat.addProduct(req.session.body).then(() => {
    res.redirect("/productoshbs");
  });
});

// Server
const connectedServer = httpServer.listen(config.PORT, () => {
  console.log(`Server is up and running on port ${config.PORT}`);
});

connectedServer.on("error", (error) => console.log(`Server error: ${error}`));

// Socket events

io.on("connection", async (socket) => {
  socket.emit("producto", contenedor.getAll());

  socket.on("productos", (producto) => {
    contenedor.addProduct(producto).then(async () => {
      io.sockets.emit("server-productos", await contenedor.getAll());
    });
  });

  socket.emit("mensajes", await chat.getAll());

  socket.on("nuevoMensaje", async (mensaje) => {
    mensaje.fyh = new Date().toLocaleString();
    await chat.saveMessage(mensaje);
    io.sockets.emit("mensajes", await chat.getAll());
  });
});

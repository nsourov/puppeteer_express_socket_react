const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const routes = require("./routes/scraper");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.io = io;
	next();
});

app.use("/", routes);

module.exports = { app: app, server: server };

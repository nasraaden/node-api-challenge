const express = require("express");

const actionRouter = require("./data/routers/actionRouter");
const projectRouter = require("./data/routers/projectRouter");

const server = express();

server.use(express.json())

// logger middleware

function logger(req, res, next) {
    const { method, originalUrl } = req;
    console.log(`${method} to ${originalUrl} on ${Date()}`)
    next();
}

server.use(logger);

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
    res.send(`<h1>Sprint Challenge!</h1>`);
});

module.exports = server;
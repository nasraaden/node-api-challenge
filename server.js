const express = require("express");

const actionRouter = require("./data/routers/actionRouter");
const projectRouter = require("./data/routers/projectRouter");

const server = express();

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
    res.send(`<h1>Sprint Challenge!</h1>`);
});

module.exports = server;
const express = require("express");

const router = express.Router();

const Actions = require("../helpers/actionModel");

router.get("/", (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The action could not be retrieved"})
    })
})

router.get("/:id", (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        if (projects.length !== 0) {
            res.status(200).json(action)
        } else {
            res.status(400).json({ message: "The project with the specified ID doesn't exist."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The projects information could not be retrieved."})
    })
})

module.exports = router;
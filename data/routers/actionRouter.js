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
        if (action.length !== 0) {
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

router.post("/", (req, res) => {
    const actionData = req.body;
    console.log(req.body)
    if (!actionData.project_id || !actionData.description || !actionData.notes){
        res.status(400).json({error: "Please provide a project id, description, and notes."})
      } else {
        Actions.insert(actionData)
        .then(action => {
          res.status(201).json(action)
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({message: "There was an error while saving the action to the database."})
        })
    }
})

router.put("/:id", (req, res) => {
    const actionData = req.body;
    const id = req.params.id;
    if (!actionData.project_id || !actionData.description || !actionData.notes){
        res.status(400).json({error: "Please provide a project id, description, and notes."})
      } else {
        Actions.update(id, actionData)
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({ message: "The action with the specified ID doesn't exist."})
            }
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({message: "There was an error while saving the action to the database."})
        })
    }
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Actions.remove(id)
    .then(action => {
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({ message: "The action with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The action could not be removed." })
    })
})

module.exports = router;
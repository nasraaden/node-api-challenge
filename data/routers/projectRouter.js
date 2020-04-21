const express = require("express");

const router = express.Router();

const Projects = require("../helpers/projectModel.js");

router.get("/", (req, res) => {
    console.log(req.body)
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The projects information could not be retrieved."})
    })
})

router.get("/:id", (req, res) => {
    Projects.get(req.params.id)
    .then(projects => {
        if (projects.length !== 0) {
            res.status(200).json(projects)
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
    const {name, description} = req.body;
    if (!name || !description){
        res.status(400).json({error: "Name and description are required."})
      } else {
        Projects.insert(req.body)
        .then(project => {
          res.status(201).json(project)
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({message: "There was an error while saving the project to the database."})
        })
    }
})

router.put("/:id", (req, res) => {
    const projectData = req.body;
    const id = req.params.id;
    if (!projectData.name || !projectData.description){
        res.status(400).json({error: "Name and description are required."})
      } else {
        Projects.update(projectData, id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ message: "The project with the specified ID doesn't exist."})
            }
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({message: "There was an error while saving the project to the database."})
        })
    }
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Projects.remove(id)
    .then(project => {
        if (project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The project could not be removed." })
    })
})

module.exports = router;
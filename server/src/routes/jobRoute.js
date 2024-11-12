// Importation des modules
const express = require('express')
const router = express.Router()

// Importation des fonctions 
const {addJob, getJob, supJob } = require("../controllers/jobController.js")

// route pour envoyer les données
router.post("/add-job", addJob);

// route pour récupérer les données
router.get("/getJob", getJob);

// route pour supprimer les données
router.delete("/supJob/:id", supJob)

// Exportation de la route
module.exports = router;
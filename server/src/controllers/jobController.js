// Importations des fonctions
const { readJsonFile, writeJsonFile, generateId, deleteJsonFile} = require('../utils/utils');
const path = require('path')

// Déclaration des chemins des fichiers json de users et jobs
const filePath = path.join(__dirname, "../models/jobs.json")


// Fonction d'ajout dans jobs.json
const addJob = (req, res)=>{

    // Récupértion des paramètres de la requète pour l'ajout d'un job
    const {title, position, company, jobLocation, isStatus, jobType} = req.body // req.body représente le corps de la requête 


    // Creation d'un nouveau job
    const newJob = {id: generateId(), title, position, company, jobLocation, isStatus, jobType} 
    // Ajout du nouveau job dans jobs.json
    writeJsonFile(filePath,newJob)
    res.status(200).json();

    console.log("Ajout effectué avec succès !")
}

// Fonction de récupération afin d'afficher les données de jobs.json dans la vue
const getJob = (req, res)=>{

    // lecture de jobs.JSON
    const work = readJsonFile(filePath)
    // Envoie d'une réponse json à la vue
    res.status(200).json(work);

    console.log("Affichage effectué avec succès !")
}

const supJob = (req, res) => {
    const workSup = readJsonFile(filePath)
    deleteJsonFile(workSup, data)
    res.status(200).json()

    console.log("Supression effectuée avec succès !")
}


module.exports = { addJob, getJob }
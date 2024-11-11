const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

// Déclaration des chemins des fichiers json de users et jobs

const pathJobJson = "../models/jobs.json"
const pathUserJson = "../models/users.json"

// Obtention du chemin absolu des fichiers json users et jobs
const userPath = path.join(__dirname, pathUserJson)
const jobPath = path.join(__dirname, pathJobJson)

// Tout pour la gestion des Jobs

    // Récupération des données de Jobs.json
    const readJobFile = () =>{ 
        // Lecture du fichiers jobs.json
        const JobData = fs.readFileSync(jobPath, {encoding: "utf-8"})
        if(JobData){        // Si jobs.json existe alors convertit cela en tableau js
            const transformJobData = JSON.parse(JobData)
            return transformJobData
        }else {             // Sinon crée un nouveau qui sera convertir en json accessible depuis le chemin jobPath
            const newJobData =fs.writeFileSync(jobPath, JSON.stringify([]));
            return newJobData
        }
    }

    // Ajouter des données dans Jobs.json
    const writeJobFile = (job) => {
        // Stockage des données issues de la lecture de job.json dans un tableau 
        const bigDataJob = readJobFile(jobPath)

        // Ajout d'un job dans le tableau 
        bigDataJob.push(job)

        // Ajout & Mise à jour du tableau dans jobs.json lors de chaque push
        fs.writeFileSync(jobPath, JSON.stringify(bigDataJob, null, 2))
        return job
    }

    // Gestion des Ids
    const generateId = () => uuidv4()

    module.exports = {
        readJobFile,
        writeJobFile,
        generateId
    }
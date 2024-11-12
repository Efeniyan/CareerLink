// Importations des fonctions
const { readJsonFile, writeJsonFile, generateId, deleteJsonFile} = require('../utils/utils');
const path = require('path')

// 
const filePath = path.join(__dirname, "../models/jobs.json")


// Fonction d'ajout d'un job dans jobs.json
const addJob = async (req, res) => {
    try {
        // Récupération des paramètres de la requête pour l'ajout d'un job
        const { deadline, description, company, jobLocation, isStatus, jobType, title } = req.body;

        // Validation des champs
        if (!deadline || !description || !company || !jobLocation || !isStatus || !jobType || !title) {
            return res.status(400).json({ error: "Tous les champs doivent être remplis." });
        }

        console.log("Corps de la requête:", req.body);

        // Lecture du fichier JSON existant de jobs
        let jobs = await readJsonFile(filePath);

        // Création d'un nouveau job
        const newJob = {
            id: generateId(),
            deadline,
            description,
            company,
            jobLocation,
            isStatus,
            jobType,
            title  // Ajout de "title"
        };

        // Ajout du nouveau job dans la liste des jobs
        jobs.push(newJob);

        // Écriture des données mises à jour dans le fichier JSON
        await writeJsonFile(filePath, jobs);

        // Réponse JSON avec succès
        res.status(200).json({ message: "Job ajouté avec succès!", job: newJob });
    } catch (error) {
        console.error("Erreur lors de l'ajout du job:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de l'ajout du job." });
    }
};


// Fonction de récupération afin d'afficher les données de jobs.json dans la vue
const getJob = (req, res)=>{

    // lecture de jobs.JSON
    const work = readJsonFile(filePath)
    // Envoie d'une réponse json à la vue
    res.status(200).json(work);

    console.log("Affichage effectué avec succès !")
}

const supJob = (req, res) => {
    // récupération de l'id passé en paramètre dans la requète
    const workSup = req.params.id

    // suppression de donnée correspondant au paramètre récupérée
    deleteJsonFile(filePath, workSup)
    res.status(200).json()

    console.log("Supression effectuée avec succès !")
}

module.exports = { addJob, getJob, supJob }
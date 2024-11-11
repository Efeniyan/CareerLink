// Importations des modules 
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

// Tout pour la gestion des Jobs et utilsateurs

    // Récupération des données des json
    const readJsonFile = (filePath) =>{ 
        // Lecture des fichiers json
        const JsonData = fs.readFileSync(filePath, {encoding: "utf-8"})
        if(JsonData){        // Si json existe alors convertit cela en tableau js
            const transformJsonData = JSON.parse(JsonData)
            return transformJsonData
        }else {             // Sinon crée un nouveau qui sera convertir en json accessible depuis le chemin filePath
            const newJsonData = fs.writeFileSync(filePath, JSON.stringify([]));
            return newJsonData
        }
    }

    // Ajouter des données dans fichiers json
    const writeJsonFile = (filePath, data) => {
        // Stockage des données issues de la lecture des fichiers json dans un tableau 
        const bigDataJson = readJsonFile(filePath)

        // Ajout d'une donnée dans le tableau 
        bigDataJson.push(data)

        // Ajout & Mise à jour du tableau dans jobs.json et users.json lors de chaque push
        fs.writeFileSync(filePath, JSON.stringify(bigDataJson, null, 2))
        return data
    }

    // Gestion des Ids
    const generateId = () => uuidv4()

    // Suppression de données
    const deleteJsonFile = (filePath, data) => {
        const dataBigDelete = readJsonFile(filePath)

        // 
        dataBigDelete.splice(data, 1)
        fs.writeFileSync(filePath, JSON.stringify(dataBigDelete, null, 2))
    }


// Exportation des fonctionnalitées mise en place
    module.exports = {
        readJsonFile,
        writeJsonFile,
        deleteJsonFile,
        generateId
    }
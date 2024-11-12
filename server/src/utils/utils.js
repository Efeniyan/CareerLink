// Importations des modules 
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

// Tout pour la gestion des Jobs et utilsateurs

   // Récupération des données dans le BDD
const readJsonFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "UTF-8");
        console.log("Données récupérées => ", fileData);

        if (fileData) {
            console.log("if", fileData);
            const transformData = JSON.parse(fileData);
            return transformData;
        } else {
            fs.writeFileSync(filePath, JSON.stringify([]));
            return [];
        }
    } else {
        fs.writeFileSync(filePath, JSON.stringify([]));
        return [];
    }
}

// Ajout de données dans la BDD
const writeJsonFile = (filePath, data) => {
    const bigData = readJsonFile(filePath); // récupération du fichier json
    // const todo = {id : 2, description : "Bonjour le monde ", iscompleted : false}
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }
    bigData.push(data[data.length - 1])
    fs.writeFileSync(filePath, JSON.stringify(bigData, null, 2));
}

    // Gestion des Ids
    const generateId = () => uuidv4()

    // Suppression de données
    const deleteJsonFile = (filePath, id) => {
        const dataBigDelete = readJsonFile(filePath)

        // rechercher la donnée avec une comparaison d"id
        const index = dataBigDelete.findIndex(item => item.id === id);
        // supprime la donnée à l'index recherché
        dataBigDelete.splice(index, 1)
        // mettre à jour le bd json àprès la suppression
        fs.writeFileSync(filePath, JSON.stringify(dataBigDelete, null, 2))
    }


// Exportation des fonctionnalitées mise en place
    module.exports = {
        readJsonFile,
        writeJsonFile,
        deleteJsonFile,
        generateId
    }
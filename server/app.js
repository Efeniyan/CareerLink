// Importation des modules et fonctionnalités
const express = require('express');
const app = express();
const jobRouter = require("./src/routes/jobRoute")
const authRouter = require("./src/routes/authRoute")
const PORT = 8000;
const cors = require('cors');

// middleware pour 
app.use(cors()); 


// middleware pour gérer les requêtes
app.use(express.json());
app.use(jobRouter);
app.use(authRouter)


// Route de base
app.get('/', (req, res) => {
    res.status(200).json({ message: "Mon application vient d'être montée" });
});

// Démarrer le serveur en écoutant sur le port spécifié
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

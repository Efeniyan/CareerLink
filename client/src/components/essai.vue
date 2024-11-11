<template>
    <div class="user-jobs">
        <h1>Liste des Offres d'Emploi</h1>

        <!-- Barre de recherche -->
        <div class="search-bar">
            <input 
                v-model="searchTitle" 
                type="text" 
                placeholder="Recherche par titre"
                class="search-input"
            />
            <input 
                v-model="searchDescription" 
                type="text" 
                placeholder="Recherche par description"
                class="search-input"
            />
            <input 
                v-model="searchLocation" 
                type="text" 
                placeholder="Recherche par localisation"
                class="search-input"
            />            
        </div>

        <!-- Affichage du spinner pendant le chargement -->
        <div v-if="loading" class="loading-spinner">
            Chargement des offres d'emploi...
        </div>

        <!-- Affichage des offres d'emploi ou message d'erreur -->
        <div v-if="error" class="error-message">
            Une erreur est survenue : {{ error }}
        </div>

        <div v-if="!loading && !error" class="job-list">
            <div v-for="job in filteredJobs" :key="job.id" class="job-card">
                <div class="job-info">
                    <h3>{{ job.title }}</h3>
                    <p class="job-description">{{ job.description }}</p>
                    <p class="job-location">{{ job.location }}</p>
                </div>
                <div class="job-footer">
                    <button @click="applyForJob(job.id)" class="apply-btn">Postuler</button>
                </div>
            </div>
        </div>

        <div v-if="!loading && jobs.length === 0" class="no-jobs">
            Aucune offre d'emploi disponible actuellement.
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';

// Références pour les données
const jobs = ref([]); // Liste des offres d'emploi
const loading = ref(true); // Indicateur de chargement
const error = ref(null); // Pour gérer les erreurs

// Valeurs de recherche
const searchTitle = ref('');
const searchDescription = ref('');
const searchLocation = ref('');

// Fonction pour récupérer les jobs via fetch
async function fetchJobs() {
    loading.value = true; // Démarrer le chargement
    error.value = null; // Réinitialiser l'erreur
    try {
        const response = await fetch('/data/jobs.json'); // Remplacez par le bon chemin
        if (!response.ok) {
            throw new Error('Échec de la récupération des données');
        }
        const data = await response.json();
        jobs.value = data; // Affecter les données à la liste des jobs
    } catch (err) {
        console.error("Erreur: ", err);
        error.value = err.message; // Enregistrer l'erreur
    } finally {
        loading.value = false; // Arrêter le chargement
    }
}

// Fonction pour "postuler" à un job
function applyForJob(jobId) {
    console.log(`Vous avez postulé pour le job avec l'ID: ${jobId}`);
}

const filteredJobs = computed(() => {
    return jobs.value.filter(job => {
        const matchesTitle = job.title.toLowerCase().includes(searchTitle.value.toLowerCase());
        const matchesDescription = job.description.toLowerCase().includes(searchDescription.value.toLowerCase());
        const matchesLocation = job.location.toLowerCase().includes(searchLocation.value.toLowerCase());
        
        // Retourne vrai uniquement si tous les filtres correspondent
        return matchesTitle && matchesDescription && matchesLocation;
    });
});

// Appel à la fonction fetchJobs lorsque le composant est monté
onMounted(() => {
    fetchJobs();
});
</script>

<style scoped>
    /* Conteneur principal - Forme et animation élégante */
    .user-jobs {
        font-family: 'Roboto', sans-serif;
        background-color: #ffffff; /* Fond blanc éclatant */
        padding: 50px;
        border-radius: 20px;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1); /* Ombre douce pour l'effet flottant */
        max-width: 1200px;
        margin: 40px auto;
        animation: fadeIn 1s ease-in-out;
    }

    /* Animation d'apparition douce */
    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Titre principal - Design épuré avec style */
    h1 {
        font-size: 38px;
        color: #0c969c; /* Vert-bleu lumineux */
        margin-bottom: 30px;
        text-align: center;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-style: italic;
    }

    /* Barre de recherche - Champs et icônes dynamiques */
    .search-bar {
        display: flex;
        justify-content: space-between;
        gap: 30px;
        margin-bottom: 40px;
    }

    /* Champs de recherche - Effet de transition fluide */
    .search-input {
        padding: 14px 25px;
        font-size: 16px;
        border: 2px solid #e0e0e0; /* Bordure fine et propre */
        border-radius: 50px; /* Coins arrondis pour un look moderne */
        width: 30%;
        transition: all 0.3s ease-out;
        background-color: #f5f5f5; /* Légèrement gris clair */
        box-sizing: border-box;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }

    /* Effet au focus - Accent sur le vert-bleu */
    .search-input:focus {
        border-color: #0c969c;
        outline: none;
        box-shadow: 0 5px 15px rgba(12, 150, 156, 0.2);
    }

    /* Message de chargement - Spinner fluide */
    .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #0c969c;
        animation: spin 2s linear infinite;
    }

    /* Animation de rotation */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Message d'erreur - Couleur rouge accentuée */
    .error-message {
        color: #e74c3c; /* Rouge vif pour attirer l'attention */
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    /* Aucun job disponible - Message clair */
    .no-jobs {
        text-align: center;
        font-size: 20px;
        color: #95a5a6; /* Gris neutre pour les messages doux */
    }

    /* Liste des jobs - Grille adaptative et dynamique */
    .job-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 35px;
        transition: all 0.3s ease;
    }

    /* Animation sur hover - Déplacement subtil */
    .job-list:hover {
        transform: translateY(-10px);
    }

    /* Carte de job - Design moderne avec ombre douce */
    .job-card {
        background-color: #ffffff;
        border-radius: 20px; /* Coins bien arrondis */
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12); /* Ombre plus marquée */
        overflow: hidden;
        transform: scale(1);
        transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
        cursor: pointer;
    }

    /* Effet au hover sur la carte de job */
    .job-card:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
        opacity: 0.9;
    }

    /* Informations du job - Design propre et espacé */
    .job-info {
        padding: 30px;
        transition: all 0.3s ease;
    }

    /* Titre du job - Couleur distincte avec effet hover */
    .job-info h3 {
        font-size: 24px;
        color: #0c969c; /* Vert-bleu pour la lisibilité */
        margin-bottom: 20px;
        font-weight: 700;
        letter-spacing: 1px;
        transition: color 0.3s ease, transform 0.3s ease;
    }

    /* Survol du titre du job */
    .job-info h3:hover {
        color: #0a7075; /* Vert plus foncé au survol */
        transform: translateX(5px);
    }

    /* Description du job - Style sobre et lisible */
    .job-description {
        font-size: 16px;
        color: #7f8c8d; /* Gris foncé pour une lecture agréable */
        margin-bottom: 20px;
        line-height: 1.6;
    }

    /* Localisation - Mise en valeur avec vert foncé */
    .job-location {
        font-size: 16px;
        color: #0a7075; /* Vert plus foncé */
        font-weight: 600;
    }

    /* Footer de la carte de job - Fond subtil et design épuré */
    .job-footer {
        padding: 20px;
        background-color: #f7f7f7;
        text-align: center;
        border-top: 1px solid #e1e1e1;
    }

    /* Bouton de postulation - Design percutant et moderne */
    .apply-btn {
        background-color: #0c969c; /* Vert-bleu vif */
        color: white;
        padding: 15px 30px;
        font-size: 18px;
        border: none;
        border-radius: 50px; /* Coins arrondis pour un look moderne */
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(12, 150, 156, 0.2);
    }

    /* Effet de hover sur le bouton de postulation */
    .apply-btn:hover {
        background-color: #0a7075; /* Vert plus foncé au hover */
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(10, 112, 117, 0.3);
    }

    /* Effet sur le bouton lorsqu'il est pressé */
    .apply-btn:active {
        transform: translateY(1px);
    }

    /* Mise en page responsive */
    @media (max-width: 1024px) {
        .job-list {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .job-list {
            grid-template-columns: 1fr;
        }

        .search-input {
            width: 100%;
        }
    }

    /* Animation des cartes de job - Déplacement subtil */
    @keyframes cardSlideIn {
        0% {
            transform: translateY(20px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .job-card {
        animation: cardSlideIn 0.6s ease-in-out;
    }
</style>




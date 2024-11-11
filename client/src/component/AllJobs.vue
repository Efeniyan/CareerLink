<template>
    <div class="user-jobs">
        <h1>Liste des Offres d'Emploi</h1>

        <!-- Affichage du spinner pendant le chargement -->
        <div v-if="loading" class="loading-spinner">
            Chargement des offres d'emploi...
        </div>

        <!-- Affichage des offres d'emploi ou message d'erreur -->
        <div v-if="error" class="error-message">
            Une erreur est survenue : {{ error }}
        </div>

        <div v-if="!loading && !error" class="job-list">
            <div v-for="job in jobs" :key="job.id" class="job-card">
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
import { onMounted, ref } from 'vue';

// Références pour les données
const jobs = ref([]); // Liste des offres d'emploi
const loading = ref(true); // Indicateur de chargement
const error = ref(null); // Pour gérer les erreurs

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

// Appel à la fonction fetchJobs lorsque le composant est monté
onMounted(() => {
    fetchJobs();
});
</script>

<style scoped>
.user-jobs {
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    padding: 50px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 1100px;
    margin: 40px auto;
}

h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #007bff;
}

.error-message {
    color: red;
    text-align: center;
    font-size: 18px;
}

.no-jobs {
    text-align: center;
    font-size: 18px;
    color: #999;
}

.job-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}

.job-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
}

.job-card:hover {
    transform: translateY(-5px);
}

.job-info {
    padding: 20px;
    flex-grow: 1;
}

.job-info h3 {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
}

.job-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
}

.job-location {
    font-size: 14px;
    color: #007bff;
}

.job-footer {
    padding: 20px;
    text-align: center;
    background-color: #f9f9f9;
}

.apply-btn {
    background-color: #007bff;
    color: white;
    padding: 12px 25px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.apply-btn:hover {
    background-color: #0056b3;
}

@media (max-width: 768px) {
    .job-list {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 480px) {
    .job-list {
        grid-template-columns: 1fr;
    }
}
</style>
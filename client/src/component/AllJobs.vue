<template>

<body>
    <NavBar />
  <DarkButton />  
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

    <div class="h-full flex w-full justify-center items-center dark:bg-gray-800 p-2">

<div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5">

    <!-- card  -->
    <div
        class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
        <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
            24
        </div>
        <div class="p-2 flex justify-center">
            <a href="#">
                <img class="rounded-md"
                src="https://tailwindflex.com/public/images/thumbnails/coming-soon-page/thumb_u.min.webp"
                loading="lazy">
            </a>
        </div>

        <div class="px-4 pb-3">
            <div>
                <a href="#">
                    <h5
                        class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                        Card
                    </h5>
                </a>

                <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    A card component 
                </p>
            </div>
        </div>

    </div>

    <!-- card  -->
    <div
        class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
        <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
            19
        </div>

        <div class="p-2 flex justify-center">
            <a href="#">
                <img class="rounded-md"
                src="https://tailwindflex.com/public/images/thumbnails/radio-buttons/thumb_u.min.webp"
                loading="lazy">
            </a>
        </div>

        <div class="px-4 pb-3">
            <div>
                <a href="#">
                    <h5
                        class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                        Input
                    </h5>
                </a>

                <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    description
                </p>
            </div>
        </div>
    </div>

    <!-- card  -->
    <div
        class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
        <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
            18
        </div>
        <div class="p-2 flex justify-center">
            <a href="#">
                <img class="rounded-md"
                src="https://tailwindflex.com/public/images/thumbnails/buttons-with-border-bottom/thumb_u.min.webp"
                loading="lazy">
            </a>
        </div>

        <div class="px-4 pb-3">
            <div>
                <a href="#">
                    <h5
                        class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                        Button
                    </h5>
                </a>
                <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    description
                </p>
            </div>
        </div>
    </div>

    <!-- card  -->
    <div
        class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">

        <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
            15
        </div>

        <div class="p-2 flex justify-center">
            <a href="https://tailwindflex.com/tag/form">
                <img class="rounded-md"
                src="https://tailwindflex.com/public/images/thumbnails/sb-admin-2-login-page-with-tailwind/canvas.min.webp"
                loading="lazy">
            </a>
        </div>


        <div class="px-4 pb-3">
            <div>
                <a href="https://tailwindflex.com/tag/form">
                    <h5
                        class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                        Form
                    </h5>
                </a>

                <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    description
                </p>

            </div>
        </div>
    </div>

    <!-- card  -->
    <div
        class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
        <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
            10
        </div>
        <div class="p-2 flex justify-center">
            <a href="#">
                <img class="rounded-md"
                src="https://tailwindflex.com/public/images/thumbnails/alert-mono-color/thumb_u.min.webp"
                loading="lazy">
            </a>
        </div>


        <div class="px-4 pb-3">
            <div>
                <a href="#">
                    <h5
                        class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                        Alert
                    </h5>
                </a>

                <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    description
                </p>
            </div>
        </div>
    </div>

    <!-- card  -->
    <div
        class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
        <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
            9
        </div>
        <div class="p-2 flex justify-center">
            <a href="#">
                <img class="rounded-md"
                src="https://tailwindflex.com/public/images/thumbnails/mango-gradient/canvas.min.webp"
                loading="lazy">
            </a>
        </div>
        <div class="px-4 pb-3">
            <div>
                <a href="#">
                    <h5
                        class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                        Gradient
                    </h5>
                </a>

                <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    description
                </p>
            </div>
        </div>
    </div>

    <!-- card  -->
    <div
        class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">

        <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
            8
        </div>

        <div class="p-2 flex justify-center">
            <a href="https://tailwindflex.com/tag/badge">
                <img class="rounded-md"
                src="https://tailwindflex.com/public/images/thumbnails/badges-without-border/thumb_u.min.webp"
                loading="lazy">
            </a>
        </div>

        <div class="px-4 pb-3">
            <div>
                <a href="https://tailwindflex.com/tag/badge">
                    <h5
                        class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                        Badge
                    </h5>
                </a>
                <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    description
                </p>
            </div>
        </div>
    </div>

    <!-- card  -->
    <div
        class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
        <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
            7
        </div>

        <div class="p-2 flex justify-center">
            <a href="#">
                <img class="rounded-md"
                src="https://tailwindflex.com/public/images/thumbnails/pagination-with-buttons/thumb_u.min.webp"
                loading="lazy">
            </a>
        </div>


        <div class="px-4 pb-3">
            <div>
                <a href="#">
                    <h5
                        class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                        Button Group
                    </h5>
                </a>

                <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    description
                </p>
            </div>
        </div>

    </div>

    <!-- card  -->
    <div
        class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
        <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
            7
        </div>

        <div class="p-2 flex justify-center">
            <a href="#">
                <img class="rounded-md"
                src="https://tailwindflex.com/public/images/thumbnails/resonsive-card-grid-with-hover-animation/thumb_u.min.webp"
                loading="lazy">
            </a>
        </div>

        <div class="px-4 pb-3">
            <div>
                <a href="#">
                    <h5
                        class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                        Feature
                    </h5>
                </a>
                <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    description
                </p>
            </div>
        </div>
    </div>

    <!-- card  -->
    <div
        class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
        <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
            6
        </div>

        <div class="p-2 flex justify-center">
            <a href="https://tailwindflex.com/tag/call-to-action">
                <img class="rounded-md"
                src="https://tailwindflex.com/public/images/thumbnails/hero-header-with-search-button/thumb_u.min.webp"
                loading="lazy">
            </a>
        </div>

        <div class="px-4 pb-3">
            <div>
                <a href="https://tailwindflex.com/tag/call-to-action">
                    <h5
                        class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                        Call to Action
                    </h5>
                </a>
                <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    description
                </p>
            </div>
        </div>
    </div>

    <!-- card  -->
    <div
        class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
        <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
            6
        </div>
        <div class="p-2 flex justify-center">
            <a href="#">
                <img class="rounded-md"
                src="https://tailwindflex.com/public/images/thumbnails/feature-showcase/canvas.min.webp"
                loading="lazy">
            </a>
        </div>

        <div class="px-4 pb-3">
            <div>
                <a href="#">
                    <h5
                        class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                        Grid
                    </h5>
                </a>

                <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    description
                </p>
            </div>
        </div>
    </div>

    <!-- card  -->
    <div
        class="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
        <div class="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200 w-6 h-6 text-center">
            6
        </div>

        <div class="p-2 flex justify-center">
            <a href="#">
                <img class="rounded-md"
                src="https://tailwindflex.com/public/images/thumbnails/login-form-with-icon/thumb_u.min.webp"
                loading="lazy">
            </a>
        </div>


        <div class="px-4 pb-3">
            <div>
                <a href="#">
                    <h5
                        class="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                        Login
                    </h5>
                </a>
                <p class="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    description
                </p>
            </div>
        </div>
    </div>

</div>

</div>
</body>
    
</template>

<script setup>
import { onMounted, ref } from 'vue';
import NavBar from './NavBar.vue';
import DarkButton from './DarkButton.vue';
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
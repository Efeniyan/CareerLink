<template>

    <body>
        <!-- <DarkButton /> -->
        <section
            class="section min-h-68 flex flex-wrap items-center justify-between pt-6 babybear:flex-col babybear:min-h-0 babybear:px-mobile-container-padding babybear:pt-3"
            data-test-id="hero">
            <div class="hero-content flex-1 pr-6 babybear:w-full babybear:pr-0" data-test-id="hero__content">
                <h1 class="accueil">
                    Bienvenue dans votre communauté professionnelle
                </h1>

                <div class="google-auth-button-container mt-3 w-column max-w-[400px] babybear:mt-0 babybear:w-full">
                    <div class="google-auth-button google-auth-button--without-signin-form mb-2 mx-auto text-center">

                    </div>
                    <div class="left accueil">
                        <RouterLink to="/login" class="" data-test-id="home-hero-sign-in-cta">
                            S’identifier avec une adresse e-mail
                        </RouterLink>

                        <p class="  ">
                            En cliquant sur Continuer pour vous inscrire ou vous identifier, vous acceptez les <a
                                href="#" target="_blank">Conditions d’utilisation</a>, la <a href="#"
                                target="_blank">Politique de confidentialité</a> et la <a href="#"
                                target="_blank">Politique relative aux cookies</a> de Career Link.
                        </p>
                    </div>

                </div>

                <p class="sign-in-form__join-cta-wrapper text-center my-2 w-column babybear:w-full">
                    Nouveau sur Career Link&nbsp;? <RouterLink to="/sign-up"
                        class="sign-in-form__join-cta link link-no-visited-state">S’inscrire</RouterLink>
                </p>
            </div>

            <div
                class="hero-image flex-shrink-0 w-[700px] h-[560px] absolute babybear:w-[374px] babybear:h-[214px] babybear:static">
                <img class="flip-rtl block z-50 w-full h-full object-cover"
                    alt="Bienvenue dans votre communauté professionnelle"
                    src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4">
            </div>
        </section>


        <div class="user-jobs">
        <h1>Liste des Offres d'Emploi</h1>

        <!-- Barre de recherche -->
        <div class="search-bar">
            <input v-model="searchCompany" type="text" placeholder="Recherche par Entreprise" class="search-input" />
            <select v-model="searchJobType" name="type" id="" class="search-input">
                <option value="" disabled>all</option>
                <option value="">Intership</option>
                <option value="">Full-Time</option>
                <option value="">Remote</option>
            </select>
            <select v-model="searchIsStatus" name="type" id="" class="search-input">
                <option value="" disabled>all</option>
                <option value="">pending</option>
                <option value="">interview</option>
            </select>
            <div class="bout">
                <input v-model="searchJobLocation" type="text" placeholder="Recherche par localité"
                    class="search-input" />
                <button type="clear" class="clear">Clear-Filter</button>
            </div>
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
            <div v-for="job in paginatedJobs" :key="job.id" class="job-card">
                <div class="job-info">
                    <h3>{{ job.company }}</h3>
                    <!-- <p class="job-location">{{ job.description }}</p> -->
                    <p class="job-location">{{ job.isStatus }}</p>
                    <p class="job-location">{{ job.jobLocation }}</p>
                    <p class="job-location">{{ job.jobType }}</p>
                    <p class="job-location">{{ job.deadline }}</p>
                </div>
                <div class="job-footer">
                    <button @click="applyForJob(job.id)" class="apply-btn">Postuler</button>
                </div>
            </div>
        </div>

        <!-- Message si aucune offre n'est trouvée -->
        <div v-if="!loading && filteredJobs.length === 0" class="no-jobs">
            Aucune offre d'emploi disponible actuellement.
        </div>

        <!-- Pagination -->
        <div v-if="filteredJobs.length > itemsPerPage" class="pagination">
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Précédent</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Suivant</button>
        </div>
    </div>




    </body>

</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
// Références pour les données
const jobs = ref([]); // Liste des offres d'emploi
const loading = ref(true); // Indicateur de chargement
const error = ref(null); // Pour gérer les erreurs

// Valeurs de recherche
const searchDeadLine = ref('');
const searchDescription = ref('');
const searchCompany = ref('');
const searchJobLocation = ref('');
const searchIsStatus = ref('');
const searchJobType = ref('');

// Pagination
const currentPage = ref(1); // Page courante
const itemsPerPage = 6; // Nombre d'éléments par page
console.log('salut');

// Fonction pour récupérer les jobs via fetch
async function fetchJobs() {
    loading.value = true; // Démarrer le chargement
    error.value = null; // Réinitialiser l'erreur
    const url = "http://localhost:5000/getJob";
    try {
        const response = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
            }
        );
        if (!response.ok) {
            throw new Error('Échec de la récupération des données');
        }
        const data = await response.json();
        console.log(data);

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

// Computed pour filtrer les jobs selon la recherche
const filteredJobs = computed(() => {
    return jobs.value.filter(job => {
        const matchesCompany = job.company.toLowerCase().includes(searchCompany.value.toLowerCase());
        // const matchesDescription = job.description.toLowerCase().includes(searchDescription.value.toLowerCase());
        const matchesJobLocation = job.jobLocation.toLowerCase().includes(searchJobLocation.value.toLowerCase());
        const matchesIsStatus = job.isStatus.toLowerCase().includes(searchIsStatus.value.toLowerCase());
        const matchesDeadLine = job.deadline.toLowerCase().includes(searchDeadLine.value.toLowerCase());
        const matchesJobType = job.jobType.toLowerCase().includes(searchJobType.value.toLowerCase());

        return matchesCompany  && matchesIsStatus && matchesDeadLine && matchesJobLocation && matchesJobType;
    });
});

// Computed pour gérer la pagination après filtrage
const totalPages = computed(() => {
    return Math.ceil(filteredJobs.value.length / itemsPerPage);
});

// Computed pour la pagination sur les résultats filtrés
const paginatedJobs = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredJobs.value.slice(startIndex, endIndex);
});

// Fonction pour naviguer entre les pages
function goToPage(page)
 {
    if (page < 1 || page > totalPages.value) return; // Empêcher de sortir des limites
    currentPage.value = page;
}

// Réinitialiser la page à 1 lorsqu'un critère de recherche change
watch([searchCompany, searchDescription, searchJobLocation], () => {
    currentPage.value = 1; // Réinitialise la page à 1 lorsque l'un des filtres change
});

// Appel à la fonction fetchJobs lorsque le composant est monté
onMounted(() => {
    fetchJobs();
});
</script>

<style scoped>
.user-jobs {
    font-family: 'Roboto', sans-serif;
    background-color: #ffffff;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 40px auto;
    animation: fadeIn 1s ease-in-out;
}

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

h1 {
    font-size: 38px;
    color: #0c969c;
    margin-bottom: 30px;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-style: italic;
}

.search-bar {
    display: block;
    justify-content: space-around;
    gap: 30px;
    margin-bottom: 40px;
}

.bout {
    margin-top: 20px;
    justify-content: space-around;
}



.search-input {
    padding: 14px 25px;
    font-size: 16px;
    border: 2px solid #e0e0e0;
    border-radius: 50px;
    width: 30%;
    transition: all 0.3s ease-out;
    background-color: #f5f5f5;
    box-sizing: border-box;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
    border-color: #0c969c;
    outline: none;
    box-shadow: 0 5px 15px rgba(12, 150, 156, 0.2);
}

.bout .search-input {
    margin-right: 100px;
}

.bout .clear {
    background-color: rgb(243, 65, 65);
    padding: 9px;
    border-radius: 12px;
    padding: 14px 25px;
    font-size: 16px;
    border: 2px solid #e0e0e0;
    border-radius: 50px;
    width: 50%;
    transition: all 0.3s ease-out;
    box-sizing: border-box;
    color: white;
    font-size: 18px;
    font-weight: bolder;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #0c969c;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.error-message {
    color: #e74c3c;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.no-jobs {
    text-align: center;
    font-size: 20px;
    color: #95a5a6;
 } 

.job-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 35px;
    transition: all 0.3s ease;
}

.job-list:hover {
    transform: translateY(-10px);
}

.job-card {
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    transform: scale(1);
    transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
    cursor: pointer;
}

.job-card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
    opacity: 0.9;
}

.job-info {
    padding: 30px;
    transition: all 0.3s ease;
}

.job-info h3 {
    font-size: 24px;
    color: #0c969c;

    margin-bottom: 20px;
    font-weight: 700;
    letter-spacing: 1px;
    transition: color 0.3s ease, transform 0.3s ease;
}

.job-info h3:hover {
    color: #0a7075;
    transform: translateX(5px);
}

.job-description {
    font-size: 16px;
    color: #7f8c8d;
    margin-bottom: 20px;
    line-height: 1.6;
}

.job-location {
    font-size: 16px;
    color: #0a7075;
    font-weight: 600;
}

    .job-footer { 
    padding: 20px;
    background-color: #f7f7f7;
    text-align: center;
    border-top: 1px solid #e1e1e1;
}

.apply-btn {
    background-color: #0c969c;
    color: white;
    padding: 15px 30px;
    font-size: 18px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 5px 15px rgba(12, 150, 156, 0.2);
}

.apply-btn:hover {
    background-color: #0a7075;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(10, 112, 117, 0.3);
}

.apply-btn:active {
    transform: translateY(1px);
}

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

.pagination {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
}

.pagination button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #0c969c;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.pagination button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
}

.pagination button:hover {
    background-color: #0a7075;
}

.pagination span {
    font-size: 18px;
    align-self: center;
}

/* / / Section contenant l'introduction / / */
.section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding-top: 1.5rem;
    /* / / Équivalent à pt-6 / / */
}

.left {
    /* / / width: 400px; / / */

    padding-left: 6rem;
}

.acceuil {
    font-size: 30px;

}

.acceuil p {
    font-size: 20px;
    width: 600px;
    height: 100px;
}

.hero-content {
    flex: 1;
    /* / padding-right: 1.5rem; /
    / text-align: center; /
    / Équivalent à pr-6 / */
    max-width: 35%;
}

.hero-image {
    flex-shrink: 0;
    width: 700px;
    height: 560px;
    position: relative;
}

.hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.google-auth-button-container {
    margin-top: 1rem;
    width: 100%;
    max-width: 400px;
    text-align: center;
}

.sign-in-form__sign-in-cta {
    display: block;
    width: 100%;
    height: 40px;
    text-align: center;
    padding: 10px 0;
    background-color: #0073b1;
    /* // Couleur de fond LinkedIn /  */
    color: white;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 1rem;
}

.sign-in-form__sign-in-cta:hover {
    background-color: #005b8f;
    /* / / Hover color / / */
}

.linkedin-tc__text {
    font-size: 12px;
    color: #6e6e6e;
    margin-top: 1rem;
}

.sign-in-form__join-cta-wrapper {
    margin-top: 1rem;
    font-size: 14px;
}

.sign-in-form__join-cta {
    color: #0073b1;
    text-decoration: none;
}

.sign-in-form__join-cta:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .section {
        flex-direction: column;
    }

    .hero-content {
        max-width: 100%;
        text-align: center;
        margin-bottom: 1.5rem;
    }

    .hero-image {
        width: 100%;
        height: auto;
    }

    .google-auth-button-container {
        width: 100%;
        margin-top: 0;
    }
}
</style>
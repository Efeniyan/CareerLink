<template>
    <Header></Header>
    <div class="add-job-container">
        <h2>Ajouter une offre de job</h2>
        <p>Complétez les informations suivantes pour publier un job.</p>

        <div class="form-card">
            <form @submit.prevent="submitJobForm">
                <!-- Disposition avec 2 inputs par ligne -->
                <div class="form-row">
                    <!-- Nom du Job -->
                    <div class="form-group">
                        <label for="title">Nom du Job</label>
                        <input type="text" id="title" v-model="job.title" placeholder="Nom du job" required />
                    </div>

                    <!-- Nom de l'entreprise -->
                    <div class="form-group">
                        <label for="company">Nom de l'entreprise</label>
                        <input type="text" id="company" v-model="job.company" placeholder="Nom de l'entreprise" required />
                    </div>
                </div>

                <div class="form-row">
                    <!-- Localisation de l'entreprise -->
                    <div class="form-group">
                        <label for="jobLocation">Localisation</label>
                        <input type="text" id="jobLocation" v-model="job.jobLocation" placeholder="Lieu de l'entreprise" required />
                    </div>

                    <!-- Statut -->
                    <div class="form-group">
                        <label for="isStatus">Statut</label>
                        <select id="isStatus" v-model="job.isStatus" required>
                            <option value="open">pending</option>
                            <option value="closed">interview</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <!-- Date limite -->
                    <div class="form-group">
                        <label for="deadline">Dernier délai</label>
                        <input type="date" id="deadline" v-model="job.deadline" required />
                    </div>

                    <!-- Type de job -->
                    <div class="form-group">
                        <label for="jobType">Type de job</label>
                        <select id="jobType" v-model="job.jobType" required>
                            <option value="full-time">Intership</option>
                            <option value="part-time">Full-Time</option>
                            <option value="freelance">Remote</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <!-- Description du job -->
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" v-model="job.description" placeholder="Décrivez le poste..." required></textarea>
                    </div>

                    <div class="form-group bouton">
                        <!-- Bouton de soumission -->
                        <div>
                            <button type="submit" class="submit">Ajouter le job</button>
                        </div>
                        <!-- Bouton Annuler -->
                        <div>
                            <button type="button" @click="resetForm" class="cancel">Annuler</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Header from './Header.vue';
import Swal from "sweetalert2";

// Variables liées au formulaire du job
let job = ref({
    title: '',
    company: '',
    jobLocation: '',
    isStatus: 'open',
    deadline: '',
    jobType: 'full-time',
    description: ''
});

// Fonction pour réinitialiser le formulaire
const resetForm = () => {
    job.value = {
        title: '',
        company: '',
        jobLocation: '',
        isStatus: 'open',
        deadline: '',
        jobType: 'full-time',
        description: ''
    };
};

// Fonction pour valider et soumettre le formulaire du job
const submitJobForm = async () => {
    // Vérification si tous les champs sont remplis
    if (!job.value.title.trim() || !job.value.company.trim() || !job.value.jobLocation.trim() ||
        !job.value.deadline.trim() || !job.value.jobType.trim() || !job.value.description.trim()) {
        Swal.fire({
            icon: 'error',
            title: 'Champs incomplets',
            text: 'Veuillez remplir tous les champs du formulaire.',
        });
        return;
    }

    // Construire l'objet des informations du job
    const jobInfo = {
        title: job.value.title.trim(),
        company: job.value.company.trim(),
        jobLocation: job.value.jobLocation.trim(),
        isStatus: job.value.isStatus,
        deadline: job.value.deadline,
        jobType: job.value.jobType,
        description: job.value.description.trim()
    };

    const url = "http://localhost:8000/add-job"; // Remplacer par l'URL de votre API backend

    try {
        // Envoi de la requête POST vers le serveur
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jobInfo)
        });

        const data = await response.json();

        if (response.status === 200) {
            // Affichage d'un message de succès et réinitialisation du formulaire
            Swal.fire({
                icon: 'success',
                title: 'Job ajouté',
                text: 'L\'offre de job a été ajoutée avec succès.',
            }).then(() => {
                resetForm(); // Réinitialiser le formulaire
            });
        } else {
            // Affichage d'un message d'erreur
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: data.msg || 'Une erreur est survenue. Veuillez réessayer.',
            });
        }
    } catch (error) {
        // Affichage d'une erreur en cas de problème de connexion
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Erreur serveur',
            text: 'Une erreur est survenue lors de l\'ajout de l\'offre. Veuillez réessayer plus tard.',
        });
    }
};

</script>


<style scoped>
/* Style pour le formulaire */
.add-job-container {
    max-width: 1200px;
    margin: 30px auto;
    padding: 30px;
    background-color: #f4f9f4;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    text-align: center;
}

/* Conteneur principal */
.add-job-container {
    max-width: 1200px;
    margin: 30px auto;
    padding: 30px;
    background-color: #f4f9f4;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-top: 150px;
}

.bouton {
    margin-top: 50px;
    justify-content: space-around;
}

.submit {
    background-color: #308330;
    width: 100%;
    color: #fff;
    padding: 8px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 22px;
    font-weight: bold;
    border-radius: 6px;
}

.cancel {
    background-color: #f83a34;
    width: 100%;
    color: white;
    padding: 8px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 22px;
    font-weight: bold;
    border-radius: 6px;
}

/* Titre de la page */
.add-job-container h2 {
    font-size: 30px;
    color: #2a6d3f;
    margin-bottom: 10px;
    font-weight: bold;
}

.add-job-container p {
    font-size: 16px;
    color: #666;
}

/* Card contenant le formulaire */
.form-card {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* Disposition des lignes avec 2 inputs par ligne */
.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-size: 14px;
    color: #555;
    margin-bottom: 8px;
    font-weight: 500;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fafafa;
    transition: all 0.3s ease;
}

.form-group textarea {
    min-height: 150px;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    border-color: #56ab2f;
    box-shadow: 0 0 8px rgba(86, 171, 47, 0.5);
}

/* Bouton de soumission */
.submit-btn {
    padding: 12px 30px;
    background-color: #56ab2f;
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
}

.submit-btn:hover {
    background-color: #3c913c;
}

.submit-btn:active {
    background-color: #2e7d2e;
}

/* Bouton Annuler */
.cancel-btn {
    padding: 12px 30px;
    background-color: #ff4e4e;
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
    margin-top: 15px;
}

.cancel-btn:hover {
    background-color: #d94343;
}

.cancel-btn:active {
    background-color: #c53232;
}

/* Responsive - Pour les écrans plus petits */
@media (max-width: 768px) {
    .form-row {
        grid-template-columns: 1fr;
        /* Pour les petits écrans, chaque champ prend toute la largeur */
    }

    .add-job-container {
        padding: 15px;
    }

    .form-card {
        padding: 20px;
    }
}
</style>

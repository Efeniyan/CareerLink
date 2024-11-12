<script setup>
import { onMounted, ref } from 'vue';

// Références pour les données
const user = ref({
  id: '',
  name: '',
  email: '',
  localite: ''
});

// Fonction pour récupérer les informations de l'utilisateur
async function fetchUser() {
  try {
    // Utilisation d'un chemin relatif vers le fichier users.json dans le dossier public
    const response = await fetch('/data/users.json'); // Chemin vers le fichier dans /public/data/
    if (!response.ok) {
      throw new Error('Échec de la récupération des données');
    }
    const data = await response.json();
    
    // Vérification du format des données
    console.log('Données récupérées:', data); // Affichage dans la console

    // Recherche de l'utilisateur avec l'ID spécifique
    const userId = '556ac428-7278-4a8e-98c3-5610ad68075d'; // ID de l'utilisateur spécifique

    // Recherche de l'utilisateur dans le tableau
    const foundUser = data.find(u => u.id === userId);

    if (foundUser) {
      // L'utilisateur a été trouvé, assignation à la variable `user`
      user.value = foundUser;
    } else {
      console.error('Utilisateur non trouvé avec cet ID');
    }
  } catch (err) {
    // Affichage des erreurs dans la console
    console.error("Erreur lors de la récupération des données :", err);
  }
}

// Appel de la fonction fetchUser lorsque le composant est monté
onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div>
    <!-- Formulaire de modification des informations -->
    <div class="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-8">Modifier votre Profil</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Nom -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
          <input type="text" id="name" v-model="user.name"
                 class="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                 placeholder="Entrez votre nom">
        </div>

        <!-- Localisation -->
        <div>
          <label for="localite" class="block text-sm font-medium text-gray-700">Localisation</label>
          <input type="text" id="localite" v-model="user.localite"
                 class="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                 placeholder="Entrez votre localisation">
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="user.email"
                 class="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                 placeholder="Entrez votre email">
        </div>

        <!-- Mot de passe -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input type="password" id="password"
                 class="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                 placeholder="Entrez votre mot de passe">
        </div>

        <!-- Bouton pour sauvegarder les changements -->
        <div class="col-span-2 flex justify-center mt-6">
          <button @click="saveChanges"
                  class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200">
            Sauvegarder les modifications
          </button>
        </div>
      </div>
    </div>

    <!-- Affichage des informations utilisateur -->
    <div class="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-8">Vos informations personnelles</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-if="user.name">
          <p><strong>Nom:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Localisation:</strong> {{ user.localite }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style pour le formulaire de modification */
input, button {
  transition: all 0.3s ease;
}

/* Boutons */
button {
  font-size: 16px;
  font-weight: bold;
}

/* Informations personnelles affichées */
#user-details p {
  margin: 0;
  font-size: 16px;
  color: #4a4a4a;
}
</style>

<script setup>
import { ref } from 'vue';

const isNavOpen = ref(false);

function openNav() {
    isNavOpen.value = true;
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("head-container").style.marginLeft = "250px";
}

function closeNav() {
    isNavOpen.value = false;
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("head-container").style.marginLeft = "0";
}
</script>

<template>
    <div id="head-container">
        <!----------------- SIDE NAVIGATION ---------------------->

        <div id="mySidenav" class="sidenav">
            <div class="menu">
                <h2>Menu</h2>
                <span class="closebtn" @click="closeNav()">&times;</span>
            </div>
            <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill="#FFFFFF">
                    <path
                        d="M200-120q-33 0-56.5-23.5T120-200v-640h80v640h640v80H200Zm40-120v-360h160v360H240Zm200 0v-560h160v560H440Zm200 0v-200h160v200H640Z" />
                </svg>
                <RouterLink to="/stats">Stats</RouterLink>
            </p>
            <p><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="24px"
                    fill="#FFFFFF">
                    <path
                        d="m105-399-65-47 200-320 120 140 160-260 120 180 135-214 65 47-198 314-119-179-152 247-121-141-145 233Zm475 159q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29ZM784-80 676-188q-21 14-45.5 21t-50.5 7q-75 0-127.5-52.5T400-340q0-75 52.5-127.5T580-520q75 0 127.5 52.5T760-340q0 26-7 50.5T732-244l108 108-56 56Z" />
                </svg>
                <RouterLink to="/all-job">All Jobs</RouterLink>
            </p>
            <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill="#FFFFFF">
                    <path
                        d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-480H200v480Zm80-280v-80h400v80H280Zm0 160v-80h240v80H280Z" />
                </svg>
                <RouterLink to="/add-job">Add Job</RouterLink>
            </p>
            <p><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"
                    fill="#FFFFFF">
                    <path
                        d="M226-262q59-42.33 121.33-65.5 62.34-23.17 132.67-23.17 70.33 0 133 23.17T734.67-262q41-49.67 59.83-103.67T813.33-480q0-141-96.16-237.17Q621-813.33 480-813.33t-237.17 96.16Q146.67-621 146.67-480q0 60.33 19.16 114.33Q185-311.67 226-262Zm253.88-184.67q-58.21 0-98.05-39.95Q342-526.58 342-584.79t39.96-98.04q39.95-39.84 98.16-39.84 58.21 0 98.05 39.96Q618-642.75 618-584.54t-39.96 98.04q-39.95 39.83-98.16 39.83ZM480.31-80q-82.64 0-155.64-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.51T80-480.18q0-82.82 31.5-155.49 31.5-72.66 85.83-127Q251.67-817 324.51-848.5T480.18-880q82.82 0 155.49 31.5 72.66 31.5 127 85.83Q817-708.33 848.5-635.65 880-562.96 880-480.31q0 82.64-31.5 155.64-31.5 73-85.83 127.34Q708.33-143 635.65-111.5 562.96-80 480.31-80Zm-.31-66.67q54.33 0 105-15.83t97.67-52.17q-47-33.66-98-51.5Q533.67-284 480-284t-104.67 17.83q-51 17.84-98 51.5 47 36.34 97.67 52.17 50.67 15.83 105 15.83Zm0-366.66q31.33 0 51.33-20t20-51.34q0-31.33-20-51.33T480-656q-31.33 0-51.33 20t-20 51.33q0 31.34 20 51.34 20 20 51.33 20Zm0-71.34Zm0 369.34Z" />
                </svg>
                <RouterLink to="/profile">Profile</RouterLink>
            </p>
        </div>

        <img class="logo" src="../assets/logo.PNG" alt=""/>

        <svg v-if="!isNavOpen" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="#FFFFFF" @click="openNav()">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>

        <!-- Header avec couleur verte -->
        <nav>
            <h2 class="dash">Dashboard</h2>
        </nav>
    </div>
</template>

<style scoped>
.logo{
    height: 70px;
    width: 100px;
}
#head-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    width: 100%;
    height: 5%;
    background-color: #0c969c;
    /* Green background */
    transition: margin-left .5s;
    padding: 16px;
}

.menu {
    height: 5.5%;
    padding: 5px;
    background-color: #0b7a7a;
    /* Slightly darker green for the menu */
    border-bottom: solid 5px #076969;
    /* Dark green border */
}

h2 {
    margin-top: 7px;
    font-size: xx-large;
    color: #ffffff;
    /* White text for better contrast */
}

p {
    border-bottom: solid #076969;
    /* Darker green border for items */
}

.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #0c4c4c;
    /* Greenish dark background */
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 40px;
}

.sidenav p {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #e0e0e0;
    /* Light gray text */
    display: block;
    transition: 0.3s;
}

.sidenav p:hover {
    color: #ffffff;
    /* White hover text */
}

.sidenav .closebtn {
    position: absolute;
    top: 5%;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    cursor: pointer;
}

@media screen and (max-height: 450px) {
    .sidenav {
        padding-top: 15px;
    }

    .sidenav p {
        font-size: 18px;
    }
}

nav {
    display: flex;
    align-items: center;
    gap: 600px;
}

.dash {
    font-family: "Poppins", sans-serif;
    font-size: 2.1rem;
    font-weight: bold;
    color: #ffffff;
    /* White text */
}

.avatar {
    width: 50px;
    height: 50px;
    border: solid white;
    border-radius: 50%;
    overflow: hidden;
    position: fixed;
    right: 10%;
}

img {
    width: 100%;
    height: 100%;
}

.rotate {
    position: fixed;
    left: 4%;
    animation: rotate 2s linear infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>

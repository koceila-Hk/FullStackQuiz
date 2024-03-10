document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.getElementById('countdown');
    const q1 = document.getElementById("container_QCM_1");
    const q2 = document.getElementById("container_QCM_2");
    const next=document.querySelector('#next')
    
    next.addEventListener('click',function(){
        q1.style.display = "none";
        q2.style.display = "block";
    })

    function check() {
        if (countdownElement.textContent === "Temps écoulé" ) {
            q1.style.display = "none";
            q2.style.display = "block";
            start();
        }
    }

    function start() {
        let count = 10; 

        function updateCount() {
            countdownElement.textContent = count;
            count--;

            if (count < 0) {
                clearInterval(counter);
                countdownElement.textContent = "Temps écoulé";
                check();
            }
        }

        updateCount();
        const counter = setInterval(updateCount, 1000);
    }
    start();
});


                 // ========== récupérer les données de l'utilisateur ============== 
                 
// ======== ajout clic droit ==========

import { clicDroit, ctrlData, leavePage, answersUser, resizePage } from './fetch.js';

const url = new URLSearchParams(window.location.search);
const nom = url.get("nom");
  
document.addEventListener('contextmenu', async function() {
     const data = await clicDroit(nom);
     console.log('Données reçues du serveur :', data);
});


// ======== ajout ctrl-c ctrl-v ==========

document.addEventListener('keydown', async (event) => {
    if (event.key === "v" && event.ctrlKey) {
        const data = await ctrlData(nom);
        console.log(data);
    }
    else if (event.key === "c" && event.ctrlKey) {
        const data = await ctrlData(nom);
    }
});

// ======= détecter si l'utilisateur a quitté la page ============= 

document.body.addEventListener('mouseleave', async () => {
    const data = await leavePage(nom);
    console.log(data);
});

// ========= add answers =========

const list = []
const button = document.querySelectorAll("button");

button.forEach(element => {
        element.addEventListener('click', async () => {
            list.push(element.innerHTML)
            // console.log(list);
            if (list.length == 2) {
                const data = await answersUser(nom, list);
            }
        })
});

// =============== redimensionnement d'une fenêtre ===================

async function handleResize() {
    const data = await resizePage(nom);
    console.log(data);
    return true;
  }
  window.onresize = handleResize;

// document.addEventListener('keydown', async (event) => {

//     if (event.key === "v" && event.ctrlKey) {
//         const req = new XMLHttpRequest()
//         const url = "http://localhost:3000/ctrl?nom=" + encodeURIComponent(nom)
//         req.open("GET",url,true)
//         req.send();
//     }
// });







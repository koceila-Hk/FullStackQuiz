const next = document.getElementById('next');
const question1 = document.getElementById('container_QCM_1');
const question2 = document.getElementById('container_QCM_2');
const end       = document.getElementById('end');
console.log(end);

const timer = document.getElementById('timer');
let temps = 10;
let timerInterval = setInterval(diminuerTemps, 1000); 

function diminuerTemps() {
    timer.innerText = temps;
    temps--;
    if (temps < 0) {
        question1.style.display = 'none';
        question2.style.display = 'flex';
        clearInterval(timerInterval); 
        resetTimer(); 
    } else if (temps === 0) {
        setTimeout(() => {
            question2.style.display = 'none';
            end.style.display = 'block';
        },temps)
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    temps = 10;
    diminuerTemps();
    timerInterval = setInterval(diminuerTemps, 1000);
}

next.addEventListener('click', () => {
    question1.style.display = 'none';
    question2.style.display = 'flex';
    resetTimer(); 
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
});

// ========= add answers =========

const list = []
const button = document.querySelectorAll("button");

button.forEach(element => {
        element.addEventListener('click', async () => {
            list.push(element.innerHTML)
            console.log(list);
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







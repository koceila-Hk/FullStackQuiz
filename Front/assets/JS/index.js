const next = document.getElementById('next');
const question1 = document.getElementById('container_QCM_1');
const question2 = document.getElementById('container_QCM_2');
const endTest   = document.getElementById('end');

const timer = document.getElementById('timer');
let temps = 10;
let timerInterval = setInterval(diminuerTemps, 1000); 

// ======== function diminuerTemps =========

function diminuerTemps() {
    timer.innerText = temps;
    // temps = temps < 0 ? temps : 1;
    backRefreshPage();
    if (temps === 4) {
        timer.style.color = 'red';
        document.querySelector('.fa-solid').style.color = 'red';
    } 
    if (temps < 0 ) {
        question1.style.display = 'none';
        question2.style.display = 'flex';
        clearInterval(timerInterval);
        resetTimer();
    } else if (temps <= 0 && question2.style.display === 'flex') {
        question2.style.display = 'none';
        endTest.style.display = 'block';
        next.style.display = 'none';
        document.querySelector('.Title-test').style.display = 'none';
        clearInterval(timerInterval);
    }
    if (temps === 10) {
        timer.style.color = 'white';
        document.querySelector('.fa-solid').style.color = 'white';
    }
    temps--;
}

// ======== function back actualize page =========

function backRefreshPage() {
window.addEventListener('beforeunload', async function () {
    const data = await backActualizeNav(nom);
    console.log(data);
  });
}

// ========== function restTimer ==========

function resetTimer() {
    clearInterval(timerInterval);
    temps = 10;
    diminuerTemps();
    timerInterval = setInterval(diminuerTemps, 1000);
}

// ========== button next question ========= 

next.addEventListener('click', () => {
    question1.style.display = 'none';
    question2.style.display = 'flex';
    resetTimer(); 
});


                 // ========== récupérer les données de l'utilisateur ============== 
                 
// ======== ajout clic droit ==========

import { clicDroit, ctrlData, leavePage, answersUser, resizePage, backActualizeNav } from './fetch.js';

const url = new URLSearchParams(window.location.search);
const nom = url.get("nom");
  
document.addEventListener('contextmenu', async function() {
    if (endTest.style.display === 'block') {
        return;
    }

    clicdroit = true;
    if (tentativeSuspect()) { 
     const data = await clicDroit(nom);
     console.log(data);
    }
});


// ======== ajout ctrl-c ctrl-v ==========

document.addEventListener('keydown', async (event) => {
    if (endTest.style.display === 'block') {
        return;
    }

    else if (event.key === "v" && event.ctrlKey) {
        const data = await ctrlData(nom);
        console.log(data);
    }
    else if (event.key === "c" && event.ctrlKey) {
        const data = await ctrlData(nom);
    }
});

// ======= détecter si l'utilisateur a quitté la page ============= 

document.body.addEventListener('mouseleave', async () => {
    if (endTest.style.display === 'block') {
        return;
    }

    mouseleavePage = true;
    if (tentativeSuspect()) {
    const data = await leavePage(nom);
    console.log(data);
    }
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
    if (endTest.style.display === 'block') {
        return;
    }

    resisedPage = true;
    if (tentativeSuspect()) {
    const data = await resizePage(nom);
    console.log(data);
    }
}
window.onresize = handleResize;



// =========== function tentative suspect ============

// let ctrl = false;
let resisedPage = false;
let clicdroit = false;
let mouseleavePage = false;
const gif  = document.getElementById('gif');
const test = document.getElementById('test');

function tentativeSuspect() {
    if (clicdroit || resisedPage || mouseleavePage) {
        test.style.display = 'none';
        gif.style.display  = 'block';
        return true;
    } else {
        return false;
    }
}
  
// document.addEventListener('keydown', async (event) => {

//     if (event.key === "v" && event.ctrlKey) {
//         const req = new XMLHttpRequest()
//         const url = "http://localhost:3000/ctrl?nom=" + encodeURIComponent(nom)
//         req.open("GET",url,true)
//         req.send();
//     }
// });




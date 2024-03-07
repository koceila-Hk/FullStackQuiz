/* déclaration de mes variable */
// déclarer la variable qui corrrespond au nombre de question
let nb_question = -1;
const q1= document.getElementById("1");
const nb_Q = document.getElementById('nb_Q');
const q2= document.getElementById("2");
// déclarer le container principal 
const container_principal = document.getElementById('container_principal');
// texte finisher a la fin de l'examen
/* déclarationd de mes différentes fonction */ 
function next_Q() {
    // déclarer le contenaire peincipal
    contair_principal = document.getElementById("container_principal");
    cache_container= contair_principal.style.display="none";
    // déclarer *le bouton next
    const btn_next = document.getElementById('next_Q');
   
    nb_question += 1;
    nb_Q.innerHTML = nb_question;
    // faire appraire la question 2
    btn_next.addEventListener('click', function(){
        if(nb_question == 2){
            q1 =cache1;
            q2 =visible2;       
            console.log("one passe à la question 2")
        }  
        else if (nb_question>2)
        {
            nb_question=1
            nb_Q.innerHTML = nb_question;
        }
    })
    console.log("vous passez à la question suivante ")
    console.log(nb_question)
}


    //les reponse fause 
function madrid(){
    q1.style.display="none";
    q2.style.display ="block";
    nb_question += 1;
    nb_Q.innerHTML = nb_question;
}

     //la reponse fause 
function Clermont(){
    q1.style.display="none";
    q2.style.display ="block";
    nb_question += 1;
    nb_Q.innerHTML = nb_question;
}


function barcelone(){

    q1.style.display="none";
    q2.style.display ="block";
    nb_question += 1;
    nb_Q.innerHTML = nb_question;


}
    
function  Stockolm(){


    container_principal.style.display ="none";
    const text_finish = document.getElementById("finish_test");
    text_finish.style.display="block";
    
    nb_question += 1;
    nb_Q.innerHTML = nb_question;}

function Bern(){
    
    container_principal.style.display ="none";
    const text_finish = document.getElementById("finish_test");
    text_finish.style.display="block";
    nb_question += 1;
    nb_Q.innerHTML = nb_question;
}


function barcelone2(){
    container_principal.style.display ="none";
    const text_finish = document.getElementById("finish_test");
    text_finish.style.display="block";
    nb_question += 1;
    nb_Q.innerHTML = nb_question;}

//mtn les réponses bonne

function Paris(){
    q1.style.display="none";
    q2.style.display ="block";
    nb_question += 1;
    nb_Q.innerHTML = nb_question;
}
function Madrid2(){
    container_principal.style.display ="none";
    const text_finish = document.getElementById("finish_test");
    text_finish.style.display="block";
    nb_question += 1;
    nb_Q.innerHTML = nb_question;
}
// Récupérer l'élément span avec l'ID de la vbaliise html qui me permet d'avoir un compteur
let counttimeElement = document.getElementById('counttime');
// Définir le nombre total de secondes pour le décompte
let totalSeconds = parseInt(counttimeElement.textContent);
// Définir l'intervalle de décompte
let countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
    if (totalSeconds > 0) {
        totalSeconds--;
        counttimeElement.textContent = totalSeconds;
    } else {
        clearInterval(countdownInterval);
        counttimeElement.textContent = "Temps écoulé";
        
        if (counttimeElement.textContent === "Temps écoulé") {
            while (nb_question < 2) {
                nb_question += 1;
                if(nb_question ===2){
                    clearInterval(updateCountdown)
                }
            }
            
            nb_Q.innerHTML = nb_question; 
            q1.style.display = "none";
            q2.style.display = "block";     
        }
        
        /* 
        Vérifiez si q2 est visible et redémarrez le décompte si nécessaire
        */
        startCountdown(); // Redémarre le décompte pour la question 2
    }
}
 function startCountdown() {
    totalSeconds = 7; // Réinitialise le nombre total de secondes
    countdownInterval = setInterval(updateCountdown, 1000); 
}

//récu




// détecter le click droit

// const elements = document.querySelectorAll("*");

// elements.forEach((element) => {
//     element.addEventListener("contextmenu", (event) => {
//     event.preventDefault();

//     alert("Détection de tentative de triche! Vous n'êtes pas autorisé à faire un clic droit.");

// });
// });


// detection de changement de page

let currentURL = window.location.href;
console.log(currentURL);

function checkPageChange() {
    if (currentURL !== window.location.href) {
        alert("Détection de tentative de triche! Vous ne pouvez pas naviguer pendant le qcm.");
        window.history.back();
    }
}

window.addEventListener("hashchange", checkPageChange);
window.addEventListener("popstate", checkPageChange);

// detection du controle v

const body = document.querySelector("body");

body.addEventListener("keydown", (event) => {

    if (event.ctrlKey) {
        if (event.key === "v" || event.code === "KeyS") {
            alert("Détection de tentative de triche! Vous n'êtes pas autorisé à coller sur la page.");
            event.preventDefault();
    }
}
});


// envoyer base de donnée-----------------------

// async function enregistrerComportement(nom, prenom, sortie, nbrTab, total_time_outside_tab, navOUt , scrore_fiabilite) {
//             try {
//                 const data = {
//                     Nom: nom,
//                     Prenom: prenom,
//                     mousleave: sortie,
//                     new_tab: nbrTab,
//                     new_tab_time: total_time_outside_tab / 1000,
//                     navOut: navOUt , 
//                     score  : scrore_fiabilite 
//                 };

//                 const response = await fetch('http://localhost:3000/api/v1/add', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(data)
//                 });

//                 if (!response.ok) {
//                     throw new Error('Échec de la requête : ' + response.status);
//                 }
//                 console.log('Données envoyées avec succès.');
//             } catch (error) {
//                 console.error('Erreur lors de la requête fetch :', error.message);
//             }
//         }


import { addSuspectAction, getUserNom,search } from './fetch.js';
const url=new URLSearchParams(window.location.search);
var nom=url.get("nom")
document.addEventListener('contextmenu', async (e) => {
  var req=new XMLHttpRequest()
  var url="http://localhost:3000?nom=" + encodeURIComponent(nom)
  req.open("GET",url,true)
  req.send();
});









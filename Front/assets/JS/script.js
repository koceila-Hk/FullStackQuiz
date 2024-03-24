import { registerUser } from './fetch.js';

const formRegister = document.getElementById('formRegister');

formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const promo = document.getElementById('promo').value;

    const userData = {
        nom,
        prenom,
        promo
    };

    const response = await registerUser(userData);

    window.location.href = './test.html?nom='+nom;
});



// ======== Acuueil Image ===========

const receptionImage = document.getElementById('receptionPage');
    
setTimeout(() => {
    receptionImage.style.display = "none";
}, 5000);
async function registerUser(userData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    try {
        const response = await fetch('http://localhost:3000/api/v1/user', requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        throw error;
    }
}

async function search(noms) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noms)
    };

    try {
        const response = await fetch('http://localhost:3000/api/v1/user/name', requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        throw error;
    }
}
// Fonction pour envoyer une requête POST au serveur backend pour enregistrer l'action suspecte
async function addSuspectAction(userId) {
    try {
        const response = await fetch('http://localhost:3000/api/v1/suspect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        });

        if (response.ok) {
            return {};
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        return { error: error.message };
    }
}




async function getUserNom() {


    
    // try {
    //     const response = await fetch(`http://localhost:3000/api/v1/user?nom=${nom}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
                
    //         }
    //     });
    //     const userData = await response.json();
    //     return userData.nom;
    // } catch (error) {
    //     console.error('Erreur lors de la récupération de l\'nom de l\'utilisateur:', error);
    //     return null;
    // }
}



export {registerUser, addSuspectAction, getUserNom,search}
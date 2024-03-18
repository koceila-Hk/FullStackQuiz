// ========= post =========

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
    }
}

// ======== requête GET ========

async function clicDroit(nom) {
    try {
      const response = await fetch("http://localhost:3000/nom?nom=" + encodeURIComponent(nom));
  
      if (!response.ok) {
        throw new Error('Erreur HTTP, status ' + response.status);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Erreur lors de la requête GET :', error);
    }
  }


// ========= function ctrl =========
  
  async function ctrlData(nom) {
    try {
      const response = await fetch("http://localhost:3000/ctrl?nom=" + encodeURIComponent(nom));
  
      if (!response.ok) {
        throw new Error('Erreur HTTP, status ' + response.status);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Erreur lors de la requête GET :', error);
    }
  }

// ======== function leavePage ==========

async function leavePage(nom) {
    try {
        const response = await fetch("http://localhost:3000/leave?nom=" + encodeURIComponent(nom));

        if (!response.ok) {
            throw new Error('Erreur HTTP, status ' + response.status);
          }
      
          const responseData = await response.json();
          return responseData;
        } catch (error) {
            console.error('Erreur lors de la requête GET :', error);
        }
    }


// ======== function answersUser ===========

async function answersUser(nom, list) {
    try {
        const response = await fetch ("http://localhost:3000/response?nom=" +encodeURIComponent(nom) + '&reponse='+encodeURIComponent(list[0]) + '&reponse2='+encodeURIComponent(list[1]));

        if(!response.ok) {
            throw new Error ('Error HTTP, status ' + response.status);
        }
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Erreur lors de la requête GET :', error);
    }
}


// ========== function resizePage ============

async function resizePage (nom) {
  try {
    const response = await fetch("http://localhost:3000/resize?nom=" +encodeURIComponent(nom));

    if(!response.ok) {
      throw new Error ("Error HTTP, status ", + response.status);
    }
    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error('error lors de la requête get :', error);
  }
}

// ======== function back actualize =========

async function backActualizeNav(nom) {
  try {
    const response = await fetch("http://localhost:3000/backRefresh?nom=" +encodeURIComponent(nom));

    if(!response.ok) {
      throw new Error ("Error HTTP, status ", + response.status);
    }
    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error('error lors de la requête get :', error);
  }
}

export {registerUser, clicDroit, ctrlData, leavePage, answersUser, resizePage, backActualizeNav }

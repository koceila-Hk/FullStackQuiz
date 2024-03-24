import express from 'express'
import cors from 'cors'
import { getUser, addUser, getName, addClicDroit, addCtrl, addAnswers, addLeavePage, addResizePage, addBackRefreshPage} from './model/supabase.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


import path from 'path';

app.get('/', (req, res) => {
  const __dirname = path.resolve('.');
  res.sendFile(path.join('/Front'));
});


// app.get('/api/v1', async (req, res) => {
//   const {data, error} = await getUsers()
//   res.json(data)
// })

// app.get('/api/v1/user', async (req, res) => {
//  const id = req.query.id
//  const {data, error} = await getUser(id)
//  res.json(data)
// })

// ======== add user ==========

    app.post('/api/v1/user', async (req, res) => {
     try {
       const { data, error } = await addUser(req.body);
       res.json(data);
  }  catch (error) {
      res.status(500).json({ error: `Erreur lors de l'ajout d'utilisateur` });
  }
});

// ========= add click ==========

app.get('/clic', async (req, res) => {

  try {
    const name = req.query.nom;
    const {data: users, error: nameError} = await getName(name) 

    const userId = users[0].id;
    const {data, error} = await addClicDroit(userId)

    res.status(200).json('clic droit ok.');
}   catch (error) {
    console.error('Error clic droit:', error);
    res.status(500).json('error clic droit action.' );
}
});

// ========= add ctrl ==========

app.get('/ctrl', async (req, res) => {
  try {
    const name = req.query.nom;
    let { data: users, error:errorName } = await getName(name)

    const userId = users[0].id;
    const { data, error } = await addCtrl(userId)

    res.status(200).json('ctrl ok.');
} catch (error) {
    console.error('Error ctrl', error);
    res.status(500).json('Error ctrl');
}
});


// ======== add answers =======

app.get('/response', async function(req,res) {
  try {
    const name     = req.query.nom;
    const reponse  = req.query.reponse;
    const rep      = req.query.reponse2;
    let { data: users, error: errorName} = await getName(name)

    const userId = users[0].id;
    let { data, error } = await addAnswers(userId, reponse, rep)

    res.status(200).json('answers ok.');
  } catch (error) {
    console.error('Error answers', error);
    res.status(500).json('Error answers');
  }
});


// ======= leave page ======= 

app.get('/leave', async (req, res) => {
  try {
    const name = req.query.nom;
    let { data: users, error:errorName } = await getName(name)

    const userId = users[0].id;
    const { data, error } = await addLeavePage(userId)

    res.status(200).json('Leave page ok');
} catch (error) {
    console.error('Error leave page', error);
    res.status(500).json('Error leave page');
}
});

// ======== resize page ===========

app.get('/resize', async (req, res) => {
  try {
    const name = req.query.nom;
    let { data: users, error:errorName } = await getName(name)

    const userId = users[0].id;
    const { data, error } = await addResizePage(userId)

    res.status(200).json('resize page ok.');
} catch (error) {
    console.error('Error resize page', error);
    res.status(500).json('Error resize page');
}
});


// ========= back refresh page ============

app.get('/backRefresh', async (req, res) => {
  try {
    const name = req.query.nom;
    let { data: users, error:errorName } = await getName(name)

    const nom = users[0].id
  
    const userId = users[0].id;
    const { data, error } = await addBackRefreshPage(userId)

    res.status(200).json('back refresh page');
} catch (error) {
    console.error('Error back refresh page', error);
    res.status(500).json('Error back refresh page');
}
});



app.listen(port, () => {
  console.log(`Hello I'm here ${port}`)
});


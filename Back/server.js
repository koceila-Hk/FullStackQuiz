import express from 'express'
import cors from 'cors'
import { getUser, addUser} from './model/supabase.js'

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://davlziybvxeqtfiyiegw.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhdmx6aXlidnhlcXRmaXlpZWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1OTI4MjksImV4cCI6MjAyNTE2ODgyOX0.rFK393Oy5v3kmgmF0bh0KoE7D4pKjMcoVpQEVlv6JuY";
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => {
  res.sendFile(__dirname + '../Front/register.html');
});

// app.get('/api/v1', async (req, res) => {
//   const {data, error} = await getUsers()
//   res.json(data)
// })

app.get('/api/v1/user', async (req, res) => {
 const id = req.query.id
 const {data, error} = await getUser(id)
 res.json(data)
})

// ======== add user ======== 

    app.post('/api/v1/user', async (req, res) => {
     try {
       const { data, error } = await addUser(req.body);
       if (error) {
          throw new Error(error);
      }
         res.json(data);
  }  catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error.message);
      res.status(500).json({ error: 'Une erreur est survenue lors du traitement de votre demande.' });
  }
});

// ========= get click ==========

app.get('/nom', async (req, res) => {

  try {
    const noms = req.query.nom;
    
  let { data: users, error:errorName } = await supabase
    .from('users')
    .select("id")
    .eq('nom', noms)

    const nom = users[0].id
  
  const { data, error } = await supabase
    .from('suspect')
    .insert([
     { user_id: nom, action: 'click_droit' },
])

  if (error) {
        throw new Error(error);
    } 
    res.status(200).json({ message: 'clic droit ok.' });
}   catch (error) {
    console.error('Error clic droit:', error);
    res.status(500).json({ error: 'error clic droit action.' });
}
});

// ========= get ctrl ==========

app.get('/ctrl', async (req, res) => {
  try {

      const name = req.query.nom;
    
      let { data: users, error:errorName } = await supabase
      .from('users')
      .select("id")
      .eq('nom', name)

    const idNom = users[0].id
  
    const { data, error } = await supabase
      .from('suspect')
      .insert([
       { user_id: idNom, action: 'ctrl-' },
])

    if (error) {
        throw new Error(error);
    } 
    res.status(200).json({ message: 'ctrl ok.' });
} catch (error) {
    console.error('Error ctrl', error);
    res.status(500).json({ error: 'Error ctrl' });
}
});


// ======== get answers =======

app.get('/response', async function(req,res){
  const nom     = req.query.nom
  const reponse = req.query.reponse
  const rep     = req.query.reponse2

  let { data: users, error:usersError } = await supabase
  .from('users')
  .select("id")
  .eq('nom', nom)

  const id_user = users[0].id

  const { data, error } = await supabase
  .from('reponses')
  .insert([
  { user_id: id_user, question1: reponse, question2: rep},
])
});


// ======= leave page ======= 

app.get('/leave', async (req, res) => {
  try {

    const name = req.query.nom;
    
    let { data: users, error:errorName } = await supabase
    .from('users')
    .select("id")
    .eq('nom', name)

    const nom = users[0].id
  
    const { data, error } = await supabase
    .from('suspect')
    .insert([
    { user_id: nom, action: 'à quitté la page' },
])
    if (error) {
        throw new Error(error);
    } 
    res.status(200).json({ message: 'à quitté la page ok.' });
} catch (error) {
    console.error('Error quitte page', error);
    res.status(500).json({ error: 'Error quitte page' });
}
});

// ======== resize page ===========

app.get('/resize', async (req, res) => {
  try {
    const name = req.query.nom;
    
    let { data: users, error:errorName } = await supabase
    .from('users')
    .select("id")
    .eq('nom', name)

    const nom = users[0].id
  
   const { data, error } = await supabase
   .from('suspect')
   .insert([
   { user_id: nom, action: 'resize page' },
])
    if (error) {
        throw new Error(error);
    } 
    res.status(200).json({ message: 'resize page ok.' });
} catch (error) {
    console.error('Error resize page', error);
    res.status(500).json({ error: 'Error resize page' });
}
});

// ========= back refresh page ============

app.get('/backRefresh', async (req, res) => {
  try {
    const name = req.query.nom;
    
    let { data: users, error:errorName } = await supabase
    .from('users')
    .select("id")
    .eq('nom', name)

    const nom = users[0].id
  
   const { data, error } = await supabase
   .from('suspect')
   .insert([
   { user_id: nom, action: 'back refresh page' },
])
    if (error) {
        throw new Error(error);
    } 
    res.status(200).json({ message: 'back refresh page ok.' });
} catch (error) {
    console.error('Error back refresh page', error);
    res.status(500).json({ error: 'Error back refresh page' });
}
});




app.listen(port, () => {
  console.log(`Hello I'm here ${port}`)
});


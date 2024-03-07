import express from 'express'
import cors from 'cors'
import { getUsers, getUser, addUser, addSuspectUser, click } from './model/supabase.js'
const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.get('/api/v1', async (req, res) => {
//   const {data, error} = await getUsers()
//   res.json(data)
// })

app.get('/api/v1/user', async (req, res) => {
 const id = req.query.id
 const {data, error} = await getUser(id)
 res.json(data)
})


app.post('/api/v1/user', async (req, res) => {
  try {
      const { data, error } = await addUser(req.body);
      if (error) {
          throw new Error(error);
      }
      res.json(data);
  } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error.message);
      res.status(500).json({ error: 'Une erreur est survenue lors du traitement de votre demande.' });
  }
});




app.get('/', async (req, res) => {
  try {

    const { data, error } = await click(req.body);
    if (error) {
        throw new Error(error);
    } 
    res.status(200).json({ message: 'Right click action recorded successfully.' });
} catch (error) {
    console.error('Error recording right click action:', error);
    res.status(500).json({ error: 'An error occurred while recording right click action.' });
}
});





app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


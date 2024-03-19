// server/index.js
import express from 'express';
import bodyParser from 'body-parser';
import { datastore } from './datastore';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());

/** Endpoint to fetch all animals from the datastore */
app.get('/animals', async (req, res) => {
  const animalList = await datastore.getAllAnimals();
  res.json({ animals: animalList });
});

/** Endpoint to add a new animal to the datastore */
app.post('/animals', async (req, res) => {
  const receivedData = req.body;
  try {
    await datastore.createNewAnimal(receivedData);
    res.send({ message: 'Animal added successfully' });
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.message })
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

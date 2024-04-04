// server/index.js
import express from 'express';
import bodyParser from 'body-parser';
import { datastore } from './datastore';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
console.log("datastore", datastore)

/** Endpoint to fetch all animals from the datastore */
app.get('/animals', async (req, res) => {
  let page = req.query.page;
  let limit = req.query.limit;

  const animalList = await datastore.getAnimalsPage(page, limit);
  res.json({
    animals: animalList,
    pagination: {
      number: page,
      limit: limit
    }
  });
});

/** Endpoint to add a new animal to the datastore */
app.post('/animals', async (req, res) => {
  try {
    const createdAnimal = await datastore.createNewAnimal(req.body);
    res.send({animal: createdAnimal});
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.message })  // TODO - more appropriate status depending on what's wrong
  }
});

app.delete('/animals/:id', async (req, res) => {
  try {
    await datastore.deleteAnimalById(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.message }) // TODO - more appropriate status depending on what's wrong
  }
});

app.put('/animals/:id', async (req, res) => {
  try {
    console.log(req.body)
    await datastore.updateAnimal(req.body);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.message }) // TODO - more appropriate status depending on what's wrong
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

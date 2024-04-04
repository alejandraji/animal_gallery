import fs from 'fs';

/** We are using the datastore.json file to act as a local DB */
class Datastore {
  filename: string;

  constructor(filename: string) {

    // Filename where datas are going to store
    if (!filename) {
      throw new Error(
'Filename is required to create a datastore!')
    }

    this.filename = filename;

    try {
      fs.accessSync(this.filename);
    } catch (err) {

      // If file not exist
      // it is created with empty array
      fs.writeFileSync(this.filename, '[]');
    }
  }
  validateAnimal(animal){
    if (!animal.name){
      return "Missing name"
    }
    if (!animal.description){
      return "Missing description"
    }
    if (animal.name.length === 0){
      return "Empty name"
    }
    if (animal.description.length === 0){
      return "Empty description"
    }
    return null;
  }
  /** Add an animal to the datastore file */
  async createNewAnimal(animal) {
    const errorMessage = this.validateAnimal(animal);
    if (errorMessage) {
      throw new Error(errorMessage)
    }
    // Read filecontents of the datastore
    const animalsJson = await
      fs.promises.readFile(this.filename,{
      encoding : 'utf8'
    });
    // Parsing JSON records in JavaScript
    // object type records
    const animals = JSON.parse(animalsJson);
    const maxId = Math.max(...animals.map(animal => animal.id))

    const newAnimal = {
      ...animal,
      id: maxId + 1
    }

    // Writing all records back to the file
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify([...animals, newAnimal], null, 2)
    );

    return newAnimal;
  }

  async getAnimalsPage(page, limit) {
    const end = limit * page;
    const start = end - limit;
    const animals = await this.getAllAnimals();
    return animals.slice(start, end);
  }

  /** Fetches aninamls from datastore file */
  async getAllAnimals() {
    const jsonRecords = await
        fs.promises.readFile(this.filename,{
            encoding : 'utf8'
        });

    return JSON.parse(jsonRecords);
  }

    /** Delete animal by id from datastore file */
  async deleteAnimalById(id) {
    // Read filecontents of the datastore
    const animalsJson = await
      fs.promises.readFile(this.filename,{
      encoding : 'utf8'
    });
    // Parsing JSON records in JavaScript
    // object type records
    const animals = JSON.parse(animalsJson);

    // TODO - maybe add validation that ID already exists?

    // Writing all records back to the file
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(animals.filter(animal => animal.id != id), null, 2)
    );

    return null;
  }

  /** Update an animal to the datastore file */
  async updateAnimal(animal) {
    const errorMessage = this.validateAnimal(animal);
    if (errorMessage) {
      throw new Error(errorMessage)
    }
    // Read filecontents of the datastore
    const animalsJson = await
      fs.promises.readFile(this.filename,{
      encoding : 'utf8'
    });
    // Parsing JSON records in JavaScript
    // object type records
    const existingAnimals = JSON.parse(animalsJson);

    if (!existingAnimals.map(({id}) => id).includes(animal.id)) {
      throw new Error("Can't update non-existent animal")
    }

    const updatedAnimals = existingAnimals.map(existingAnimal => {
      return existingAnimal.id == animal.id ? animal : existingAnimal
    });

    // Writing all records back to the file
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(updatedAnimals, null, 2)
    );

    return animal;
  }
}

// The datastore that is serving as a local DB
export const datastore = new Datastore('datastore.json');

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
    animals.push(newAnimal);
    // Writing all records back to the file
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(animals, null, 2)
    );

    return newAnimal;
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

    if (!animals.some(animal => animal.id === id) === false){
      throw new Error("can't delete nonexistment id")
    }
    const animalsWithoutDeleteTarget = animals.filter(animal => animal.id != id);
    // Writing all records back to the file
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(animalsWithoutDeleteTarget, null, 2)
    );

    return null;
  }

}

// The datastore that is serving as a local DB
export const datastore = new Datastore('datastore.json');

import React, { useState, useEffect, FormEvent } from 'react';
import './App.scss';
import AnimalFormModal from './AnimalFormModal';
import { postAnimal, getAnimals, putAnimal } from './api'
import Animal from './Animal';
import AnimalCard from './AnimalCard';

const  App = () => {
  const [currentAnimal, setCurrentAnimal] = useState<Animal>({name:'', description:''})
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage,  setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const removeAnimal = (animal: Animal) => {
    setAnimals(animals.filter(({id}) => id !== animal.id));
  }

  const addAnimal = (animal: Animal) => {
    setAnimals([...animals, animal]);
  }

  const replaceAnimal = (animal: Animal) => {
    setAnimals(animals.map(a => a.id === animal.id ? animal : a));
  }

  useEffect(() => {
    getAnimals()
      .then(animals => setAnimals(animals))
  }, []);

  const renderAnimalCards = () => animals.length > 0 ? (
    <ul className="animal-list-container">
      {animals.map(animal =>
        <AnimalCard
          key={animal.id}
          animal={animal}
          removeAnimal={removeAnimal}
          setIsModalOpen={setIsModalOpen}
          setCurrentAnimal={setCurrentAnimal}
        />
      )}
    </ul>
  ) : (
    <p>No animals. Try adding one.</p>
  );

  return (
    <main className="App">
      <h1 className="title">Animal Gallery</h1>
      <section>
        <div className="messages-btn">
          {successMessage && <p className="success">{successMessage}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button onClick={() => setIsModalOpen(true)} className="create-btn">Add animal</button>
        </div>
        {renderAnimalCards()}
        <AnimalFormModal
          isOpen={isModalOpen}
          currentAnimal={currentAnimal}
          setCurrentAnimal={setCurrentAnimal}
          setIsModalOpen={setIsModalOpen}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          addAnimal={addAnimal}
          replaceAnimal={replaceAnimal}
        />
      </section>
    </main>
  );
};

export default App;

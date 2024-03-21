import React, { useState, useEffect, FormEvent } from 'react';
import './App.scss';
import AddAnimal from './AddAnimal';
import { postAnimal, getAnimals } from './api'
import Animal from './Animal';
import AnimalCards from './AnimalCards';

const emptyAnimal = {id:0, name:'', description:''}

const  App = () => {
  const [currentAnimal, setCurrentAnimal] = useState<Animal>(emptyAnimal)
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successfullyAdded,  setSuccessfullyAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getAnimals()
      .then(animals => setAnimals(animals))
  }, []);

  /** Open the add animal modal */
  const openModal = () => {
    setIsModalOpen(true);
  }

  /** Close the add animal modal */
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const addAnimal = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await postAnimal(currentAnimal);
      setSuccessfullyAdded(true);
      setIsModalOpen(false);
      setAnimals([...animals, currentAnimal])
      setCurrentAnimal(emptyAnimal)
    } catch (e: any) {
      setErrorMessage(e.message)
    }
  
  }

  const renderAnimalCard = () => {
   return (
    <>
      {animals.length > 0 ?
      <AnimalCards 
        animals={animals} 
        setAnimals={setAnimals}
      />
      :
      <p>No animals. Try adding one.</p>
      }
    </>
   )
  }

  return (
    <main className="App">
      <h1 className="title">Animal Gallery</h1>
      <section>
        <div className="messages-btn">
          {successfullyAdded && <p className="success">Item successfully added.</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button onClick={openModal} className="create-btn">Add animal</button>
        </div>
        {renderAnimalCard()}
        <AddAnimal
          currentAnimal={currentAnimal}
          setCurrentAnimal={setCurrentAnimal}
          isOpen={isModalOpen} 
          addAnimal={addAnimal} 
          closeModal={closeModal}
        />
      </section>
    </main>
  );
};

export default App;

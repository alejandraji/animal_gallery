import React, { useState, useEffect, FormEvent } from 'react';
import './App.scss';
import AnimalFormModal from './AnimalFormModal';
import { postAnimal, getAnimals, putAnimal } from './api'
import Animal from './Animal';
import AnimalCard from './AnimalCard';

const emptyAnimal = {name:'', description:''}

const  App = () => {
  const [currentAnimal, setCurrentAnimal] = useState<Animal>(emptyAnimal)
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

  /** Open the add animal modal */
  const openModal = () => {
    setIsModalOpen(true);
  }

  /** Close the add animal modal */
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const saveAnimal = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (currentAnimal.id === undefined) {
        await postAnimal(currentAnimal);
        setSuccessMessage("Item successfully added.");
        addAnimal(currentAnimal);
      } else {
        await putAnimal(currentAnimal);
        setSuccessMessage("Item successfully updated.");
        replaceAnimal(currentAnimal)
      }

      setIsModalOpen(false);
      setCurrentAnimal(emptyAnimal)
    } catch (e: any) {
      setErrorMessage(e.message)
    }
  }


  const renderAnimalCards = () => {
   return (
    <>
      {animals.length > 0 ?
        (<ul className="animal-list-container">
          {animals.map(animal =>
            <AnimalCard
              key={animal.id}
              animal={animal}
              removeAnimal={removeAnimal}
              setIsModalOpen={setIsModalOpen}
              setCurrentAnimal={setCurrentAnimal}
            />
          )}
        </ul>)
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
          {successMessage && <p className="success">{successMessage}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button onClick={openModal} className="create-btn">Add animal</button>
        </div>
        {renderAnimalCards()}
        <AnimalFormModal
          currentAnimal={currentAnimal}
          setCurrentAnimal={setCurrentAnimal}
          isOpen={isModalOpen}
          saveAnimal={saveAnimal}
          closeModal={closeModal}
        />
      </section>
    </main>
  );
};

export default App;

import React, { useState, useEffect, FormEvent } from 'react';
import './App.scss';
import AddAnimal from './AddAnimal';

interface Animal {
  name: string,
  description: string
}

const  App = () => {
  const [currentAnimal, setCurrentAnimal] = useState<Animal>({name:'', description:''})
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successfullyAdded,  setSuccessfullyAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
console.log(currentAnimal);
  useEffect(() => {
    /** Fetch animals to show on the page */
    async function fetchAnimals() {
      try {
        let data = await fetch('/animals'); 
        data = await data.json();
        setAnimals((data as any).animals);
      } catch (e) {

      }
    }
    
    fetchAnimals();
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

    /** Call API to create new animal */
    const response = await fetch('/animals', {
      method: 'POST',
      body: JSON.stringify(currentAnimal),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.ok){
      setSuccessfullyAdded(true);
      setIsModalOpen(false);
      setAnimals([...animals, currentAnimal])
      setCurrentAnimal({name:'', description:''})
    } else {
      const data = await response.json()
      setErrorMessage(data.message)
    }
  }

  return (
    <main className="App">
      <h1 className="title">Animals</h1>
        {successfullyAdded && <p className="success">Item successfully added.</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
        <section>
          <button onClick={openModal} className="primary-btn">Add animal</button>
          {animals.length > 0 ?
            <ul className="animal-list">
              {animals.map((animal: Animal, idx) => { 
                return (
                  <li className="animal-tile" key={idx}>
                    <h2 className="animal-title">{animal.name}</h2>
                    <p>{animal.description}</p>
                  </li>
                )
              })}
            </ul>
          :
            <p>No animals. Try adding one.</p>
          }
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

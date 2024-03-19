import React, { useState, useEffect, FormEvent } from 'react';
import './App.scss';
import AddAnimal from './AddAnimal';

interface Animals {
  name: string,
  description: string
}

const  App = () => {
  const [animals, setAnimals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successfullyAdded,  setSuccessfullyAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)

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

    /** Find form inputs and grab their values */
    const formEls: { [key: string]: string } = {};
    const inputs = (event.target as HTMLElement).querySelectorAll('input');
    inputs.forEach((input: { name: string, value: string }) => {
      formEls[input.name] = input.value;
    });

    /** Call API to create new animal */
    const response = await fetch('/animals', {
      method: 'POST',
      body: JSON.stringify(formEls),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.ok){
      setSuccessfullyAdded(true);
      setIsModalOpen(false);
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
              {animals.map((animal: Animals, idx) => { 
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
          <AddAnimal isOpen={isModalOpen} addAnimal={addAnimal} closeModal={closeModal} />
        </section>
    </main>
  );
};

export default App;

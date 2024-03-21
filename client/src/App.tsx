import React, { useState } from 'react';
import './App.scss';
import AnimalFormModal from './AnimalFormModal';
import Animal from './Animal';
import AnimalCard from './AnimalCard';
import useAnimals from './useAnimals';

const  App = () => {
  const [currentAnimal, setCurrentAnimal] = useState<Animal>({name:'', description:''})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage,  setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    animals,
    removeAnimal,
    addAnimal,
    isLoading,
    replaceAnimal
  } = useAnimals();

  const renderAnimalCards = () => animals.length > 0 ? (
    <ul className="animal-list-container">
      {animals.map(animal =>
        <AnimalCard
          key={animal.id}
          animal={animal}
          removeAnimal={removeAnimal}
          setIsModalOpen={setIsModalOpen}
          setCurrentAnimal={setCurrentAnimal}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
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
        {!isLoading ? renderAnimalCards() :<p>Loading...</p>}
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

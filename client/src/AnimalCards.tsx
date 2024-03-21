import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Animal from './Animal';
import './AnimalCards.scss';
import { deleteAnimalById } from './api';

const AnimalCards = ({ animals, setAnimals } : { animals: Animal[], setAnimals: Dispatch<SetStateAction<Animal[]>> } ) => {
  // const [animalList, setAnimalList] = useState<Animal[]>(animals);
  // console.log("animalList", animalList)
  console.log("animals props", animals)

  // useEffect(() => {
  //   console.log("Current animals prop:", animals);
  //   setAnimalList(animals);
  // }, [animals]);

  const deleteHandler = async (deleteId: number) =>{
    try {
      const response = await deleteAnimalById(deleteId);
      setAnimals(animals.filter(animal => animal.id !== deleteId)); 
      console.log('Animal deleted successfully');
    } catch (error) {
      console.error('Error on deleting animal', error);
    }
  }

  const animalCardList = animals.map((animal: Animal) => ( 
    <li className="animal-tile" key={animal.id}>
        <a  href="" className="edit-btn" aria-label="delete">Edit</a>
      <button className="secondary-btn" onClick={() => deleteHandler(animal.id)} aria-label="delete">X</button>
      <h2 className="animal-title">{animal.name}</h2>
      <p>{animal.description}</p>
    </li>
  ));

  return (
    <ul className="animal-list-container">
      {animalCardList}
    </ul>
  )
}

export default AnimalCards;

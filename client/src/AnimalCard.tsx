import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Animal from './Animal';
import './AnimalCard.scss';
import { deleteAnimalById } from './api';

const AnimalCard = ({ animal, removeAnimal } : { animal: Animal, removeAnimal: (animal: Animal) => void } ) => {
  const deleteHandler = async () =>{
    try {
      const response = await deleteAnimalById(animal.id);
      removeAnimal(animal);
      console.log('Animal deleted successfully');
    } catch (error) {
      console.error('Error on deleting animal', error);
    }
  }

  return <li className="animal-tile" key={animal.id}>
    <a  href="" className="edit-btn" aria-label="delete">Edit</a>
    <button className="secondary-btn" onClick={() => deleteHandler()} aria-label="delete">X</button>
    <h2 className="animal-title">{animal.name}</h2>
    <p>{animal.description}</p>
  </li>
}

export default AnimalCard;

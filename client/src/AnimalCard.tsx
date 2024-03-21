import React, { Dispatch, SetStateAction, MouseEvent } from 'react';
import Animal from './Animal';
import './AnimalCard.scss';
import { deleteAnimalById } from './api';

const AnimalCard = ({ animal, removeAnimal, setCurrentAnimal, setIsModalOpen, setSuccessMessage, setErrorMessage } : { animal: Animal, removeAnimal: (animal: Animal) => void , setCurrentAnimal: Dispatch<SetStateAction<Animal>>, setIsModalOpen: Dispatch<SetStateAction<boolean>>, setSuccessMessage: any, setErrorMessage: any}) => {
  const deleteHandler = async () =>{
    try {
      if (animal.id !== undefined) {
        const response = await deleteAnimalById(animal.id);
        removeAnimal(animal);
        setErrorMessage('Animal deleted successfully');
      }
    } catch (error) {
      setErrorMessage('Error on deleting animal');
    }
  }

  const editHandler = (event: MouseEvent) => {
    event.preventDefault();
    setCurrentAnimal(animal);
    setIsModalOpen(true);
  }

  return <li className="animal-tile" key={animal.id}>
    <a onClick={(event) => editHandler(event)} href="" className="edit-btn" aria-label="delete">Edit</a>
    <button className="secondary-btn" onClick={() => deleteHandler()} aria-label="delete">X</button>
    <h2 className="animal-title">{animal.name}</h2>
    <p>{animal.description}</p>
  </li>
}

export default AnimalCard;

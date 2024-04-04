import React, { useState, useEffect } from 'react';
import './App.scss';
import { getAnimals } from './api'
import Animal from './Animal';

const limit = 5;

const useAnimals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const incrementPage = () => setCurrentPage(currentPage + 1);
  const decrementPage = () => setCurrentPage(currentPage - 1);


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
    getAnimals(currentPage,limit)
      .then(animals => {
        setAnimals(animals);
        setIsLoading(false);
      });
  }, [currentPage]);

  return {
    animals,
    isLoading,
    removeAnimal,
    addAnimal,
    replaceAnimal,
    incrementPage,
    decrementPage
  }
};

export default useAnimals;

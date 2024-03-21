import React, { useState, useEffect } from 'react';
import './App.scss';
import { getAnimals } from './api'
import Animal from './Animal';

const useAnimals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animals, setAnimals] = useState<Animal[]>([]);

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
      .then(animals => {
        setAnimals(animals);
        setIsLoading(false);
      });
  }, []);

  return {
    animals,
    isLoading,
    removeAnimal,
    addAnimal,
    replaceAnimal
  }
};

export default useAnimals;

import Animal from "./Animal";

export const postAnimal = async (animal: Animal) : Promise<Animal> =>{
  const response = await fetch('/animals', {
    method: 'POST',
    body: JSON.stringify({name: animal.name, description: animal.description}),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await response.json();
  if (response.ok){
   return data;
  } else {
    throw new Error(data.message);
  }
}

export const getAnimals = async () : Promise<Animal[]> => {
  const response = await fetch('/animals');
  const data = await response.json();
  return (data as any).animals
}

export const deleteAnimalById =  async (id: number) : Promise<void> => {
  const response = await fetch(`/animals/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return;
  } else {
    const e = await response.json();
    throw new Error(e.message);
  }
}

export const putAnimal =  async (animal: Animal) : Promise<Animal> => {
  console.log(animal);
  const response = await fetch(`/animals/${animal.id}`, {
    method: 'PUT',
    body: JSON.stringify(animal),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (response.ok) {
    return animal;
  } else {
    const e = await response.json();
    throw new Error(e.message);
  }
}



// export const postAnimalById =  async (id: number) : Promise<void> => {
//   const response = await fetch(`/animals/${id}`, {
//     method: 'PUT',
//   });
//   if (!response.ok) {
//     const data = await response.json();
//     throw new Error(data.message);
//   }
// }


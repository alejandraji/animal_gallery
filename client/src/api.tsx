import Animal from "./Animal";
//GET
//DELETE
// MAYBE PUT
export const postAnimal = async (animal: Animal) : Promise<Animal> =>{
  const response = await fetch('/animals', {
    method: 'POST',
    body: JSON.stringify(animal),
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

   
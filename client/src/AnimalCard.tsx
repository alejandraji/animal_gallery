import Animal from './Animal';
import './AnimalCard.scss';

const AnimalCard = ({ name, description, animals } : { name: string, description: string, animals: Animal[] } ) => {
  const animalList = animals.map((animal: Animal) => ( 
      <li className="animal-tile" key={animal.id}>
        <h2 className="animal-title">{animal.name}</h2>
        <p>{animal.description}</p>
        <button className="secondary-btn">Delete</button>
      </li>
  ));

  return (
    <ul className="animal-list-container">
      {animalList}
    </ul>
  )
}

export default AnimalCard;

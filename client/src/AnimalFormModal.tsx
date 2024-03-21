import React, { FormEvent, FormEventHandler, MouseEventHandler } from 'react';
import Modal from 'react-modal';
import { postAnimal, putAnimal } from './api';
import './AnimalFormModal.scss';

const AnimalFormModal = ({ isOpen, currentAnimal, setCurrentAnimal, setIsModalOpen, setSuccessMessage, setErrorMessage, addAnimal, replaceAnimal }: { isOpen: boolean, currentAnimal: any, setCurrentAnimal: any, setIsModalOpen: any, setSuccessMessage: any, setErrorMessage: any, addAnimal: any, replaceAnimal: any }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const onChange = (e: { target: { value: any; }; }, name: any) =>{
    setCurrentAnimal({
      ...currentAnimal,
      [name]: e.target.value
    })
  }


  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (currentAnimal.id === undefined) {
        await postAnimal(currentAnimal);
        setSuccessMessage("Item successfully added.");
        addAnimal(currentAnimal);
      } else {
        await putAnimal(currentAnimal);
        setSuccessMessage("Item successfully updated.");
        replaceAnimal(currentAnimal)
      }
      setTimeout(() => setSuccessMessage(null), 3000);

      setIsModalOpen(false);
      setCurrentAnimal({name:'', description:''})
    } catch (e: any) {
      setErrorMessage(e.message)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Add animal"
      style={customStyles}
    >
      <h2>Add animal</h2>
      <form className="form-container" onSubmit={onSubmit} method="post">
        <div className="add-animal-form-input">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={event => onChange(event,"name")}
            value={currentAnimal.name}
            required
            placeholder="ex: Zebra"
          />
        </div>
        <div className="add-animal-form-row">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={event => onChange(event,"description")}
            required
            value={currentAnimal.description}
            placeholder="ex: Animal with stripes"
          />
        </div>
        <div className="form-btns">
          <button type="submit" className="add-btn">Save</button>
          <button type="button" onClick={() => setIsModalOpen(false)} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </Modal>
  )
}

export default AnimalFormModal;
import React, { FormEventHandler, MouseEventHandler } from 'react';
import Modal from 'react-modal';
import './AddAnimal.scss';

const AddAnimal = ({ isOpen, closeModal, saveAnimal, currentAnimal, setCurrentAnimal }: { isOpen: boolean, closeModal: MouseEventHandler, saveAnimal: FormEventHandler, currentAnimal: any, setCurrentAnimal: any }) => {
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

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Add animal"
      style={customStyles}
    >
      <h2>Add animal</h2>
      <form className="form-container" onSubmit={saveAnimal} method="post">
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
          <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </Modal>
  )
}

export default AddAnimal;
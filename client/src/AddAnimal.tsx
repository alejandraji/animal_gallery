import React, { FormEventHandler, MouseEventHandler } from 'react';
import Modal from 'react-modal';

import './AddAnimal.scss';

const AddAnimal = ({ isOpen, closeModal, addAnimal }: { isOpen: boolean, closeModal: MouseEventHandler, addAnimal: FormEventHandler }) => {
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

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Add animal"
      style={customStyles}
    >
      <h2>Add animal</h2>
      <form onSubmit={addAnimal} method="post">
        <div className="add-animal-form-input">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" placeholder="ex: Zebra" />
        </div>
        <div className="add-animal-form-row">
          <label htmlFor="description">Description:</label>
          <input type="text" name="description" id="description" placeholder="ex: Animal with stripes" />
        </div>
        <div>
          <button type="submit" className="primary-btn">Add</button>
          <button type="button" onClick={closeModal} className="add-animal-cancel">Cancel</button>
        </div>
      </form>
    </Modal>
  )
}

export default AddAnimal;
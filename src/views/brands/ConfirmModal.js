import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ConfirmModal = ({ openModal, handleModal, handleSubmit, brand, loading }) => {
  return (
    <>
      <Modal isOpen={openModal} size='md' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Delete brand
        </ModalHeader>
        <ModalBody>
          <h1>Are you sure?</h1>
          <div>
            You are about delete {brand}, all data linked with this brand will be deleted
            permanently.
          </div>
        </ModalBody>
        <ModalFooter>
          <Button disabled={loading} color='primary' onClick={handleSubmit}>
            Yes
          </Button>
          <Button onClick={handleModal}>No</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ConfirmModal;

import Modal from 'react-modal';

import './DeleteModal.scss';

const DeleteModal = ({ modalOpen, changeFn, delFn }) => {
  const closeModal = () => {
    changeFn(false);
  };

  const handleDelete = () => {
    delFn();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      contentLabel="Confirm Delete Todo"
      className="del-todos__modal"
      style={styles.modalStyles}
    >
      <div className="del-todos__card">
        <p className="del-todos__modal-title">
          Are you sure you want to delete?
        </p>
        <div className="del-todos__card-cta">
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

const styles = {
  modalStyles: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      outline: 'none',
    },
    content: {
      minWidth: '40%',
      border: 'none',
      outline: 'none',
      color: '#fff',
    },
  },
};

export default DeleteModal;

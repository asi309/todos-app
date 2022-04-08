import Modal from 'react-modal';

import AddTodo from '../Todos/AddTodo';

const AddTodoModal = ({ modalOpen, changeFn, list }) => {
  const closeModal = () => {
    changeFn(false);
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      contentLabel="Add Todos"
      className="add-todos__modal"
      style={styles.modalStyles}
    >
      <h3 className="add-todos__modal-title" style={styles.contentStyles.title}>
        Add Todo
      </h3>
      <AddTodo list={list} closeFn={closeModal} />
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
  contentStyles: {
    title: {
      fontSize: 24,
      lineHeight: '30px',
      fontWeight: 400,
      marginBottom: '16px',
      textAlign: 'center',
    },
  },
};

export default AddTodoModal;

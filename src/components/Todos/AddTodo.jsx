import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { BsCalendar4Event } from 'react-icons/bs';

import { todosMutations, todosQuery } from '../../constants';
import dateUtils from '../../utils/date';
import './AddTodo.scss';

const AddTodo = ({ list, closeFn }) => {
  const initialState = {
    title: '',
    due_date: '',
  };
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (list === 'planned') {
      const date = dateUtils.getFullDate();
      setFormInput((state) => ({ ...state, due_date: date }));
    }
  }, []);

  const resetForm = () => {
    setFormInput(initialState);
  };

  const updateCache = (cache, { data }) => {
    const existingTodos = cache.readQuery({
      query: todosQuery.getTodos,
    });

    const newTodo = data.insert_todos.returning[0];
    cache.writeQuery({
      query: todosQuery.getTodos,
      data: { todos: [newTodo, ...existingTodos?.todos] },
    });
  };

  const [addTodo] = useMutation(todosMutations.addTodo, {
    update: updateCache,
    onCompleted: resetForm,
  });

  const [addImportaantTodo] = useMutation(todosMutations.addImpTodo, {
    update: updateCache,
    onCompleted: resetForm,
  });

  const [addTodayTodo] = useMutation(todosMutations.addTodayTodo, {
    update: updateCache,
    onCompleted: resetForm,
  });

  const [addPlannedTodo] = useMutation(todosMutations.addTodayTodo, {
    update: updateCache,
    onCompleted: resetForm,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormInput({ ...formInput, [name]: value });
  };

  const submitHandler = (e) => {
    const variablesObj = {
      ...formInput,
      due_date: formInput.due_date === '' ? null : formInput.due_date,
    };

    const today = dateUtils.getFullDate();

    if (!list) {
      addTodo({
        variables: variablesObj,
      });
    } else if (list === 'important') {
      addImportaantTodo({
        variables: variablesObj,
      });
    } else if (list === 'today') {
      addTodayTodo({
        variables: { ...variablesObj, today },
      });
    } else if (list === 'planned') {
      addPlannedTodo({
        variables: variablesObj,
      });
    }

    closeFn();
  };

  const checkDisabled = () => {
    // Normal Todo
    if (!list) {
      return !formInput.title;
    }

    // Planned Todo
    if (list === 'planned') {
      return !(formInput.title && formInput.due_date);
    }
  };

  return (
    <div className="add-todo__container">
      <form>
        <fieldset>
          <div className="add-todo__input-title">
            <input
              type="text"
              name="title"
              value={formInput.title}
              placeholder="Add a task"
              onChange={changeHandler}
            />
          </div>
          <div className="add-todo__input-date">
            <div className="input-date__icon">
              <BsCalendar4Event fontSize={16} color="#3d3d4e" />
            </div>
            <input
              type="date"
              name="due_date"
              value={formInput.due_date}
              placeholder={
                formInput.due_date
                  ? formInput.due_date
                  : 'Due Date (yyyy-mm-dd)'
              }
              onChange={changeHandler}
              style={!formInput.due_date ? { color: '#777' } : {}}
            />
          </div>
          {list !== 'planned' && (
            <button
              type="button"
              className={`clear${formInput.due_date ? ' enabled' : ''}`}
              disabled={!formInput.due_date}
              onClick={() =>
                setFormInput((state) => ({ ...state, due_date: '' }))
              }
            >
              Clear Due Date
            </button>
          )}
        </fieldset>
        <button
          type="button"
          className="add-btn"
          disabled={checkDisabled()}
          onClick={submitHandler}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodo;

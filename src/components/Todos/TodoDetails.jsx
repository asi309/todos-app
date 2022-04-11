import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { BiSun } from 'react-icons/bi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsCalendar4Event } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { todosMutations, todosQuery } from '../../constants';
import { ContentWrapper } from '../../containers';
import dateUtils from '../../utils/date';
import './TodoDetails.scss';
import DeleteModal from '../Modal/DeleteModal';

const TodoDetails = () => {
  const [formInput, setFormInput] = useState({
    title: '',
    due_date: '',
  });

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  let todo;
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const query = todosQuery.getTodoById;

  const { loading, error, data } = useQuery(query, {
    variables: { id },
  });

  useEffect(() => {
    if (data?.todos.length) {
      const todo = data?.todos[0];
      setFormInput({
        title: todo.title,
        due_date: todo.due_date || '',
      });
    }
  }, [data]);

  // Update functions
  const updateCacheOnToggleComplete = (cache) => {
    const existingTodos = cache.readQuery({
      query: todosQuery.getTodoById,
      variables: { id },
    });
    const updatedTodos = existingTodos?.todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, is_complete: !t.is_complete };
      } else {
        return t;
      }
    });

    cache.writeQuery({
      query: todosQuery.getTodoById,
      variables: { id },
      data: { todos: updatedTodos },
    });
  };

  const updateCacheOnClearTodo = (cache) => {
    const existingTodos = cache.readQuery({
      query: todosQuery.getTodoById,
      variables: { id },
    });
    const filteredTodos = existingTodos?.todos.filter((t) => t.id !== todo.id);

    cache.writeQuery({
      query: todosQuery.getTodoById,
      variables: { id },
      data: { todos: filteredTodos },
    });
  };

  const updateCacheOnClearCompleted = (cache) => {
    const existingTodos = cache.readQuery({
      query: todosQuery.getTodoById,
      variables: { id },
    });
    const filteredTodos = existingTodos?.todos.filter((t) => !t.is_complete);

    cache.writeQuery({
      query: todosQuery.getTodoById,
      variables: { id },
      data: { todos: filteredTodos },
    });
  };

  const updateCacheOnToggleImportant = (cache) => {
    const existingTodos = cache.readQuery({
      query: todosQuery.getTodoById,
      variables: { id },
    });
    const updatedTodos = existingTodos?.todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, is_important: !t.is_important };
      } else {
        return t;
      }
    });

    cache.writeQuery({
      query: todosQuery.getTodoById,
      variables: { id },
      data: { todos: updatedTodos },
    });
  };

  const updateCacheOnToggleToday = (cache) => {
    const existingTodos = cache.readQuery({
      query: todosQuery.getTodoById,
      variables: { id },
    });
    const updatedTodos = existingTodos?.todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, today: t.today ? null : dateUtils.getFullDate() };
      } else {
        return t;
      }
    });

    cache.writeQuery({
      query: todosQuery.getTodoById,
      variables: { id },
      data: { todos: updatedTodos },
    });
  };

  const updateCache = (cache, { data }) => {
    const existingTodos = cache.readQuery({
      query: todosQuery.getTodoById,
      variables: { id },
    });

    const updates = data.update_todos.returning[0];

    const updatedTodos = existingTodos?.todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updates?.title, due_date: updates?.due_date };
      } else {
        return t;
      }
    });

    cache.writeQuery({
      query: todosQuery.getTodoById,
      variables: { id },
      data: { todos: updatedTodos },
    });
  };
  /* -------------------------END------------------------------------------- */

  // Apollo mutations
  const [toggleCompleteMutation] = useMutation(todosMutations.toggleComplete, {
    update: updateCacheOnToggleComplete,
    optimisticResponse: true,
  });

  const [clearTodoMutation] = useMutation(todosMutations.clearTodo, {
    update: updateCacheOnClearTodo,
    optimisticResponse: true,
  });

  const [clearCompletedTodos] = useMutation(todosMutations.clearCompleted, {
    update: updateCacheOnClearCompleted,
    optimisticResponse: true,
  });

  const [toggleImportantMutation] = useMutation(
    todosMutations.toggleImportant,
    {
      update: updateCacheOnToggleImportant,
      optimisticResponse: true,
    }
  );

  const [toggleTodayMutation] = useMutation(todosMutations.toggleToday, {
    update: updateCacheOnToggleToday,
    optimisticResponse: true,
  });

  const [updateTodoMMutation] = useMutation(todosMutations.updateTodo, {
    update: updateCache,
    // optimisticResponse: true,
  });
  /* -------------------------END------------------------------------------- */

  // Handler functions
  const toggleCompleteHandler = () => {
    toggleCompleteMutation({
      variables: { id: todo.id, isComplete: !todo.is_complete },
    });
  };

  const clearTodoHandler = () => {
    clearTodoMutation({
      variables: { id: todo.id },
      refetchQueries: ['getTodos'],
      awaitRefetchQueries: true,
    });
    navigate(state.prev, { replace: true });
  };

  const clearCompletedHandler = () => {
    clearCompletedTodos();
  };

  const toggleImportantHandler = () => {
    toggleImportantMutation({
      variables: { id: todo.id, isImportant: !todo.is_important },
    });
  };

  const toggleTodayHandler = () => {
    toggleTodayMutation({
      variables: {
        id: todo.id,
        today: todo.today ? null : dateUtils.getFullDate(),
      },
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormInput({ ...formInput, [name]: value });
  };

  const submitHandler = (e) => {
    const variablesObj = {
      ...formInput,
      due_date: formInput.due_date === '' ? null : formInput.due_date,
      id,
    };

    updateTodoMMutation({
      variables: variablesObj,
      refetchQueries: ['getTodoById'],
      awaitRefetchQueries: true
    });
  };

  const equalityChecker = () => {
    return (
      todo.title === formInput.title &&
      (todo.due_date === null
        ? formInput.due_date === ''
        : todo.due_date === formInput.due_date)
    );
  };
  /* -------------------------END------------------------------------------- */

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error);
  }

  if (!data?.todos.length) {
    return <div>Todo not found. It may have been deleted</div>;
  }

  if (data?.todos.length) {
    todo = data?.todos[0];

    return (
      <form className={`todo__card ${todo.is_important ? 'important' : ''}`}>
        <main className="todo__card-main">
          <div className="todo__card-heading">
            <div className="round">
              <input
                type="checkbox"
                name="is_complete"
                id={todo.id}
                checked={todo.is_complete}
                onChange={toggleCompleteHandler}
              />
              <label htmlFor={todo.id} />
            </div>
            <div className="todo__card-content">
              <input
                type="text"
                name="title"
                className={`todo__card-title ${
                  todo.is_complete ? 'complete' : ''
                }`}
                placeholder={todo.title}
                value={formInput.title}
                onChange={changeHandler}
              />
              <div className="todo__card-subtitle" onClick={toggleTodayHandler}>
                <span>
                  <BiSun fontSize={16} />
                </span>{' '}
                <span>
                  {todo.today === dateUtils.getFullDate()
                    ? 'Today'
                    : 'Add to Today'}
                </span>
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
            </div>
          </div>
          <div className="todo__card-trailing">
            <div
              className="todo__card-trailing-important"
              onClick={toggleImportantHandler}
            >
              {todo.is_important ? (
                <AiFillStar color="#ea4c89" fontSize={26} />
              ) : (
                <AiOutlineStar color="#3d3d4e" fontSize={26} />
              )}
            </div>
          </div>
        </main>
        <footer className="todo__card-footer">
          <div className="todo__card-cta">
            {!equalityChecker() && (
              <button
                className="save-btn"
                type="button"
                onClick={submitHandler}
              >
                Save
              </button>
            )}
            <button
              type="button"
              className="del-btn"
              onClick={openModal}
            >
              <RiDeleteBin6Line fontSize={32} />
            </button>
            <DeleteModal
              modalOpen={modalOpen}
              changeFn={setModalOpen}
              delFn={clearTodoHandler}
            />
          </div>
        </footer>
      </form>
    );
  }
};

export default ContentWrapper(TodoDetails);

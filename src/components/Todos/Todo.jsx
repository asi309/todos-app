import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { BiSun } from 'react-icons/bi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsCalendar4Event } from 'react-icons/bs';

import { todosMutations, todosQuery } from '../../constants';
import dateUtils from '../../utils/date';
import './Todo.scss';

const Todo = ({ todo }) => {
  // Update functions
  const updateCacheOnToggleComplete = (cache) => {
    const existingTodos = cache.readQuery({ query: todosQuery.getTodos });
    const updatedTodos = existingTodos.todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, is_complete: !t.is_complete };
      } else {
        return t;
      }
    });

    cache.writeQuery({
      query: todosQuery.getTodos,
      data: { todos: updatedTodos },
    });
  };

  const updateCacheOnClearTodo = (cache) => {
    const existingTodos = cache.readQuery({ query: todosQuery.getTodos });
    const filteredTodos = existingTodos.todos.filter((t) => t.id !== todo.id);

    cache.writeQuery({
      query: todosQuery.getTodos,
      data: { todos: filteredTodos },
    });
  };

  const updateCacheOnClearCompleted = (cache) => {
    const existingTodos = cache.readQuery({ query: todosQuery.getTodos });
    const filteredTodos = existingTodos.todos.filter((t) => !t.is_complete);

    cache.writeQuery({
      query: todosQuery.getTodos,
      data: { todos: filteredTodos },
    });
  };

  const updateCacheOnToggleImportant = (cache) => {
    const existingTodos = cache.readQuery({ query: todosQuery.getTodos });
    const updatedTodos = existingTodos.todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, is_important: !t.is_important };
      } else {
        return t;
      }
    });

    cache.writeQuery({
      query: todosQuery.getTodos,
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
    });
  };

  const clearCompletedHandler = () => {
    clearCompletedTodos();
  };

  const toggleImportantHandler = () => {
    toggleImportantMutation({
      variables: { id: todo.id, isImportant: !todo.is_important },
    });
  };
  /* -------------------------END------------------------------------------- */

  // JSX
  return (
    <li className={`todo__card ${todo.is_important ? 'important' : ''}`}>
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
        <Link
          to={`/todos/${todo.id}`}
          state={{ prev: window.location.pathname }}
          className="todo__content-wrapper"
        >
          <div className="todo__card-content">
            <h3
              className={`todo__card-title ${
                todo.is_complete ? 'complete' : ''
              }`}
            >
              {todo.title}
            </h3>
            <div className="todo__card-subtitle-container">
              {todo.today === dateUtils.getFullDate() && (
                <h4 className="todo__card-subtitle">
                  <span>
                    <BiSun />
                  </span>{' '}
                  Today
                </h4>
              )}
              {todo.today === dateUtils.getFullDate() && todo.due_date && (
                <div className="seperator" />
              )}
              {todo.due_date && (
                <h4
                  className={`todo__card-subtitle${
                    new Date(todo.due_date) <= new Date() ? ' passed' : ''
                  }`}
                >
                  <span>
                    <BsCalendar4Event />
                  </span>{' '}
                  {dateUtils.dateString(todo.due_date)}
                </h4>
              )}
            </div>
          </div>
        </Link>
      </div>
      <div className="todo__card-trailing" onClick={toggleImportantHandler}>
        {todo.is_important ? (
          <AiFillStar color="#ea4c89" fontSize={26} />
        ) : (
          <AiOutlineStar color="#3d3d4e" fontSize={26} />
        )}
      </div>
    </li>
  );
};

export default Todo;

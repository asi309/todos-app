import { useQuery, useSubscription } from '@apollo/client';

import { todosQuery, todosSubscription } from '../../constants';
import { ContentWrapper } from '../../containers';
import Todo from './Todo';
import dateUtils from '../../utils/date';
import './TodosList.scss';

const RenderTodosList = ({ todos }) => {
  return (
    <ul className="app__todos-list">
      {todos?.map((todo, idx) => (
        <Todo key={todo.title + idx} todo={todo} />
      ))}
    </ul>
  );
}

const TodosList = ({ list }) => {
  let query;

  const today = dateUtils.getFullDate();

  if (!list) {
    query = todosQuery.getTodos;
  } else if (list) {
    if (list === 'important') {
      query = todosQuery.getImpTodos;
    } else if (list === 'today') {
      query = todosQuery.getTodayTodos;
    } else if (list === 'planned') {
      query = todosQuery.getPlannedTodos;
    }
  }

  const { loading, error, data } = useQuery(query, {
    ...(list === 'today' && { variables: { today } }),
    fetchPolicy: 'cache-and-network',
    // returnPartialData: true,
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error);
  }

  if (!data?.todos.length) {
    return <div className="app__no_data">Add Tasks to show</div>;
  }

  return (
    <RenderTodosList todos={data.todos} />
  );
};

export default ContentWrapper(TodosList);

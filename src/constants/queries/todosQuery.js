import { gql } from '@apollo/client';

const GET_TODOS = gql`
  query getTodos {
    todos(order_by: { created_at: desc }) {
      id
      title
      due_date
      today
      is_important
      is_complete
      created_at
      completed_at
      steps {
        id
        is_complete
      }
    }
  }
`;

const GET_IMP_TODOS = gql`
  query getTodos {
    todos(
      where: { is_important: { _eq: true } }
      order_by: { created_at: desc }
    ) {
      id
      title
      due_date
      today
      is_important
      is_complete
      created_at
      completed_at
      steps {
        id
        is_complete
      }
    }
  }
`;

const GET_TODAY_TODOS = gql`
  query getTodos($today: date!) {
    todos(where: { today: { _eq: $today } }, order_by: { created_at: desc }) {
      id
      title
      due_date
      today
      is_important
      is_complete
      created_at
      completed_at
      steps {
        id
        is_complete
      }
    }
  }
`;

const GET_PLANNED_TODOS = gql`
  query getTodos {
    todos(
      where: { due_date: { _is_null: false } }
      order_by: { created_at: desc }
    ) {
      id
      title
      due_date
      today
      is_important
      is_complete
      created_at
      completed_at
      steps {
        id
        is_complete
      }
    }
  }
`;

const GET_TODO_BY_ID = gql`
  query getTodos($id: uuid) {
    todos(where: { id: { _eq: $id } }, order_by: { created_at: desc }) {
      id
      title
      due_date
      today
      is_important
      is_complete
      created_at
      completed_at
      steps {
        id
        is_complete
      }
    }
  }
`;

const todosQueries = {
  getTodos: GET_TODOS,
  getImpTodos: GET_IMP_TODOS,
  getTodayTodos: GET_TODAY_TODOS,
  getPlannedTodos: GET_PLANNED_TODOS,
  getTodoById: GET_TODO_BY_ID,
};

export default todosQueries;

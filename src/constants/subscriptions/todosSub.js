import { gql } from '@apollo/client';

const GET_TODOS = gql`
  subscription getTodos {
    todos(order_by: { created_at: desc }) {
      id
      title
      due_date
      today
      is_important
      is_complete
      created_at
      completed_at
      steps(order_by: { created_at: asc }) {
        id
        is_complete
        title
      }
    }
  }
`;

const GET_IMP_TODOS = gql`
  subscription getTodos {
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
      steps(order_by: { created_at: asc }) {
        id
        is_complete
        title
      }
    }
  }
`;

const GET_TODAY_TODOS = gql`
  subscription getTodos($today: date!) {
    todos(where: { today: { _eq: $today } }, order_by: { created_at: desc }) {
      id
      title
      due_date
      today
      is_important
      is_complete
      created_at
      completed_at
      steps(order_by: { created_at: asc }) {
        id
        is_complete
        title
      }
    }
  }
`;

const GET_PLANNED_TODOS = gql`
  subscription getTodos {
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
      steps(order_by: { created_at: asc }) {
        id
        is_complete
        title
      }
    }
  }
`;

const GET_TODO_BY_ID = gql`
  subscription getTodos($id: uuid) {
    todos(where: { id: { _eq: $id } }, order_by: { created_at: desc }) {
      id
      title
      due_date
      today
      is_important
      is_complete
      created_at
      completed_at
      steps(order_by: { created_at: desc }) {
        id
        is_complete
        title
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

import { gql } from '@apollo/client';

const CLEAR_COMPLETED = gql`
  mutation clearCompleted {
    delete_todos(where: { is_completed: { _eq: true } }) {
      affected_rows
    }
  }
`;

const CLEAR_TODO = gql`
  mutation clearTodo($id: uuid!) {
    delete_todos(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($title: String!, $due_date: date) {
    insert_todos(objects: { title: $title, due_date: $due_date }) {
      affected_rows
      returning {
        id
        title
        due_date
        is_important
        is_complete
        today
        created_at
        completed_at
        steps {
          id
          created_at
          is_complete
          title
        }
      }
    }
  }
`;

const ADD_IMP_TODO = gql`
  mutation addTodo($title: String!, $due_date: date) {
    insert_todos(
      objects: { title: $title, due_date: $due_date, is_important: true }
    ) {
      affected_rows
      returning {
        id
        title
        due_date
        is_important
        is_complete
        today
        created_at
        completed_at
        steps {
          id
          created_at
          is_complete
          title
        }
      }
    }
  }
`;

const ADD_TODAY_TODO = gql`
  mutation addTodo($title: String!, $due_date: date, $today: date) {
    insert_todos(
      objects: { title: $title, due_date: $due_date, today: $today }
    ) {
      affected_rows
      returning {
        id
        title
        due_date
        is_important
        is_complete
        today
        created_at
        completed_at
        steps {
          id
          created_at
          is_complete
          title
        }
      }
    }
  }
`;

const ADD_PLANNED_TODO = gql`
  mutation addTodo($title: String!, $due_date: date!) {
    insert_todos(objects: { title: $title, due_date: $due_date }) {
      affected_rows
      returning {
        id
        title
        due_date
        is_important
        is_complete
        today
        created_at
        completed_at
        steps {
          id
          created_at
          is_complete
          title
        }
      }
    }
  }
`;

const TOGGLE_COMPLETE = gql`
  mutation toggleTodo($id: uuid!, $isComplete: Boolean!) {
    update_todos(
      where: { id: { _eq: $id } }
      _set: { is_complete: $isComplete }
    ) {
      affected_rows
    }
  }
`;

const TOGGLE_IMPORTANT = gql`
  mutation toggleImportant($id: uuid!, $isImportant: Boolean!) {
    update_todos(
      where: { id: { _eq: $id } }
      _set: { is_important: $isImportant }
    ) {
      affected_rows
    }
  }
`;

const TOGGLE_TODAY = gql`
  mutation toggleToday($id: uuid!, $today: date) {
    update_todos(where: { id: { _eq: $id } }, _set: { today: $today }) {
      affected_rows
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateTodo($id: uuid!, $title: String!, $due_date: date) {
    update_todos(
      where: { id: { _eq: $id } }
      _set: { title: $title, due_date: $due_date }
    ) {
      affected_rows
      returning {
        title
        due_date
      }
    }
  }
`;

const todosMutations = {
  clearCompleted: CLEAR_COMPLETED,
  clearTodo: CLEAR_TODO,
  addTodo: ADD_TODO,
  addImpTodo: ADD_IMP_TODO,
  addTodayTodo: ADD_TODAY_TODO,
  addPlannedTodo: ADD_PLANNED_TODO,
  toggleComplete: TOGGLE_COMPLETE,
  toggleImportant: TOGGLE_IMPORTANT,
  toggleToday: TOGGLE_TODAY,
  updateTodo: UPDATE_TODO,
};

export default todosMutations;

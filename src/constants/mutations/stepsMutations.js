import { gql } from '@apollo/client';

const ADD_STEP = gql`
  mutation addStep($title: String!, $id: uuid!) {
    insert_steps(objects: { title: $title, todo_id: $id }) {
      affected_rows
      returning {
        id
        title
        is_complete
        todo_id
        user_id
      }
    }
  }
`;

const TOGGLE_COMPLETE_STEPS = gql`
  mutation toggleComplete($id: uuid!, $isComplete: Boolean!) {
    update_steps(
      where: { id: { _eq: $id } }
      _set: { is_complete: $isComplete }
    ) {
      affected_rows
    }
  }
`;

const UPDATE_STEP = gql`
  mutation updateStep($id: uuid!, $title: String!) {
    update_steps(where: { id: { _eq: $id } }, _set: { title: $title }) {
      affected_rows
      returning {
        id
        title
        is_complete
        todo_id
        user_id
      }
    }
  }
`;

const CLEAR_STEP = gql`
  mutation clearStep($id: uuid!) {
    delete_steps(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const stepsMutations = {
  addStep: ADD_STEP,
  toggleComplete: TOGGLE_COMPLETE_STEPS,
  updateStep: UPDATE_STEP,
  clearStep: CLEAR_STEP,
};

export default stepsMutations;

import { gql } from '@apollo/client';

const GET_STEP_BY_ID = gql`
  query getSteps($id: uuid) {
    steps(where: { id: { _eq: $id } }, order_by: { created_at: asc }) {
      id
      title
      is_complete
    }
  }
`;

const GET_STEPS = gql`
  query getSteps($todo_id: uuid!) {
    steps(
      where: { todo_id: { _eq: $todo_id } }
      order_by: { created_at: asc }
    ) {
      id
      title
      is_complete
    }
  }
`;

const stepsQueries = {
  getSteps: GET_STEPS,
  getStepById: GET_STEP_BY_ID,
};

export default stepsQueries;

import { gql } from '@apollo/client';

const GET_USER_DETAILS = gql`
  query getUserDetails {
    users {
      name
      picture
    }
  }
`;

const userQuery = {
  getUserDetails: GET_USER_DETAILS,
};

export default userQuery;

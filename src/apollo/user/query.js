import { gql } from '@apollo/client';

export const userQuery = gql`
  query user {
    user @client
  }
`;
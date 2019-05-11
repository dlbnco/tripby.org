import gql from 'graphql-tag';

const GET_SUBSTANCES = gql`
  query getSubstances($limit: Int, $offset: Int) {
    substances(limit: $limit, offset: $offset) {
      name
      class {
        psychoactive
      }
    }
  }
`;

export default GET_SUBSTANCES;

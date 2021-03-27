import { gql } from 'graphql-request';

export const QUERY_PROFESSIONS = gql`
  query professions($sort: [String!]) {
    professions(sort: $sort) {
      items {
        id
        slug
        name
        qualifications {
          id
          slug
          code
          name
          formula
        }
      }
    }
  }
`;

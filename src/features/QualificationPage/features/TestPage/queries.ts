import { gql } from 'graphql-request';

export const QUERY_QUALIFICATION = gql`
  query qualification($slug: String!) {
    qualification(slug: $slug) {
      id
      slug
      name
      code
      formula
    }
  }
`;

export const QUERY_GENERATE_TEST = gql`
  query generateTest($limit: Int!, $qualificationIDs: [ID!]!) {
    generateTest(limit: $limit, qualificationIDs: $qualificationIDs) {
      id
      content
      image
      answerA
      answerAImage
      answerB
      answerBImage
      answerC
      answerCImage
      answerD
      answerDImage
      correctAnswer
      updatedAt
    }
  }
`;

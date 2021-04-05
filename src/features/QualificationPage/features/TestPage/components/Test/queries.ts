import { gql } from 'graphql-request';

export const QUERY_GENERATE_TEST = gql`
  query generateTest(
    $limit: Int!
    $qualificationIDs: [ID!]!
  ) {
    generateTest(limit: $limit, qualificationIDs: $qualificationIDs) {
      id
      from
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

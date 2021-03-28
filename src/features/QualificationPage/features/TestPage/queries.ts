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

export const QUERY_GENERATE_TEST_SIMILAR_QUALIFICATIONS = gql`
  query generateTestAndGetSimilarQualifications(
    $limitTest: Int!
    $qualificationID: ID!
    $limitSuggestions: Int!
  ) {
    generateTest(limit: $limitTest, qualificationIDs: [$qualificationID]) {
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
    similarQualifications(
      limit: $limitSuggestions
      qualificationID: $qualificationID
    ) {
      items {
        id
        name
        code
      }
    }
  }
`;

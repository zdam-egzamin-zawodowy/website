import { Scalars } from 'libs/graphql';

export type QueryGenerateTestSimilarQualificationsArgs = {
  limitTest: Scalars['Int'];
  qualificationID: Scalars['ID'];
  limitSuggestions: Scalars['Int'];
  skipSuggestions: Scalars['Boolean'];
};

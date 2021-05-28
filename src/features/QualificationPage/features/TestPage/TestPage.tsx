import { GetStaticPaths, GetStaticProps } from 'next';
import { isString, isNil } from 'lodash';
import { polishPlurals } from 'polish-plurals';
import {
  createClient,
  Qualification,
  Query,
  QueryQualificationArgs,
  Question,
} from 'libs/graphql';
import resolveAs from 'utils/resolveAs';
import { QUESTIONS } from 'config/app';
import { Route } from 'config/routing';
import {
  QUERY_GENERATE_TEST_SIMILAR_QUALIFICATIONS,
  QUERY_QUALIFICATION,
} from './queries';
import { QueryGenerateTestSimilarQualificationsArgs } from './types';

import Layout from 'common/Layout/Layout';
import Seo from 'common/Seo/Seo';
import Suggestions from './components/Suggestions/Suggestions';
import Test from './components/Test/Test';

export type TestPageParams = {
  slug: string;
  limit: string;
};

export interface TestPageProps {
  qualification: Qualification;
  questions: Question[];
  suggestions: Qualification[];
}

const TestPage = ({ questions, suggestions, qualification }: TestPageProps) => {
  return (
    <Layout>
      <Seo
        title={`${qualification.code} - Test ${
          questions.length
        } ${polishPlurals('pytanie', 'pytania', 'pytań', questions.length)}`}
      />
      <Test initialQuestions={questions} qualification={qualification} />
      {suggestions.length > 0 && <Suggestions suggestions={suggestions} />}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

const SUGGESTIONS_LIMIT = 6;
const REVALIDATE_ERROR = 600;
const REVALIDATE_SUCCESS = 10;

export const getStaticProps: GetStaticProps<
  TestPageProps,
  TestPageParams
> = async ({ params }) => {
  const props: TestPageProps = {
    suggestions: [],
    questions: [],
    qualification: {
      id: 0,
      slug: '',
      name: '',
      code: '',
      createdAt: new Date(0),
    },
  };

  if (!params || isNil(params.limit) || !isString(params.slug))
    return { notFound: true, revalidate: REVALIDATE_ERROR };
  const limit = parseInt(params.limit);
  const slug = params.slug.trim();
  if (
    isNaN(limit) ||
    !QUESTIONS.some(numOfQuestions => numOfQuestions === limit)
  ) {
    return {
      props,
      redirect: {
        destination: resolveAs({
          pathname: Route.TestPage,
          query: { ...params, limit: QUESTIONS[QUESTIONS.length - 1] },
        }),
      },
      revalidate: REVALIDATE_ERROR,
    };
  }

  const client = createClient();
  try {
    const { qualification } = await client.request<
      Pick<Query, 'qualification'>,
      QueryQualificationArgs
    >(QUERY_QUALIFICATION, { slug });
    if (!qualification) {
      throw new Error('404');
    }
    props.qualification = qualification;
    const { generateTest, similarQualifications } = await client.request<
      Pick<Query, 'generateTest' | 'similarQualifications'>,
      QueryGenerateTestSimilarQualificationsArgs
    >(QUERY_GENERATE_TEST_SIMILAR_QUALIFICATIONS, {
      limitSuggestions: SUGGESTIONS_LIMIT,
      qualificationID: qualification.id,
      limitTest: limit,
      skipSuggestions: false,
    });
    if (Array.isArray(generateTest)) {
      props.questions = generateTest;
    }
    if (Array.isArray(similarQualifications.items)) {
      props.suggestions = similarQualifications.items;
    }
    return {
      props,
      revalidate: REVALIDATE_SUCCESS,
    };
  } catch (e) {
    return { notFound: true, revalidate: REVALIDATE_ERROR };
  }
};

export default TestPage;

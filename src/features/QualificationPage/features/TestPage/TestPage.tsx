import { GetStaticPaths, GetStaticProps } from 'next';
import { polishPlurals } from 'polish-plurals';
import {
  createClient,
  Qualification,
  Query,
  QueryQualificationArgs,
  Question,
  Scalars,
} from 'libs/graphql';
import resolveAs from 'utils/resolveAs';
import { QUESTIONS } from 'config/app';
import { Route } from 'config/routing';
import {
  QUERY_GENERATE_TEST_SIMILAR_QUALIFICATIONS,
  QUERY_QUALIFICATION,
} from './queries';

import Layout from 'common/Layout/Layout';
import SEO from 'common/SEO/SEO';

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
  console.log(questions, suggestions, qualification);
  return (
    <Layout>
      <SEO
        title={`${qualification.code} - Test ${
          questions.length
        } ${polishPlurals('pytanie', 'pytania', 'pytań', questions.length)}`}
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

type QueryGenerateTestSimilarQualificationsArgs = {
  limitTest: Scalars['Int'];
  qualificationID: Scalars['ID'];
  limitSuggestions: Scalars['Int'];
};

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

  if (!params) return { notFound: true, revalidate: 600 };
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
      revalidate: 600,
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
      limitSuggestions: 6,
      qualificationID: qualification.id,
      limitTest: limit,
    });
    if (Array.isArray(generateTest)) {
      props.questions = generateTest;
    }
    if (Array.isArray(similarQualifications.items)) {
      props.suggestions = similarQualifications.items;
    }
    return {
      props,
      revalidate: 20,
    };
  } catch (e) {
    return { notFound: true, revalidate: 600 };
  }
};

export default TestPage;

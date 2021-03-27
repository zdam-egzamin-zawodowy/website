import { GetStaticPaths, GetStaticProps } from 'next';
import {
  createClient,
  Qualification,
  Query,
  QueryGenerateTestArgs,
  QueryQualificationArgs,
  Question,
} from 'libs/graphql';
import resolveHref from 'utils/resolveHref';
import { QUESTIONS } from 'config/app';
import { Route } from 'config/routing';
import { QUERY_GENERATE_TEST, QUERY_QUALIFICATION } from './queries';

import Layout from 'common/Layout/Layout';
import SEO from 'common/SEO/SEO';

export type TestPageParams = {
  slug: string;
  limit: string;
};

export interface TestPageProps {
  questions: Question[];
  suggestions: Qualification[];
}

const TestPage = () => {
  return (
    <Layout>
      <SEO />
      elo
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<
  TestPageProps,
  TestPageParams
> = async ({ params }) => {
  const props: TestPageProps = {
    suggestions: [],
    questions: [],
  };

  if (!params) return { notFound: true, revalidate: 600, props };
  const limit = parseInt(params.limit);
  const slug = params.slug.trim();
  if (
    slug.length === 0 ||
    isNaN(limit) ||
    !QUESTIONS.some(numOfQuestions => numOfQuestions === limit)
  ) {
    return {
      props,
      redirect: {
        destination: resolveHref(
          '',
          {
            pathname: Route.TestPage,
            query: { ...params, limit: QUESTIONS[QUESTIONS.length - 1] },
          },
          true
        )[1],
      },
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
    const { generateTest } = await client.request<
      Pick<Query, 'generateTest'>,
      QueryGenerateTestArgs
    >(QUERY_GENERATE_TEST, { limit, qualificationIDs: [qualification.id] });
    if (Array.isArray(generateTest)) {
      props.questions = generateTest;
    }
  } catch (e) {
    return { notFound: true, revalidate: 600, props };
  }

  return {
    props,
    revalidate: 20,
  };
};

export default TestPage;

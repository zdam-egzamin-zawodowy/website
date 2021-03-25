import { GetStaticProps } from 'next';
import {
  createClient,
  Profession,
  Qualification,
  Query,
  QueryProfessionsArgs,
} from 'libs/graphql';
import { QUERY_PROFESSIONS } from './queries';

import Layout from 'common/Layout/Layout';
import Header from './components/Header/Header';

interface IndexPageProps {
  professions: Profession[];
  qualifications: Qualification[];
}

const IndexPage = ({ qualifications }: IndexPageProps) => {
  return (
    <Layout transparentTopBar absoluteTopBar padding={false}>
      <Header qualifications={qualifications} />
    </Layout>
  );
};

const getQualificationsFromProfessions = (
  professions: Profession[]
): Qualification[] => {
  const map = new Map<number, Qualification>();
  professions.forEach(profession => {
    profession.qualifications.forEach(qualification => {
      map.set(qualification.id, qualification);
    });
  });
  return Array.from(map.values());
};

export const getStaticProps: GetStaticProps = async () => {
  const pageProps: IndexPageProps = { professions: [], qualifications: [] };
  const client = createClient();

  try {
    const resp = await client.request<
      Pick<Query, 'professions'>,
      QueryProfessionsArgs
    >(QUERY_PROFESSIONS, { sort: ['name ASC'] });
    if (Array.isArray(resp.professions?.items)) {
      pageProps.professions = resp.professions.items;
      pageProps.qualifications = getQualificationsFromProfessions(
        resp.professions.items
      );
    }
  } catch (e) {}

  return {
    props: pageProps,
    revalidate: 60,
  };
};

export default IndexPage;

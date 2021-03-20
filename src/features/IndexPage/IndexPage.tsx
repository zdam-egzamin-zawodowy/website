import { GetStaticProps } from 'next';
import { createClient } from 'libs/graphql';

import Layout from 'common/Layout/Layout';
import Header from './components/Header/Header';

const IndexPage = () => {
  return (
    <Layout transparentTopBar absoluteTopBar padding={false}>
      <Header />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const pageProps = {};
  const client = createClient();

  return {
    props: pageProps,
    revalidate: 60,
  };
};

export default IndexPage;

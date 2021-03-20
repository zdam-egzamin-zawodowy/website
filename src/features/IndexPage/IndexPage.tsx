import Layout from 'common/Layout/Layout';

import Header from './components/Header/Header';

const IndexPage = () => {
  return (
    <Layout transparentTopBar absoluteTopBar padding={false}>
      <Header />
    </Layout>
  );
};

export default IndexPage;

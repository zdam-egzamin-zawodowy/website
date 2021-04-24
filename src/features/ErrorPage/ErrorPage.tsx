import { NextPage } from 'next';
import { ErrorProps } from 'next/error';

import { Box, Typography } from '@material-ui/core';
import Layout from 'common/Layout/Layout';
import Section from 'common/Section/Section';
import Seo from 'common/Seo/Seo';

const getTitleForStatusCode = (statusCode: number): string => {
  switch (statusCode) {
    case 404:
      return 'Nie znaleziono strony';
    default:
      return 'Wewnętrzny błąd serwera';
  }
};

const ErrorPage: NextPage<ErrorProps> = ({ statusCode, title }: ErrorProps) => {
  const _title = title ?? getTitleForStatusCode(statusCode);
  return (
    <Layout>
      <Seo title={_title} />
      <Box
        minHeight="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Section>
          <Typography variant="h1">
            <strong>{statusCode}</strong>
          </Typography>
          <Typography variant="h2">{_title}</Typography>
        </Section>
      </Box>
    </Layout>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  return { statusCode: (res ? res.statusCode : err?.statusCode) ?? 404 };
};

export default ErrorPage;

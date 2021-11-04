import { NextPage } from 'next';
import { ErrorProps } from 'next/error';
import * as Sentry from '@sentry/nextjs';

import { Box, Typography } from '@material-ui/core';
import Layout from 'common/Layout/Layout';
import Section from 'common/Section/Section';
import Seo from 'common/Seo/Seo';
import { useEffect } from 'react';

const getTitleForStatusCode = (statusCode: number): string => {
  switch (statusCode) {
    case 404:
      return 'Nie znaleziono strony';
    default:
      return 'Wewnętrzny błąd serwera';
  }
};

const ErrorPage: NextPage<
  ErrorProps & { hasGetInitialPropsRun?: boolean; err?: any }
> = ({ statusCode, title, hasGetInitialPropsRun, err }) => {
  useEffect(() => {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    if (hasGetInitialPropsRun || !err) {
      return;
    }

    Sentry.captureException(err);
  }, [hasGetInitialPropsRun, err]);

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

ErrorPage.getInitialProps = async ({ res, err, asPath }) => {
  const props = {
    statusCode: (res ? res.statusCode : err?.statusCode) ?? 404,
    hasGetInitialPropsRun: true,
  };

  if (!err) {
    Sentry.captureException(
      new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
    );
    await Sentry.flush(2000);

    return props;
  }

  Sentry.captureException(err);

  await Sentry.flush(2000);

  return props;
};

export default ErrorPage;

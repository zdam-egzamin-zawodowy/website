import '@kichiyaki/roboto';
import { useEffect, useMemo } from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import ThemeProvider from 'libs/material-ui/ThemeProvider';
import { createClient, getApolloState } from '../src/libs/graphql';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const apolloState = getApolloState(pageProps);
  const client = useMemo(() => {
    return createClient({ state: apolloState });
  }, [apolloState]);

  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;

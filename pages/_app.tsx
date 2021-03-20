import '@kichiyaki/roboto';
import { useEffect, useMemo } from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import ThemeProvider from 'libs/material-ui/ThemeProvider';
import { createClient, getApolloState } from 'libs/graphql';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloState = getApolloState(pageProps);
  const client = useMemo(() => {
    return createClient({ state: apolloState });
  }, [apolloState]);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;

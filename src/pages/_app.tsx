import '@kichiyaki/roboto';
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import PlausibleProvider from 'libs/plausible/PlausibleProvider';
import ThemeProvider from 'libs/material-ui/ThemeProvider';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider>
      <PlausibleProvider>
        <Component {...pageProps} />
      </PlausibleProvider>
    </ThemeProvider>
  );
};

export default App;

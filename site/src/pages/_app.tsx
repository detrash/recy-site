import { ApolloProvider } from '@apollo/client';
import AOS from 'aos';
import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import AppLayout from 'src/layout';
import { apolloClient } from 'src/lib/apollo';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <NextIntlProvider messages={pageProps?.messages || {}}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </NextIntlProvider>
    </ApolloProvider>
  );
}

export default MyApp;

import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import AOS from 'aos';
import { useEffect } from 'react';
import AppLayout from '../layout';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@src/lib/apollo';
import { NextIntlProvider } from 'next-intl';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <ApolloProvider client={apolloClient}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ApolloProvider>
    </NextIntlProvider>
  );
}

export default MyApp;

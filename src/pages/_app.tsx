import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import AOS from 'aos';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AppLayout from '../layout';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@src/lib/apollo';
import { NextIntlProvider } from 'next-intl';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  return (
    <>
      <Head>
        <title>DeTrash | Tokens que salvam o mundo</title>
      </Head>
      <NextIntlProvider messages={pageProps.messages}>
        <ApolloProvider client={apolloClient}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ApolloProvider>
      </NextIntlProvider>
    </>
  );
}

export default MyApp;

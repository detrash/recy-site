import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import AOS from 'aos';
import { useEffect } from 'react';
import AppLayout from '../modules/home/layout';
import { ApolloProvider } from '@apollo/client';
import { NextIntlProvider } from 'next-intl';
import { apolloClient } from '@modules/home/lib/apollo';
import { useRouter } from 'next/router';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }: AppProps) {
  const APP_PAGE_ROUTE = '/app';
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== APP_PAGE_ROUTE) {
      AOS.init({
        once: true,
        disable: 'phone',
        duration: 700,
        easing: 'ease-out-cubic',
      });
    }
  }, [router.asPath]);

  if (router.asPath === APP_PAGE_ROUTE) {
    return (
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    );
  }

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

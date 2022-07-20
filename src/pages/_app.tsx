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
import Head from 'next/head';
import { FormProvider } from '@modules/app/context/formContext';

function MyApp({ Component, pageProps }: AppProps) {
  const APP_PAGE_ROUTE = 'app';
  const router = useRouter();

  const isOnAppPage =
    router.asPath.split('/').filter(Boolean)[0] === APP_PAGE_ROUTE;

  useEffect(() => {
    if (!isOnAppPage) {
      AOS.init({
        once: true,
        disable: 'phone',
        duration: 700,
        easing: 'ease-out-cubic',
      });
    }
  }, [isOnAppPage]);

  if (isOnAppPage) {
    return (
      <>
        <Head>
          <title>DeTrash | App</title>
        </Head>
        <UserProvider>
          <FormProvider>
            <Component {...pageProps} />
          </FormProvider>
        </UserProvider>
      </>
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

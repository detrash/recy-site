import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0';
import { FormProvider } from '@modules/app/context/formContext';
import { homeApolloClient } from '@shared/lib/apollo';
import AOS from 'aos';
import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import AppLayout from '../modules/home/layout';

import 'react-toastify/dist/ReactToastify.css';

import { WagmiClient } from '@shared/lib/wagmi';
import { WagmiConfig } from 'wagmi';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const APP_PAGE_ROUTE = 'app';
  const API_PAGE_ROUTE = 'api';
  const router = useRouter();

  const isOnAppPage =
    router.asPath.split('/').filter(Boolean)[0] === APP_PAGE_ROUTE;

  const isOnApiPage =
    router.asPath.split('/').filter(Boolean)[0] === API_PAGE_ROUTE;

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

  if (isOnAppPage || isOnApiPage) {
    return (
      <>
        <Head>
          <title>Recy | App</title>
        </Head>
        <WagmiConfig client={WagmiClient}>
          <UserProvider>
            <FormProvider>
              <Component {...pageProps} />
            </FormProvider>
          </UserProvider>
        </WagmiConfig>

        <ToastContainer />
      </>
    );
  }
  return (
    <ApolloProvider client={homeApolloClient}>
      <NextIntlProvider messages={pageProps?.messages || {}}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </NextIntlProvider>
    </ApolloProvider>
  );
}

export default MyApp;

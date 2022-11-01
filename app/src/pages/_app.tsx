import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import 'react-circular-progressbar/dist/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormProvider } from 'src/context/formContext';
import { apolloClient } from 'src/lib/apollo';
import { WagmiClient } from 'src/lib/wagmi';
import { APP_NAV_LINKS } from 'src/utils/navLinks';
import { WagmiConfig } from 'wagmi';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const hasAppLayout =
    router.asPath !== APP_NAV_LINKS.ONBOARDING &&
    router.asPath !== APP_NAV_LINKS.SUBMIT_FORM;

  return (
    <>
      <Head>
        <title>Recy | App</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <WagmiConfig client={WagmiClient}>
          <UserProvider>
            <FormProvider>
              <Component {...pageProps} />
            </FormProvider>
          </UserProvider>
        </WagmiConfig>
      </ApolloProvider>

      <ToastContainer />
    </>
  );
}

export default appWithTranslation(MyApp);

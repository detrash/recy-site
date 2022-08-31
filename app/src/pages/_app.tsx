import { UserProvider } from '@auth0/nextjs-auth0';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'react-circular-progressbar/dist/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormProvider } from 'src/context/formContext';
import { WagmiClient } from 'src/lib/wagmi';
import { WagmiConfig } from 'wagmi';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
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

export default MyApp;

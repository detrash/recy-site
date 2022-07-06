import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import AOS from 'aos';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AppLayout from '../layout';
import Head from 'next/head';

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

  // useEffect(() => {
  //   document.querySelector('html')!.style.scrollBehavior = 'auto';
  //   window.scroll({ top: 0 });
  //   document.querySelector('html')!.style.scrollBehavior = '';
  // }, [router.asPath]);

  return (
    <>
      <Head>
        <title>DeTrash | Tokens que salvam o mundo</title>
      </Head>

      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}

export default MyApp;

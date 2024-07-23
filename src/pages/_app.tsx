import { ApolloProvider } from "@apollo/client";
import AOS from "aos";
import { NextIntlProvider } from "next-intl";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import AppLayout from "src/layout";
import { apolloClient } from "src/lib/apollo";

import "../styles/globals.scss";
import "yet-another-react-lightbox/styles.css";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics">
        {`
         window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
         
           gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
      <NextIntlProvider messages={pageProps?.messages || {}}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </NextIntlProvider>
    </ApolloProvider>
  );
}

export default MyApp;

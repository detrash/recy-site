import { GetStaticProps } from "next";
import Image from "next/image";
import RecyLogo from "public/recy-logo.png";
import CeloLogo from "src/assets/CeloLogo";
import { AddRecyPageData, getAddRecyPageQuery } from "src/graphql/queries";
import { apolloClient } from "src/lib/apollo";

type TeamPageProps = {
  messages: AddRecyPageData;
};

const Team: React.FC<TeamPageProps> = ({ messages }) => {
  return (
    <main className="flex-grow">
      <section>
        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          <div className="pt-32 md:pt-40">
            <div className="max-w-3xl pb-4 mx-auto text-center">
              <h2 className="mb-4 h2">{messages.pageTitle}</h2>
              <div className="flex items-center justify-center">
                <Image
                  src={RecyLogo}
                  alt="DeTrash Logo"
                  width={100}
                  height={100}
                />
                <a
                  href="http://celo.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CeloLogo />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center flex-1 pb-16 md:pb-20">
        <div className="h-full w-full max-w-4xl max-h-[60vh] aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/R_spaQmPxgM"
            title="Token que limpam o mundo!!"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <section className="pb-8 mb-3 bg-gray-100 md:pb-16">
        <div className="absolute left-0 right-0 w-px h-20 p-px m-auto transform -translate-y-1/2 bg-gray-200"></div>

        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          <div className="pt-12 md:pt-20">
            <div className="max-w-3xl pb-12 mx-auto text-center">
              <h1 className="mb-4 h2 text-neutral">{messages.bannerTitle}</h1>
              <Image
                src={messages.qrCode.url}
                alt="TrustWallet QR Code"
                width={200}
                height={200}
              ></Image>

              <div
                className="text-justify"
                dangerouslySetInnerHTML={{
                  __html: messages.trustWalletInfo.html,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => {
  const otherLocale =
    locales?.filter((location) => location !== locale)[0] || "";
  const { data } = await apolloClient.query({
    query: getAddRecyPageQuery,
    variables: {
      locale: [locale, otherLocale],
    },
  });
  if (data) {
    return {
      props: {
        messages: {
          ...data.addRecyPages[0],
          ...(await import(`src/i18n/${locale}.json`)).default,
        },
      },
      revalidate: 60 * 60 * 24, // 1 day
    };
  }

  return {
    props: {},
  };
};

export default Team;

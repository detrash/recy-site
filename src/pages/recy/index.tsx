import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import cRecyLogo from "public/crecy.svg";
import RecyNetworkLogo from "public/recy-wave-logo.png";
import { getRecyPageQuery, RecyPageData } from "src/graphql/queries";
import { apolloClient } from "src/lib/apollo";
import { UTIL_LINKS } from "src/utils/constants";

type RecyPageProps = {
  messages: RecyPageData;
};

const RecyPage: React.FC<RecyPageProps> = ({ messages }) => {
  return (
    <main className="flex-grow">
      <section>
        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl pb-4 mx-auto text-center">
              <Image alt="Recy Network logo" src={RecyNetworkLogo} />
              <h2 className="mt-8 mb-4 h2 sm:mt-12">{messages.pageTitle}</h2>
              <p className="mb-4 text-xl text-justify text-gray-600">
                {messages.pageSubtitle}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <a
                className="w-full mb-4 text-white btn btn-primary md:w-auto md:mb-0"
                data-aos="zoom-y-out"
                target="_blank"
                rel="noopener noreferrer"
                href={UTIL_LINKS.WHITEPAPER_URL}
              >
                {messages.whitepaperButtonLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8 mb-3 bg-gray-100 md:pb-16">
        <div className="absolute left-0 right-0 w-px h-20 p-px m-auto transform -translate-y-1/2 bg-gray-200"></div>

        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          <div className="pt-12 md:pt-20">
            <div className="max-w-3xl pb-12 mx-auto text-center">
              <a
                href={UTIL_LINKS.DETRASH_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={cRecyLogo} alt="RECY token logo" />
              </a>
              <p
                className="my-4 text-xl text-justify text-gray-600"
                data-aos="zoom-y-out"
              >
                {messages.bannerDescription}
              </p>

              <p
                className="text-xl font-bold text-blue-400"
                data-aos="zoom-y-out"
              >
                {messages.pageEffectTitle}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-3">
              <a
                className="w-full text-white btn btn-neutral md:w-auto md:mb-0"
                target="_blank"
                rel="noopener noreferrer"
                href={UTIL_LINKS.TOKEN_CONTRACT_URL}
              >
                {messages.contractButtonLabel}
              </a>
              <a
                href={UTIL_LINKS.BUY_RECY_URL}
                className="w-full text-white btn btn-primary md:w-auto md:mb-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                {messages.bannerButton}
              </a>
            </div>

            <div className="flex items-center justify-center mt-2 md:mt-4">
              <Link href="recy/add">
                <button
                  data-aos="zoom-y-out"
                  className="w-full border shadow-none btn btn-outline border-neutral md:w-auto"
                >
                  {messages.addRecyButtonLabel}
                </button>
              </Link>
            </div>

            <h2 className="pt-8 text-2xl font-semibold text-center sm:text-3xl text-accent sm:pt-12">
              {messages.finalTextEffect}
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { data } = await apolloClient.query({
    query: getRecyPageQuery,
    variables: {
      locale,
    },
  });

  if (data) {
    return {
      props: {
        messages: {
          ...data.recyPages[0],
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

export default RecyPage;

import { getRecyPageQuery, RecyPageData } from '@modules/home/graphql/queries';
import { apolloClient } from '@modules/home/lib/apollo';
import { UTIL_LINKS } from '@modules/home/utils/constants';
import RecyLogo from '@public/recy-logo.png';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type RecyPageProps = {
  messages: RecyPageData;
};

const RecyPage: React.FC<RecyPageProps> = ({ messages }) => {
  return (
    <main className="flex-grow">
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-4">
              <h2 className="h2 mb-4">{messages.pageTitle}</h2>
              <p className="text-xl text-justify text-gray-600 mb-4">
                {messages.pageSubtitle}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <a
                className="btn btn-primary text-white w-full mb-4 md:w-auto md:mb-0"
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

      <section className="bg-gray-100 pb-8 md:pb-16 mb-3">
        <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-12 md:pt-20">
            <div className="max-w-3xl mx-auto text-center pb-12">
              <a
                href={UTIL_LINKS.DETRASH_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={RecyLogo} alt="RECY token logo" />
              </a>
              <p
                className="text-xl text-justify text-gray-600 mb-4"
                data-aos="zoom-y-out"
              >
                {messages.bannerDescription}
              </p>

              <p
                className="text-xl text-blue-400 font-bold"
                data-aos="zoom-y-out"
              >
                {messages.pageEffectTitle}
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
              <a
                className="btn btn-neutral w-full md:w-auto text-white md:mb-0"
                target="_blank"
                rel="noopener noreferrer"
                href={UTIL_LINKS.TOKEN_CONTRACT_URL}
              >
                {messages.contractButtonLabel}
              </a>
              <a
                href={UTIL_LINKS.BUY_RECY_URL}
                className="btn btn-primary w-full md:w-auto text-white md:mb-0"
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
                  className="btn btn-outline border border-neutral shadow-none w-full md:w-auto"
                >
                  {messages.addRecyButtonLabel}
                </button>
              </Link>
            </div>
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
          ...(await import(`@modules/home/i18n/${locale}.json`)).default,
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

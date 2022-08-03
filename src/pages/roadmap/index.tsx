import { CheckCircleIcon } from '@heroicons/react/solid';
import {
  getRoadMapPageQuery,
  RoadMapPageData,
} from '@modules/home/graphql/queries';
import { apolloClient } from '@modules/home/lib/apollo';
import { GetStaticProps } from 'next';
import Image from 'next/image';

type RoadMapPageProps = {
  messages: RoadMapPageData;
};

const RoadMap: React.FC<RoadMapPageProps> = ({ messages }) => {
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
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <CheckCircleIcon className="w-10 h-10 absolute -right-2 -top-2 " />
                <p className="text-xl text-justify text-gray-600">
                  {messages.panelDescription}
                </p>
              </div>
              <p
                className="text-xl text-blue-400 font-bold mt-8"
                data-aos="zoom-y-out"
              >
                {messages.titleEffect}
              </p>
            </div>

            <div className="flex mt-4 flex-col items-center justify-center">
              {messages?.roadmapImage && (
                <Image
                  src={messages?.roadmapImage?.url}
                  height={500}
                  width={800}
                  alt="RoadMap"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => {
  const otherLocale =
    locales?.filter((location) => location !== locale)[0] || '';
  const { data } = await apolloClient.query({
    query: getRoadMapPageQuery,
    variables: {
      locale: [locale, otherLocale],
    },
  });

  if (data) {
    return {
      props: {
        messages: {
          ...data.roadmapPages[0],
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

export default RoadMap;

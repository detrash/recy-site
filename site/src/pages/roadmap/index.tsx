import { GetStaticProps } from 'next';
import Image from 'next/image';
import { CheckCircle } from 'phosphor-react';
import { getRoadMapPageQuery, RoadMapPageData } from 'src/graphql/queries';
import { apolloClient } from 'src/lib/apollo';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

type RoadMapPageProps = {
  messages: RoadMapPageData;
};

const RoadMap: React.FC<RoadMapPageProps> = ({ messages }) => {
  const [isImageOpen, setImageOpen] = useState(false);

  return (
    <>
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
                  <CheckCircle className="w-10 h-10 absolute -right-2 -top-2 " />
                  <p className="text-xl text-gray-600">
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
                  <button onClick={() => setImageOpen(true)}>
                    <Image
                      src={messages?.roadmapImage?.url}
                      height={800}
                      width={800}
                      layout="intrinsic"
                      objectFit="contain"
                      alt="RoadMap"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Lightbox
        open={isImageOpen}
        close={() => setImageOpen(false)}
        slides={[{ src: messages?.roadmapImage?.url }]}
        plugins={[Zoom]}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
      />
    </>
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

export default RoadMap;

import { HomePageData } from '@src/graphql/queries';

type FeatureHomeProps = {
  messages: HomePageData;
};

const FeatureHome: React.FC<FeatureHomeProps> = ({ messages }) => {
  return (
    <section className="relative bg-gray-100">
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4 text-neutral">
              {messages.featuresHomeTitle}
            </h1>
            <p className="text-xl text-gray-600">
              {messages.featuresHomeSubTitle}
            </p>
          </div>

          <div className="md:grid md:grid-cols-12 md:gap-6">
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8 space-y-10">
                <div>
                  <h2 className="h2">7%</h2>
                  <span className="text-xl text-gray-600 ">
                    {messages.featuresHomeItem1}
                  </span>
                </div>
                <div>
                  <h2 className="h2">300mi+</h2>
                  <span className="text-xl text-gray-600 ">
                    {messages.featuresHomeItem2}
                  </span>
                </div>

                <div>
                  <h2 className="h2">100kg</h2>
                  <span className="text-xl text-gray-600 ">
                    {messages.featuresHomeItem3}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-20 md:order-1"
              data-aos="zoom-y-out"
            >
              <div className="relative flex flex-col text-center lg:text-right">
                <div className="relative inline-flex flex-col">
                  <picture>
                    <img
                      className="md:max-w-none mx-auto rounded"
                      src={messages?.homeImages[0].url}
                      width="350"
                      height="462"
                      alt="Features bg"
                    />
                  </picture>
                  <picture>
                    <img
                      className="md:max-w-none absolute top-2 border-8 border-white rounded"
                      src={messages?.homeImages[1].url}
                      width="150"
                      height="44"
                      alt="Element"
                    />
                  </picture>
                  <picture>
                    <img
                      className="md:max-w-none absolute right-0 -bottom-8 border-8 border-white rounded"
                      src={messages?.homeImages[2].url}
                      width="200"
                      height="44"
                      alt="Element"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHome;

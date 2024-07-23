/* eslint-disable @next/next/no-html-link-for-pages */

import { HomePageData } from 'src/graphql/queries';
import { UTIL_LINKS } from 'src/utils/constants';

type HeroHomeProps = {
  messages: HomePageData;
};

const HeroHome: React.FC<HeroHomeProps> = ({ messages }) => {
  const scrollSmoothTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  };
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 text-neutral"
              data-aos="zoom-y-out"
            >
              {messages.pageTitle}
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                {messages.pageTitleEffect}
              </p>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-justify text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                {messages.pageSubTitle}
              </p>
              <div
                className="max-w-xs mx-auto "
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <button
                  className="btn btn-primary text-white w-full mb-4 md:w-auto md:mb-0"
                  onClick={() => scrollSmoothTo('recytoken')}
                >
                  {messages.homeButton}
                </button>
                <div className="block md:hidden">
                  <a
                    href={UTIL_LINKS.APP_URL}
                    className="btn btn-neutral text-white w-full mb-4 md:w-auto md:mb-0"
                  >
                    Launch App
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;

import { HomePageData } from 'src/graphql/queries';
import { UTIL_LINKS } from 'src/utils/constants';

type CTAProps = {
  messages: HomePageData;
};

const CTA: React.FC<CTAProps> = ({ messages }) => {
  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-8">
            <h2 className="h2 mb-4 text-neutral">{messages.ctaTitle}</h2>
            <p
              className="text-xl text-justify text-gray-600"
              data-aos="zoom-y-out"
            >
              {messages.ctaSubTitle}
            </p>
            <p
              className="text-xl text-blue-400 font-bold mt-4"
              data-aos="zoom-y-out"
            >
              {messages.ctaTitleEffect}
            </p>
          </div>

          <div
            className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="300"
          >
            <a
              className="btn btn-primary text-white  w-full mb-4 sm:w-auto sm:mb-0"
              href={UTIL_LINKS.BUY_RECY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {messages.ctaButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

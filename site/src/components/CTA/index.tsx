import { HomePageData } from "src/graphql/queries";
import { UTIL_LINKS } from "src/utils/constants";

type CTAProps = {
  messages: HomePageData;
};

const CTA: React.FC<CTAProps> = ({ messages }) => {
  return (
    <section className="relative">
      <div className="relative max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl pb-8 mx-auto text-center">
            <h2 className="mb-4 h2 text-neutral">{messages.ctaTitle}</h2>
            <p
              className="text-xl text-justify text-gray-600"
              data-aos="zoom-y-out"
            >
              {messages.ctaSubTitle}
            </p>
            <p
              className="my-4 text-xl font-bold text-blue-400"
              data-aos="zoom-y-out"
            >
              {messages.ctaTitleEffect}
            </p>
            <p
              className="text-xl text-justify text-gray-600"
              data-aos="zoom-y-out"
            >
              {messages.ctaSubTitle}
            </p>
          </div>

          <div
            className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="300"
          >
            <a
              className="w-full mb-4 text-white btn btn-primary sm:w-auto sm:mb-0"
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

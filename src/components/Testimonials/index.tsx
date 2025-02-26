import Image from "next/image";
import { HomePageData } from "src/graphql/queries";
import { UTIL_LINKS } from "src/utils/constants";

type TestimonialsProps = {
  messages: HomePageData;
};

const Testimonials: React.FC<TestimonialsProps> = ({ messages }) => {
  return (
    <section className="relative bg-primary">
      <div className="absolute left-0 right-0 w-px h-20 p-px m-auto transform -translate-y-1/2 bg-gray-200"></div>
      <div
        className="absolute bottom-0 hidden transform translate-x-1/2 pointer-events-none right-48 md:inline"
        aria-hidden="true"
      >
        <Image src="/recy-wave-logo.png" alt="detrash" width="500" height="500" />
      </div>
      <div id="recytoken" className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl pb-12 mx-auto text-center ">
            <h2 className="mb-4 text-white h2">{messages.testimonialsTitle}</h2>
            <p
              className="text-xl text-justify text-gray-200"
              data-aos="zoom-y-out"
            >
              {messages.testimonialsSubTitle}
            </p>
          </div>
          <div
            className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="300"
          >
            <a
              className="w-full mb-4 text-white btn btn-primary sm:w-auto sm:mb-0"
              href={UTIL_LINKS.SCHEDULE}
              target="_blank"
              rel="noopener noreferrer"
            >
              {messages.testimonialsButton1}
            </a>
            <a
              className="w-full text-white btn btn-neutral sm:w-auto sm:ml-4"
              href={UTIL_LINKS.WHITEPAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {messages.testimonialsButton2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

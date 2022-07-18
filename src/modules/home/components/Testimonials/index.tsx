import { HomePageData } from '@modules/home/graphql/queries';
import { UTIL_LINKS } from '@modules/home/utils/constants';
import Image from 'next/image';

type TestimonialsProps = {
  messages: HomePageData;
};

const Testimonials: React.FC<TestimonialsProps> = ({ messages }) => {
  return (
    <section className="relative bg-accent testimonials">
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>
      <div
        className="hidden md:inline absolute left-1/2 transform translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <Image src="/detrash-icon.svg" alt="detrash" width="500" height="500" />
      </div>
      <div id="recytoken" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-12 ">
            <h2 className="h2 mb-4 text-white">{messages.testimonialsTitle}</h2>
            <p className="text-xl text-gray-200" data-aos="zoom-y-out">
              {messages.testimonialsSubTitle}
            </p>
          </div>
          <div
            className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="300"
          >
            <a
              className="btn btn-primary text-white w-full mb-4 sm:w-auto sm:mb-0"
              href={UTIL_LINKS.BUY_RECY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {messages.testimonialsButton1}
            </a>
            <a
              className="btn btn-neutral  text-white w-full sm:w-auto sm:ml-4"
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

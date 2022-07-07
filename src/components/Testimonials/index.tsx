import Image from 'next/image';
import React from 'react';

const Testimonials: React.FC = () => {
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
            <h2 className="h2 mb-4 text-white">Buy RECY token</h2>
            <p className="text-xl text-gray-400" data-aos="zoom-y-out">
              The first token to tackle the pollution of oceans and rivers at
              its source. A solution that integrates scalability, transparency
              and financial efficiency to protect our rivers and oceans. By
              purchasing RECY Tokens, you are directing currency inflow to
              prevent over 8 millions tons of waste geting to our rivers and
              oceans.
            </p>
          </div>
          <div
            className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="300"
          >
            <a
              className="btn btn-primary text-white w-full mb-4 sm:w-auto sm:mb-0"
              href="#0"
            >
              More on it
            </a>
            <a
              className="btn btn-neutral  text-white w-full sm:w-auto sm:ml-4"
              href="#0"
            >
              Manifest / Whitepaper
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

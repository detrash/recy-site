const FeaturesHome: React.FC = () => {
  return (
    <section className="relative bg-gray-100">
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4 text-neutral">The problem</h1>
            <p className="text-xl text-gray-600">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur excepteur sint occaecat
              cupidatat.
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
                    of the waste generated is recycled.
                  </span>
                </div>
                <div>
                  <h2 className="h2">300mi+</h2>
                  <span className="text-xl text-gray-600 ">
                    tons of trash estimately are on our ocean today.
                  </span>
                </div>

                <div>
                  <h2 className="h2">100kg</h2>
                  <span className="text-xl text-gray-600 ">
                    eah person generates of plastic waste per year on average.
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
                      src="https://static.wixstatic.com/media/0b340f_0ccd83bde94e44ee9a21e3f020ed01bb~mv2_d_2057_2669_s_2.jpg/v1/fill/w_453,h_540,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/0b340f_0ccd83bde94e44ee9a21e3f020ed01bb~mv2_d_2057_2669_s_2.jpg"
                      width="350"
                      height="462"
                      alt="Features bg"
                    />
                  </picture>
                  <picture>
                    <img
                      className="md:max-w-none absolute top-2 border-8 border-white rounded"
                      src="https://static.wixstatic.com/media/815913_b4c95ed76b7747b3a691d17af2d01406~mv2.jpg/v1/fill/w_452,h_540,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/815913_b4c95ed76b7747b3a691d17af2d01406~mv2.jpg"
                      width="150"
                      height="44"
                      alt="Element"
                    />
                  </picture>
                  <picture>
                    <img
                      className="md:max-w-none absolute right-0 -bottom-8 border-8 border-white rounded"
                      src="https://static.wixstatic.com/media/0b340f_d83f5daf7f554d9e866f606b5ac953ca~mv2_d_1819_2655_s_2.jpg/v1/fill/w_453,h_540,fp_0.74_0.61,q_80,usm_0.66_1.00_0.01,enc_auto/0b340f_d83f5daf7f554d9e866f606b5ac953ca~mv2_d_1819_2655_s_2.jpg"
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

export default FeaturesHome;

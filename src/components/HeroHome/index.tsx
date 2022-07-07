const HeroHome: React.FC = () => {
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
              Tokens to clean
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                the world
              </p>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Let&apos;s end waste pollution at its source. Let&apos;s
                transform how we think about trash and recycling.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <button
                  className="btn btn-primary text-white  w-full mb-4 sm:w-auto sm:mb-0"
                  onClick={() => scrollSmoothTo('recytoken')}
                >
                  Get to know us
                </button>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;

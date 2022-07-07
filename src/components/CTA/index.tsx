const CTA: React.FC = () => {
  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-8">
            <h2 className="h2 mb-4 text-neutral">
              RECY tokens are an efficient solution
            </h2>
            <p className="text-xl text-gray-600" data-aos="zoom-y-out">
              A RECY Token represents a kg of waste that had a sustainable
              destination. RECY TOKEN sales supports waste recycling and
              collecting projects.
            </p>
            <p
              className="text-xl text-blue-400 font-bold mt-4"
              data-aos="zoom-y-out"
            >
              RECYs are minted in an auditable and transparent way.
            </p>
          </div>

          <div
            className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="300"
          >
            <button className="btn btn-primary no-animation text-white  w-full mb-4 sm:w-auto sm:mb-0">
              BUY RECY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

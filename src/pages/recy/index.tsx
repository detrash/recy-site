import Image from 'next/image';
import RecyLogo from '@public/recy-logo.png';
import Link from 'next/link';
import { UTIL_LINKS } from '@src/utils/constants';

const RecyPage: React.FC = () => {
  return (
    <main className="flex-grow">
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-4">
              <h2 className="h2 mb-4">What is RECY?</h2>
              <p className="text-xl text-gray-600">
                A cRECY Token represents a kg of waste that had a sustainable
                destination.
              </p>
              <p className="text-xl text-gray-600 mb-4">
                cRECY TOKEN sales supports waste recycling and collecting
                projects.
              </p>
              <p
                className="text-xl text-blue-400 font-bold"
                data-aos="zoom-y-out"
              >
                RECYs are minted in an auditable and transparent way.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <a
                href={UTIL_LINKS.DETRASH_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={RecyLogo} alt="RECY token logo" />
              </a>

              <div className="my-4 mx-auto md:flex md:gap-3">
                <a
                  className="btn btn-primary w-full md:w-auto text-white mb-3 md:mb-0"
                  data-aos="zoom-y-out"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={UTIL_LINKS.TOKEN_CONTRACT_URL}
                >
                  Token Contract
                </a>
                <a
                  className="btn btn-neutral text-white w-full mb-4 md:w-auto md:mb-0"
                  data-aos="zoom-y-out"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={UTIL_LINKS.WHITEPAPER_URL}
                >
                  Manifest / Whitepaper
                </a>
              </div>

              <Link href="/">
                <button
                  data-aos="zoom-y-out"
                  className="btn btn-outline border border-neutral shadow-none w-full md:w-auto"
                >
                  How to add cRECY to Trust Wallet
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 pb-8 md:pb-16 mb-3">
        <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-12 md:pt-20">
            <div className="max-w-3xl mx-auto text-center pb-12">
              <h1 className="h2 mb-4 text-neutral">
                Acquiring cRECY is making the world cleaner.
              </h1>
              <p className="text-xl text-gray-600" data-aos="zoom-y-out">
                Our world needs a crypto solution.
              </p>
            </div>

            <div className=" flex items-center justify-center">
              <a
                href={UTIL_LINKS.BUY_RECY_URL}
                className="btn btn-primary w-full md:w-auto text-white mb-3 md:mb-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy cRecy Here
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecyPage;

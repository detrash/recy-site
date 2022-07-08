import Image from 'next/image';
import RoadMapImage from '@public/assets/roadmap.webp';

const RoadMap: React.FC = () => {
  return (
    <main className="flex-grow">
      <section className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-4">
              <h2 className="h2 mb-4">DeTrash has a plan to a clean world</h2>
              <p className="text-xl text-gray-600 mb-4">
                We have started with the first token for keeping the world
                clean, RECY Token. But we aim to go beyond to transform how we
                can maintain our world clean in a more descentralized,
                transparent and eficient way.
              </p>
              <p className="text-xl text-gray-600 mb-4">
                Below you can have a first glinpse of where we are going from
                creating RECY to developing a DeFi platform to waste collection
                and global cleaning where everyone can log in to our DApp and
                fulfill your role on cleaning the world while receiving tokens
                and stablecoins for it.
              </p>
              <p
                className="text-xl text-blue-400 font-bold"
                data-aos="zoom-y-out"
              >
                Let&apos;s clean the world together!
              </p>
            </div>

            <div className="flex mt-4 flex-col items-center justify-center">
              <Image src={RoadMapImage} alt="RoadMap" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RoadMap;

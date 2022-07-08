import Image, { StaticImageData } from 'next/image';
import PhilippPhoto from '@public/assets/phil.webp';
import BeatrizPhoto from '@public/assets/beatriz.webp';
import MatheusPhoto from '@public/assets/matheus.webp';

type AvatarCardProps = {
  avatar: StaticImageData;
  description: string;
  jobPosition: string;
};

const Team: React.FC = () => {
  return (
    <main className="flex-grow">
      <section className="relative">
        <div
          className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-accent pointer-events-none"
          aria-hidden="true"
        ></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-4">
              <h2 className="h2 mb-4">Meet the team</h2>
            </div>

            <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
              <AvatarCard
                avatar={PhilippPhoto}
                jobPosition="FOUNDER"
                description="Entrepeneur at heart, Phil was born by the ocean and has
                  always relied on it to live well. After a carreer at rapid
                  growth startups, Phil searched for a problem close to its
                  heart to solve and created both DeTrash and RECY to clean the
                  ocean and the world."
              />
              <AvatarCard
                avatar={BeatrizPhoto}
                jobPosition="DEV & CO-FOUNDER"
                description="Bia Siqueira began her career in scientific initiation in optical forces and nanowires at the Physics Institute of Unicamp, moving on to programming and reaching the position of specialist.

                Migrated to Solidity, as a specialist in Blockchain development and leader in web 3.0 organizations.
                
                At DeTrash, Bia is our Founder Dev and responsible for deciding and executing development planning and managing our development team."
              />
              <AvatarCard
                avatar={MatheusPhoto}
                jobPosition="COO"
                description="After a significant career in the automotive industry optimizing processes and applying tools focused on strategic planning, Matheus felt the need to build something new and joined our mission. Matheus is the COO who always seeks to improve processes, contribute to the development of strategic planning and drive sales of DeTrash's crypto assets, starting with our dear RECY Token."
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const AvatarCard: React.FC<AvatarCardProps> = ({
  avatar,
  description,
  jobPosition,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-5 p-6 pt-12 bg-white rounded shadow-xl z-10">
      <div className="relative w-44 h-44 rounded-full shadow-xl">
        <div className="absolute -inset-1 bg-neutral rounded-full"></div>
        <Image
          src={avatar}
          className="rounded-full mt-4"
          layout="fill"
          objectFit="cover"
          alt="Phil"
        />
      </div>
      <p
        className="text-xl font-bold leading-snug tracking-tight"
        data-aos="zoom-y-out"
        data-aos-delay="150"
      >
        {jobPosition}
      </p>
      <p
        className="text-center text-gray-600"
        data-aos="zoom-y-out"
        data-aos-delay="300"
      >
        {description}
      </p>
    </div>
  );
};

export default Team;

import Image from 'next/image';
import { RiLinkedinBoxFill } from 'react-icons/ri';

type CompactAvatarCardProps = {
  avatar: string;
  name: string;
  jobPosition: string;
  linkedInUrl: string;
};

export const CompactAvatarCard: React.FC<CompactAvatarCardProps> = ({
  avatar,
  jobPosition,
  linkedInUrl,
  name,
}) => {
  return (
    <div className="flex rounded-2xl bg-base-100 shadow-xl overflow-hidden z-20 border sm:duration-300 sm:hover:scale-105">
      <div className="relative w-20 h-auto">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-teal-400 border-r"></div>
        <Image
          src={avatar}
          className=""
          layout="fill"
          objectFit="cover"
          alt="Movie"
        />
      </div>
      <div className="flex flex-1 justify-between px-6 py-7">
        <div>
          <p
            className="text-xs sm:text-sm leading-tighter tracking-wider text-blue-500 font-semibold"
            data-aos="fade-right"
            data-aos-delay="150"
          >
            {jobPosition}
          </p>
          <h2
            className="font-bold text-base sm:text-lg tracking-wider"
            data-aos="fade-right"
            data-aos-delay="350"
          >
            {name}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-150"
          >
            <RiLinkedinBoxFill className="h-10 w-10 text-primary-darker" />
          </a>
        </div>
      </div>
    </div>
  );
};

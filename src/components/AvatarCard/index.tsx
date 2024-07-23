import Image from 'next/image';
import {
  RiGithubFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiTwitterFill,
} from 'react-icons/ri';

type AvatarCardProps = {
  avatar: string;
  description: string;
  name: string;
  jobPosition: string;
  linkedInUrl: string;
  githubUrl: string;
  instagramUrl: string;
  twitterUrl: string;
};

const AvatarCard: React.FC<AvatarCardProps> = ({
  avatar,
  description,
  name,
  jobPosition,
  linkedInUrl,
  githubUrl,
  instagramUrl,
  twitterUrl,
}) => {
  const socialMediaItems = [
    {
      url: linkedInUrl,
      icon: <RiLinkedinBoxFill className="h-8 w-8 text-white" />,
    },

    {
      url: instagramUrl,
      icon: <RiInstagramLine className="h-8 w-8 text-white" />,
    },

    {
      url: githubUrl,
      icon: <RiGithubFill className="h-8 w-8 text-white" />,
    },

    {
      url: twitterUrl,
      icon: <RiTwitterFill className="h-8 w-8 text-white" />,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-start h-full gap-y-5 p-6 pt-12 bg-white rounded shadow-xl z-10">
      <div className="relative w-44 h-44 ">
        <div className="absolute -inset-1 border rounded-full"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"></div>
        <Image
          src={avatar}
          className="rounded-full "
          layout="fill"
          alt={name}
        />
      </div>

      <div className="text-center">
        <p
          className="text-xl font-bold leading-snug tracking-tight"
          data-aos="zoom-y-out"
          data-aos-delay="150"
        >
          {name}
        </p>
        <p
          className="text-lg leading-relaxed tracking-wider text-violet-600"
          data-aos="zoom-y-out"
          data-aos-delay="150"
        >
          {jobPosition}
        </p>
      </div>
      <p
        className="text-justify text-gray-600"
        data-aos="zoom-y-out"
        data-aos-delay="300"
      >
        {description}
      </p>

      <div className="flex items-center mt-auto gap-3">
        {socialMediaItems.map((socialMediaItem, index) => {
          if (socialMediaItem.url) {
            return (
              <a
                key={index}
                href={socialMediaItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 rounded-full shadow-xl flex items-center justify-center bg-primary hover:bg-primary-darker transition-colors duration-150"
              >
                {socialMediaItem.icon}
              </a>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default AvatarCard;

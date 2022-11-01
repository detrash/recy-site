import Image from 'next/image';
import Link from 'next/link';
import CreateFormLogo from 'public/create-form.jpg';
import { ProfileType } from 'src/graphql/generated/graphql';
import { APP_NAV_LINKS } from 'src/utils/navLinks';

type SubmitFormCardProps = {
  userProfileType: ProfileType;
  title: string;
  description: string;
  buttonLabel: string;
  notAllowedLabel: string;
};

const SubmitFormCard: React.FC<SubmitFormCardProps> = ({
  userProfileType,
  buttonLabel,
  description,
  notAllowedLabel,
  title,
}) => {
  return (
    <div className="py-4 px-6 bg-white shadow rounded-md flex flex-col gap-3 col-span-6 sm:col-span-2">
      <div>
        <h2 className="text-xl tracking-wide leading-relaxed font-bold">
          {title}
        </h2>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <Image src={CreateFormLogo} alt="create form" />
      <div className="text-center">
        {userProfileType !== ProfileType.Hodler ? (
          <Link href={APP_NAV_LINKS.SUBMIT_FORM}>
            <a className="btn btn-primary text-white w-full sm:w-auto text-center">
              {buttonLabel}
            </a>
          </Link>
        ) : (
          <p className="text-sm">{notAllowedLabel}</p>
        )}
      </div>
    </div>
  );
};

export default SubmitFormCard;

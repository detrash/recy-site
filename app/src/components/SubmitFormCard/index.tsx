import Image from 'next/image';
import Link from 'next/link';
import CreateFormLogo from 'public/create-form.jpg';
import { ProfileType } from 'src/graphql/generated/graphql';
import { APP_NAV_LINKS } from 'src/utils/navLinks';

type SubmitFormCardProps = {
  userProfileType: ProfileType;
};

const SubmitFormCard: React.FC<SubmitFormCardProps> = ({ userProfileType }) => {
  return (
    <div className="py-4 px-6 bg-white shadow rounded-md flex flex-col gap-3 col-span-6 sm:col-span-2">
      <div>
        <h2 className="text-xl tracking-wide leading-relaxed font-bold">
          Submit your report
        </h2>
        <p className="text-sm text-gray-400">
          Submit a form and earn some cRECYS!
        </p>
      </div>
      <Image src={CreateFormLogo} alt="create form" />
      <div className="text-center">
        {userProfileType !== ProfileType.Hodler ? (
          <Link href={APP_NAV_LINKS.SUBMIT_FORM}>
            <a className="btn btn-primary text-white w-full sm:w-auto text-center">
              Submit
            </a>
          </Link>
        ) : (
          <p className="text-sm">You can&apos;t submit a form being a Hodler</p>
        )}
      </div>
    </div>
  );
};

export default SubmitFormCard;

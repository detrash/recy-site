import { useFormContext } from '@modules/app/context/formContext';
import { ProfileType } from '@modules/app/graphql/generated/graphql';
import { FORM_STEPS } from '@modules/app/utils/constants';
import { APP_NAV_LINKS } from '@modules/app/utils/navLinks';
import CreateFormLogo from '@public/create-form.jpg';
import Image from 'next/image';
import { useRouter } from 'next/router';

type SubmitFormCardProps = {
  userProfileType: ProfileType;
};

const SubmitFormCard: React.FC<SubmitFormCardProps> = ({ userProfileType }) => {
  const { setFormStep } = useFormContext();
  const router = useRouter();

  const handleCreateSubmitForm = () => {
    setFormStep(FORM_STEPS.wasteDefinitions);

    router.push(APP_NAV_LINKS.SUBMIT_FORM);
  };

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
          <button
            className="btn btn-primary text-white w-full sm:w-auto text-center"
            onClick={handleCreateSubmitForm}
          >
            Submit
          </button>
        ) : (
          <p className="text-sm">You can&apos;t submit a form being a Hodler</p>
        )}
      </div>
    </div>
  );
};

export default SubmitFormCard;

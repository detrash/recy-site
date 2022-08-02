import Image from 'next/image';
import RecyLogo from '@public/recy-logo.png';
import { useFormContext } from '@modules/app/context/formContext';
import { FORM_STEPS } from '@modules/app/utils/constants';

const WelcomeForm: React.FC = () => {
  const { setFormStep } = useFormContext();

  return (
    <div className="flex flex-col flex-1 justify-between">
      <section>
        <h3 className="text-primary text-sm font-bold uppercase leading-5 tracking-[0.05em]">
          HELLO IAGO CHAVES,
        </h3>
        <h2 className="text-2xl sm:text-3xl text-gray-800 font-bold antialiased leading-relaxed">
          Welcome to Recy App
        </h2>
      </section>

      <div className="flex flex-col items-center">
        <picture className="w-72 h-72 sm:w-96 sm:h-96">
          <Image src={RecyLogo} objectFit="cover" alt="RECY token logo" />
        </picture>

        <p className="text-base text-center leading-relaxed">
          Keeping the world clean.
        </p>
        <p className="text-base text-center leading-relaxed">Together</p>
      </div>

      <div className="flex pt-5 items-end justify-center">
        <button
          className="btn btn-primary text-white no-animation w-full sm:w-auto"
          onClick={() => setFormStep(FORM_STEPS.profile)}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeForm;

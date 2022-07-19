import FormLayout from '@modules/app/layout/FormLayout';
import {
  USER_ROLE_TYPES,
  USER_WASTE_TYPES,
} from '@modules/app/utils/constants';
import GroupCheckbox from '@shared/components/GroupCheckbox';
import Radio from '@shared/components/Radio';
import { useState } from 'react';

const RegisterType: React.FC = () => {
  const [profileInfo, setProfileInfo] = useState('');
  const [wasteTypes, setWasteTypes] = useState<string[]>([]);
  return (
    <FormLayout>
      <div className="flex flex-col flex-1 justify-between">
        <section>
          <h2 className="text-2xl sm:text-3xl mb-1 text-gray-800 font-bold antialiased leading-relaxed">
            Recy Form Submission
          </h2>
          <p className="text-sm text-gray-600">
            Here is where you show how you are keeping our world clean and get
            some cRECYS.
          </p>
          <p className="text-sm text-gray-600">
            Remember to fill the form with care. We are a reputation based
            system.
          </p>
        </section>

        <section>
          <h2 className="text-sm pb-1 uppercase font-bold mb-4 border-b-[1px] ">
            Select your profile type:
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {USER_ROLE_TYPES.map((userType) => (
              <Radio
                key={userType}
                setValue={setProfileInfo}
                value={userType}
                isActive={userType === profileInfo}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm pb-1 uppercase font-bold mb-4 border-b-[1px] ">
            What kinds of waste are you reporting today?
          </h2>
          <div className="grid grid-cols-6 gap-3">
            <GroupCheckbox
              items={USER_WASTE_TYPES}
              setValues={setWasteTypes}
              values={wasteTypes}
              checkboxClassName="col-span-3"
            />
          </div>
        </section>

        <div className="flex items-end justify-center">
          <button className="btn btn-primary text-white no-animation w-full sm:w-auto">
            Get Started
          </button>
        </div>
      </div>
    </FormLayout>
  );
};

export default RegisterType;

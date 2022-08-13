import StackedStats from '@modules/app/components/StackedStats';
import CreateFormLogo from '@public/create-form.jpg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Article, Coin, Users } from 'phosphor-react';
import { useMemo } from 'react';
import ActiveUsersTable from '../components/withTable/ActiveUsersTable';
import AggregateUsersTypeTable from '../components/withTable/AggregateUsersTypeTable';
import { useFormContext } from '../context/formContext';
import {
  ProfileType,
  useFormsQuery,
  useUsersQuery,
} from '../graphql/generated/graphql';
import { FORM_STEPS } from '../utils/constants';
import { APP_NAV_LINKS } from '../utils/navLinks';

type PrivatePanelProps = {
  userProfileType: ProfileType;
};

const AdminPanel: React.FC<PrivatePanelProps> = ({ userProfileType }) => {
  const { setFormStep } = useFormContext();
  const { data: usersData, loading: isUsersLoading, error } = useUsersQuery();
  const { data: formsData } = useFormsQuery();

  const router = useRouter();

  const users = useMemo(() => {
    const totalUsers = usersData?.users;
    const totalForms = formsData?.forms;
    return [
      {
        icon: Users,
        label: 'Total Active Users',
        value: String(totalUsers?.length),
      },
      {
        icon: Article,
        label: 'Total Forms Submitted',
        value: String(totalForms?.length),
      },
      {
        icon: Coin,
        label: 'Total cRECY Distributed',
        value: '0',
      },
    ];
  }, [formsData?.forms, usersData?.users]);

  const handleCreateSubmitForm = () => {
    setFormStep(FORM_STEPS.wasteDefinitions);

    router.push(APP_NAV_LINKS.SUBMIT_FORM);
  };

  return (
    <div className="flex flex-col gap-3">
      <StackedStats isLoading={isUsersLoading} stats={users} />
      <div className="grid grid-cols-6 gap-3">
        <div className="py-4 px-6 bg-white shadow rounded-md flex-1 col-span-6 sm:col-span-4">
          <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-8">
            Total residues reported by user profile
          </h2>
          <AggregateUsersTypeTable />
        </div>

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
              <p className="text-sm">
                You can&apos;t submit a form being a Hodler
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="py-4 px-6 bg-white shadow rounded-md flex-1">
        <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-8">
          Active users
        </h2>
        <ActiveUsersTable
          hasError={!!error}
          isLoading={isUsersLoading}
          users={usersData?.users}
        />
      </div>
    </div>
  );
};

export default AdminPanel;

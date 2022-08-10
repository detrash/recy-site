import StackedStats from '@modules/app/components/StackedStats';
import CreateFormLogo from '@public/create-form.jpg';
import Image from 'next/image';
import { Article, Coin, Users } from 'phosphor-react';
import { useMemo } from 'react';
import ActiveUsersTable from '../components/withTable/ActiveUsersTable';
import { useFormsQuery, useUsersQuery } from '../graphql/generated/graphql';

const PrivatePanel: React.FC = () => {
  const { data: usersData, loading: isUsersLoading, error } = useUsersQuery();
  const { data: formsData, loading: isFormsLoading } = useFormsQuery();

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

  return (
    <div className="flex flex-col gap-3">
      <StackedStats isLoading={isUsersLoading} stats={users} />
      <div className="flex flex-col md:items-start gap-3 md:flex-row">
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

        <div className="py-4 px-6 bg-white shadow rounded-md flex flex-col gap-3 w-full md:w-96 md:min-w-48">
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
            <button className="btn btn-primary text-white w-full sm:w-auto text-center">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivatePanel;

import StackedStats from '@modules/app/components/StackedStats';
import { Article, Coin, Users } from 'phosphor-react';
import { useMemo } from 'react';
import ActiveUsersTable from '../components/withTable/ActiveUsersTable';
import { useUsersQuery } from '../graphql/generated/graphql';

const PrivatePanel: React.FC = () => {
  const { data: usersData, loading: isUsersLoading, error } = useUsersQuery();

  const users = useMemo(() => {
    const totalUsers = usersData?.users;
    return [
      {
        icon: Users,
        label: 'Total Active Users',
        value: String(totalUsers?.length),
      },
      {
        icon: Article,
        label: 'Total Forms Submitted',
        value: '20k',
      },
      {
        icon: Coin,
        label: 'Total cRECY Distributed',
        value: '300M',
      },
    ];
  }, [usersData?.users]);

  return (
    <div className="flex flex-col gap-3">
      <StackedStats isLoading={isUsersLoading} stats={users} />
      <div className="grid grid-cols-6 gap-3">
        <div className="py-4 px-6 bg-white shadow rounded-md col-span-6 sm:col-span-3">
          <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-8">
            Active users
          </h2>
          <ActiveUsersTable
            hasError={!!error}
            isLoading={isUsersLoading}
            users={usersData?.users}
          />
        </div>

        <div className="py-4 px-6 bg-white shadow rounded-md col-span-6 sm:col-span-3">
          <h2 className="text-xl tracking-wide leading-relaxed font-bold">
            Active users
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PrivatePanel;

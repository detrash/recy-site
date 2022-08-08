import StackedStats from '@modules/app/components/StackedStats';
import { Users, Article, Coin } from 'phosphor-react';
import { useMemo } from 'react';
import { useUsersQuery } from '../graphql/generated/graphql';

const PrivatePanel: React.FC = () => {
  const { data: usersData, loading: isUsersLoading } = useUsersQuery();

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
          <h2 className="text-xl tracking-wide leading-relaxed font-bold">
            Active users
          </h2>
          <Table />
        </div>

        <div className="py-4 px-6 bg-white shadow rounded-md col-span-6 sm:col-span-3">
          <h2 className="text-xl tracking-wide leading-relaxed font-bold">
            Active users
          </h2>
          <Table />
        </div>
      </div>
    </div>
  );
};

const Table = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="bg-white border-b pb-1 text-gray-500 relative">
              Name
            </th>
            <th className="bg-white border-b pb-1 text-gray-500 relative">
              Job
            </th>
            <th className="bg-white border-b pb-1 text-gray-500 relative">
              Job
            </th>
            <th className="bg-white border-b pb-1 text-gray-500 relative">
              Job
            </th>
            <th className="bg-white border-b pb-1 text-gray-500 relative">
              Favorite Color
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-0">Cy Ganderton</td>
            <td className="border-0">Quality Control Specialist</td>
            <td className="border-0">Blue</td>
          </tr>
          <tr>
            <td className="border-0">Hart Hagerty</td>
            <td className="border-0">Desktop Support Technician</td>
            <td className="border-0">Purple</td>
          </tr>
          <tr>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrivatePanel;

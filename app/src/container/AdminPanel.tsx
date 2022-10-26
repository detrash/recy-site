import { Article, Coin, Users } from 'phosphor-react';

import { useMemo } from 'react';
import StackedStats from 'src/components/StackedStats';
import AuthorizedFormsTable from 'src/components/withTable/AuthorizedFormsTable';
import SubmitFormCard from '../components/SubmitFormCard';
import ActiveUsersTable from '../components/withTable/ActiveUsersTable';
import AggregateUsersTypeTable from '../components/withTable/AggregateUsersTypeTable';
import {
  ProfileType,
  useFormsQuery,
  useUsersQuery,
} from '../graphql/generated/graphql';

type PrivatePanelProps = {
  userProfileType: ProfileType;
};

const AdminPanel: React.FC<PrivatePanelProps> = ({ userProfileType }) => {
  const {
    data: usersData,
    loading: isUsersLoading,
    error: hasUsersError,
  } = useUsersQuery();
  const {
    data: formsData,
    loading: isFormsLoading,
    error: hasFormsError,
  } = useFormsQuery();

  const users = useMemo(() => {
    const totalUsers = usersData?.users;
    const totalForms = formsData?.forms;
    return [
      {
        id: 'USERS',
        icon: Users,
        label: 'Total Active Users',
        value: String(totalUsers?.length),
      },
      {
        id: 'FORMS',
        icon: Article,
        label: 'Total Forms Submitted',
        value: String(totalForms?.length),
      },
      {
        id: 'CRECY',
        icon: Coin,
        label: 'Total cRECY Distributed',
        value: '0',
      },
    ];
  }, [formsData?.forms, usersData?.users]);

  return (
    <div className="flex flex-col gap-3">
      <StackedStats isLoading={isUsersLoading} stats={users} />
      <div className="grid grid-cols-6 gap-3">
        <div className="py-4 px-6 bg-white shadow rounded-md flex-1 col-span-6 sm:col-span-4">
          <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-8">
            Issued forms
          </h2>
          <AuthorizedFormsTable
            forms={formsData?.forms}
            isLoading={isFormsLoading}
            hasError={!!hasFormsError}
          />
        </div>

        <SubmitFormCard userProfileType={userProfileType} />
      </div>
      <div className="py-4 px-6 bg-white shadow rounded-md flex-1">
        <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-8">
          Active users
        </h2>
        <ActiveUsersTable
          hasError={!!hasUsersError}
          isLoading={isUsersLoading}
          users={usersData?.users}
        />
      </div>
      <div className="py-4 px-6 bg-white shadow rounded-md flex-1">
        <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-8">
          Total residues reported by user profile
        </h2>
        <AggregateUsersTypeTable />
      </div>
    </div>
  );
};

export default AdminPanel;

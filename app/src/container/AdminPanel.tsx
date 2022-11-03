import { useTranslation } from 'next-i18next';
import { Article, Users } from 'phosphor-react';

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
  const { t } = useTranslation();

  const {
    data: usersData,
    loading: isUsersLoading,
    error: hasUsersError,
  } = useUsersQuery();
  const {
    data: formsData,
    loading: isFormsLoading,
    error: hasFormsError,
  } = useFormsQuery({
    fetchPolicy: 'cache-and-network',
  });

  const users = useMemo(() => {
    const totalUsers = usersData?.users;

    const totalForms = formsData?.forms;
    return [
      {
        id: 'USERS',
        icon: Users,
        label: t('admin:total_active_users'),
        value: String(totalUsers?.length),
      },
      {
        id: 'FORMS',
        icon: Article,
        label: t('admin:total_forms_submitted'),
        value: String(totalForms?.length),
      },
    ];
  }, [formsData?.forms, t, usersData?.users]);

  return (
    <div className="flex flex-col gap-3">
      <StackedStats isLoading={isUsersLoading} stats={users} />
      <div className="grid grid-cols-6 gap-3">
        <div className="py-4 px-6 bg-white shadow rounded-md flex-1 col-span-6 sm:col-span-4">
          <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-8">
            {t('admin:issued_by')}
          </h2>
          <AuthorizedFormsTable
            forms={formsData?.forms}
            isLoading={isFormsLoading}
            hasError={!!hasFormsError}
          />
        </div>

        <SubmitFormCard
          userProfileType={userProfileType}
          buttonLabel={t('common:submit_report_button')}
          description={t('common:submit_report_description')}
          notAllowedLabel={t('common:not_allowed_submit_form')}
          title={t('common:submit_report_title')}
        />
      </div>
      <div className="py-4 px-6 bg-white shadow rounded-md flex-1">
        <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-8">
          {t('admin:active_users')}
        </h2>
        <ActiveUsersTable
          hasError={!!hasUsersError}
          isLoading={isUsersLoading}
          users={usersData?.users}
        />
      </div>
      <div className="py-4 px-6 bg-white shadow rounded-md flex-1">
        <h2 className="text-xl sm:text-2xl tracking-wide leading-relaxed font-bold mb-8">
          {t('admin:total_residues_reported_user')}
        </h2>
        <AggregateUsersTypeTable />
      </div>
    </div>
  );
};

export default AdminPanel;

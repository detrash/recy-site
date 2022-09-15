import { useEffect, useState } from 'react';
import DashboardHeader from 'src/components/Header';
import UserPanel from 'src/container/UserPanel';
import { usePageLoader } from 'src/hooks/usePageLoader';
import { withPrivateApollo } from 'src/lib/withPrivateApollo';
import { getAdminAccess } from 'src/utils/getAdminAccess';

const AppHome: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { isLoading, data } = usePageLoader({ pageType: 'Dashboard' });

  useEffect(() => {
    if (data) {
      setIsAdmin(getAdminAccess(data));
    }
  }, [data]);

  return (
    <main className="flex flex-col min-h-screen">
      <DashboardHeader
        userProfileType={data?.me.profileType!}
        isAdmin={isAdmin}
      />
      <section className="flex-grow py-6 sm:py-12 bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8">
          <UserPanel user={data} isLoading={isLoading} />
        </div>
      </section>
    </main>
  );
};

export default withPrivateApollo(AppHome);

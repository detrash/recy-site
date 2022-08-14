import DashboardHeader from '@modules/app/components/Header';
import AdminPanel from '@modules/app/container/AdminPanel';
import { MeQuery } from '@modules/app/graphql/generated/graphql';
import { userSSRMethods } from '@modules/app/utils/userSSRMethods';
import { withPrivateApollo } from '@shared/lib/withPrivateApollo';

interface AdminHomeProps {
  isAdmin: boolean;
  data: MeQuery;
}

const AdminHome: React.FC<AdminHomeProps> = ({ data, isAdmin }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <DashboardHeader isAdmin={isAdmin} />
      <section className="flex-grow py-6 sm:py-12 bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8">
          <AdminPanel userProfileType={data?.me.profileType!} />
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps = userSSRMethods.checkAdminAccess;

export default withPrivateApollo(AdminHome as any);

import DashboardHeader from 'src/components/Header';
import AdminPanel from 'src/container/AdminPanel';
import { MeQuery } from 'src/graphql/generated/graphql';
import { userSSRMethods } from 'src/utils/userSSRMethods';

interface AdminHomeProps {
  isAdmin: boolean;
  data: MeQuery;
}

const AdminHome: React.FC<AdminHomeProps> = ({ data, isAdmin }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <DashboardHeader
        userProfileType={data.me.profileType}
        isAdmin={isAdmin}
      />
      <section className="flex-grow py-6 sm:py-12 bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8">
          <AdminPanel userProfileType={data?.me.profileType!} />
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps = userSSRMethods.checkAdminAccess;

export default AdminHome;

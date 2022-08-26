import DashboardHeader from 'src/components/Header';
import UserPanel from 'src/container/UserPanel';
import { PageMeComp } from 'src/graphql/generated/page';
import { withPrivateApollo } from 'src/lib/withPrivateApollo';
import { getAdminAccess } from 'src/utils/getAdminAccess';
import { userSSRMethods } from 'src/utils/userSSRMethods';

const AppHome: PageMeComp = ({ data }) => {
  const isAdmin = getAdminAccess(data!);

  return (
    <main className="flex flex-col min-h-screen">
      <DashboardHeader
        userProfileType={data?.me.profileType!}
        isAdmin={isAdmin}
      />
      <section className="flex-grow py-6 sm:py-12 bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8">
          <UserPanel user={data} />
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps = userSSRMethods.checkUserAccess;

export default withPrivateApollo(AppHome);

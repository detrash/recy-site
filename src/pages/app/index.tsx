import DashboardHeader from '@modules/app/components/Header';
import UserPanel from '@modules/app/container/UserPanel';
import { PageMeComp } from '@modules/app/graphql/generated/page';
import { PERMISSION_SCOPES, Role } from '@modules/app/utils/constants';
import { userSSRMethods } from '@modules/app/utils/userSSRMethods';
import { withPrivateApollo } from '@shared/lib/withPrivateApollo';
import { useMemo } from 'react';

const AppHome: PageMeComp = ({ data }) => {
  const isAdmin = useMemo(() => {
    const permissions = data?.me?.permissions;

    if (permissions?.length) {
      return PERMISSION_SCOPES[Role.Admin].every((roleProp) =>
        permissions.some((permission) => permission.type === roleProp)
      );
    }

    return false;
  }, [data?.me?.permissions]);

  return (
    <main className="flex flex-col min-h-screen">
      <DashboardHeader />
      <section className="flex-grow py-6 sm:py-12 bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8">
          <UserPanel user={data} />
          {/* {isAdmin ? (
            <AdminPanel userProfileType={data?.me.profileType!} />
          ) : (
            <UserPanel user={data!} />
          )} */}
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps = userSSRMethods.checkUserAccess;

export default withPrivateApollo(AppHome);

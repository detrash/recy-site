import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from '@auth0/nextjs-auth0';
import DashboardHeader from '@modules/app/components/Header';
import PrivatePanel from '@modules/app/container/PrivatePanel';
import { PageMeComp } from '@modules/app/graphql/generated/page';
import { getMeServerQuery } from '@modules/app/graphql/ssrQueries';
import { PERMISSION_SCOPES, Role } from '@modules/app/utils/constants';
import { withPrivateApollo } from '@shared/lib/withPrivateApollo';
import { useMemo } from 'react';

const AppHome: PageMeComp = ({ data }) => {
  const user = useUser();
  console.log(data);

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
          {isAdmin ? <PrivatePanel /> : <h2>User non admin panel</h2>}
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { accessToken } = await getAccessToken(req, res);
    const user = await getMeServerQuery(accessToken!);
    if (!user) {
      return {
        redirect: {
          destination: '/app/onboarding',
          permanent: false,
        },
      };
    }

    return {
      props: user.data,
    };
  },
});

export default withPrivateApollo(AppHome);

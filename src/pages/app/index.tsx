import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from '@auth0/nextjs-auth0';
import DashboardHeader from '@modules/app/components/Header';
import { PageMeComp } from '@modules/app/graphql/generated/page';
import { getMeServerQuery } from '@modules/app/graphql/ssrQueries';
import { withPrivateApollo } from '@shared/lib/withPrivateApollo';

const AppHome: PageMeComp = ({ data }) => {
  const user = useUser();
  return (
    <>
      <DashboardHeader />
      <h1>{JSON.stringify(user, null, 2)}</h1>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { accessToken } = await getAccessToken(req, res);
    const user = await getMeServerQuery(accessToken!);
    console.log(user);
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

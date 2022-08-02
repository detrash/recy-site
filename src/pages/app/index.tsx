import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { ssrMe } from '@modules/app/graphql/generated/page';
import { getMeServerQuery } from '@modules/app/graphql/ssrQueries';
import { withPrivateApollo } from '@shared/lib/withPrivateApollo';

type AppHomeProps = {
  authUserId: string;
  profileType: string;
};

const AppHome: React.FC = () => {
  return <h1>DASHBOARD</h1>;
};

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/app',
  async getServerSideProps({ req, res }) {
    const { accessToken } = await getAccessToken(req, res);
    const user = await getMeServerQuery(accessToken!);
    console.log('user', user);

    if (!user) {
      return {
        redirect: {
          destination: 'app/onboarding',
          permanent: false,
        },
      };
    }

    return {
      props: user.data,
    };
  },
});

export default withPrivateApollo(ssrMe.withPage()(AppHome));

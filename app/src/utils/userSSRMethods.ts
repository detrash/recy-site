import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getMeServerQuery } from '../graphql/ssrQueries';
import { getAdminAccess } from './getAdminAccess';
import { APP_NAV_LINKS } from './navLinks';

const REDIRECS_TO = {
  onboarding: {
    redirect: {
      destination: APP_NAV_LINKS.ONBOARDING,
      permanent: false,
    },
  },
  app: {
    redirect: {
      destination: APP_NAV_LINKS.APP,
      permanent: false,
    },
  },
};

const checkUserAccess = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { accessToken } = await getAccessToken(req, res);
    const user = await getMeServerQuery(accessToken!);
    if (!user) {
      return REDIRECS_TO.onboarding;
    }

    return {
      props: user.data,
    };
  },
});

const checkOnboardingAccess = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { accessToken } = await getAccessToken(req, res);
    const user = await getMeServerQuery(accessToken!);

    if (user) {
      return REDIRECS_TO.app;
    }

    return {
      props: {},
    };
  },
});

const checkAdminAccess = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { accessToken } = await getAccessToken(req, res);
    const user = await getMeServerQuery(accessToken!);
    if (!user) {
      return REDIRECS_TO.onboarding;
    }

    const isAdmin = getAdminAccess(user.data.data);
    return {
      props: {
        ...user.data,
        isAdmin,
      },
    };
  },
});

export const userSSRMethods = {
  checkAdminAccess,
  checkOnboardingAccess,
  checkUserAccess,
};

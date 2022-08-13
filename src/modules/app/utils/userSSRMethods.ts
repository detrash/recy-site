import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { ProfileType } from '../graphql/generated/graphql';
import { getMeServerQuery } from '../graphql/ssrQueries';
import { USER_ROLE_TYPES } from './constants';
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

const checkFormSubmitAccess = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { accessToken } = await getAccessToken(req, res);
    const user = await getMeServerQuery(accessToken!);
    if (!user) {
      return REDIRECS_TO.onboarding;
    }

    const HODLER_TYPE = USER_ROLE_TYPES.find(
      (userRoleType) => userRoleType.key === ProfileType.Hodler
    );

    const userProfile = user?.data?.data?.me?.profileType;

    if (userProfile === HODLER_TYPE?.key) {
      return REDIRECS_TO.app;
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

export const userSSRMethods = {
  checkFormSubmitAccess,
  checkOnboardingAccess,
  checkUserAccess,
};

import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  MeQuery,
  ProfileType,
  useMeLazyQuery,
} from 'src/graphql/generated/graphql';
import { USER_ROLE_TYPES } from 'src/utils/constants';
import { APP_NAV_LINKS } from 'src/utils/navLinks';

type PageLoaderProps = {
  pageType?: 'Dashboard' | 'SubmitForm';
};

type PageLoaderData = {
  data: MeQuery | undefined;
  isLoading: boolean;
  userError: any;
};

export const usePageLoader = ({
  pageType,
}: PageLoaderProps): PageLoaderData => {
  const [MeQuery, { data, loading, error: userError }] = useMeLazyQuery();
  const { user, error: auth0Error, isLoading: isLoadingUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If user is not logged on Auth0, redirect to login
    if (!isLoadingUser && !auth0Error && !user) {
      return window.location.assign('/api/auth/login?returnTo=/dashboard');
    }

    if (auth0Error) {
      router.push('/');
      return;
    }

    // If user is not registered on our back end, redirect to onboarding page
    if (userError) {
      return window.location.assign(APP_NAV_LINKS.ONBOARDING);
    }

    if (user) {
      MeQuery();
    }
  }, [MeQuery, isLoadingUser, router, user, auth0Error, userError]);

  useEffect(() => {
    if (pageType === 'SubmitForm' && data) {
      const HODLER_TYPE = USER_ROLE_TYPES.find(
        (userRoleType) => userRoleType.key === ProfileType.Hodler
      );

      const userProfile = data.me.profileType;

      if (userProfile === HODLER_TYPE?.key) {
        router.push(APP_NAV_LINKS.APP);
        return;
      }
    }
  }, [data, pageType, router]);

  const isLoading = !(!!user && !!data);

  return {
    data,
    isLoading,
    userError,
  };
};

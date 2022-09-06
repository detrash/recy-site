import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MeQuery, useMeLazyQuery } from 'src/graphql/generated/graphql';

type UseMeClientData = {
  data: MeQuery | undefined;
  isLoading: boolean;
  userError: any;
};

export const useMeClient = (): UseMeClientData => {
  const [MeQuery, { data, error: userError }] = useMeLazyQuery();
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

    // If user is not registered in our back end, redirect to onboarding page
    if (userError) {
      return window.location.assign('/onboarding');
    }

    if (user) {
      MeQuery();
    }
  }, [MeQuery, isLoadingUser, router, user, auth0Error, userError]);

  const isLoading = !(!!user && !!data);

  return {
    data,
    isLoading,
    userError,
  };
};

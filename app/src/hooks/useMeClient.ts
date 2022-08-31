import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MeQuery, useMeLazyQuery } from 'src/graphql/generated/graphql';

type UseMeClientData = {
  data: MeQuery | undefined;
  isLoading: boolean;
  error: any;
};

export const useMeClient = (): UseMeClientData => {
  const [MeQuery, { data, error }] = useMeLazyQuery();
  const { user, error: userError, isLoading: isLoadingUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && !userError && !user) {
      // Redirect to login user
      return window.location.assign('/api/auth/login?returnTo=/dashboard');
    }

    if (userError) {
      router.push('/');
      return;
    }

    if (user) {
      MeQuery();
    }
  }, [MeQuery, isLoadingUser, router, user, userError]);

  const isLoading = !(!!user && !!data);

  return {
    data,
    isLoading,
    error,
  };
};

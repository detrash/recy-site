import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT}`,
  fetch,
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error) => !!error,
  },
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: from([retryLink, httpLink]),
  cache,
});

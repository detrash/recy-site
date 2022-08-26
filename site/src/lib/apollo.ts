import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_CDN_ENDPOINT,
  fetch,
});

const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache,
});

export { apolloClient };

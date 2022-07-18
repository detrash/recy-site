import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl5burmic0bxa01ul0fun529g/master',
  fetch,
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache,
});

import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';

const cache = new InMemoryCache();

const CLIENT_URLS = [process.env.NEXT_PUBLIC_GRAPHQL_CDN_ENDPOINT];

const [homeApolloClient] = CLIENT_URLS.map((uri) => {
  const httpLink = createHttpLink({
    uri,
    fetch,
  });

  const apolloClient = new ApolloClient({
    link: from([httpLink]),
    cache,
  });

  return apolloClient;
});

export { homeApolloClient };

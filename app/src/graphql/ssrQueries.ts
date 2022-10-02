import { print } from 'graphql/language/printer';

import { gql } from '@apollo/client';

const getUserQuery = gql`
  query getUserQuery {
    me {
      authUserId
      email
      name
      profileType
      lastLoginDate
      phoneNumber
      permissions {
        type
      }
    }
  }
`;

const fetchGraphQL = async (
  query: string,
  variables: any,
  accessToken: string
) => {
  const fetchData = await fetch(`${process.env.GRAPHQL_PROXY_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  return await fetchData.json();
};

export const getMeServerQuery = async (accessToken: string) => {
  const query = print(getUserQuery);
  const responseData = await fetchGraphQL(query, {}, accessToken);

  if (responseData?.errors) return null;

  return {
    data: responseData,
  };
};

import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import httpProxyMiddleware from 'next-http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  return httpProxyMiddleware(req, res, {
    target: process.env.GRAPHQL_PROXY_ENDPOINT,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
});

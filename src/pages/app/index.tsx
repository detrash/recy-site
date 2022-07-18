/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const AppHome: React.FC = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>Welcome</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/app',
});

export default AppHome;

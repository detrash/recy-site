/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import RegisterType from '@modules/app/components/FormSteps/RegisterType';
import WelcomeForm from '@modules/app/components/FormSteps/Welcome';

const AppHome: React.FC = () => {
  const { user } = useUser();

  return (
    <RegisterType />

    //   <button className="btn btn-neutral no-animation text-white w-full mb-4 md:w-auto md:mb-0 relative">
    //   Launch App
    //   <div className="absolute -top-1 -right-1">
    //     <span className="flex h-3 w-3 relative">
    //       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
    //       <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
    //     </span>
    //   </div>
    // </button>
  );
};

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/app',
});

export default AppHome;

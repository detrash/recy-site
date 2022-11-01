/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser } from '@auth0/nextjs-auth0';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { APP_NAV_LINKS } from 'src/utils/navLinks';

type ProfileProps = {
  profileTitle: string;
  signOutTitle: string;
};

const Profile: React.FC<ProfileProps> = ({ profileTitle, signOutTitle }) => {
  const { user } = useUser();
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>

          <div className="avatar online">
            <div className="w-8 h-8 rounded-full relative">
              {user?.picture && (
                <Image src={user.picture} alt="User profile" layout="fill" />
              )}
            </div>
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <Link href={APP_NAV_LINKS.PROFILE}>
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {profileTitle}
              </a>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <a
              href="/api/auth/logout"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {signOutTitle}
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Profile;

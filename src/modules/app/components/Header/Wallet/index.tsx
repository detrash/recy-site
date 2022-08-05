import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';
import { Wallet } from 'phosphor-react';
import { Fragment } from 'react';

const WalletOptions = [
  {
    icon: (
      <div className="mr-2 h-5 w-5 relative">
        <Image alt="MetaMask" src="/metamask.webp" layout="fill" />
      </div>
    ),
    name: 'With MetaMask',
  },
  {
    icon: (
      <div className="mr-2 h-5 w-5 relative">
        <Image
          alt="WalletConnect"
          src="/WalletConnect-Logo.png"
          layout="fill"
        />
      </div>
    ),
    name: 'With WalletConnect',
  },
];

const ConnectWallet: React.FC = () => {
  return (
    <main>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Connect Wallet
            <Wallet
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {WalletOptions.map((walletType) => (
              <Menu.Item key={walletType.name}>
                {({ active }) => (
                  <button
                    className={classNames(
                      'group flex w-full text-gray-900 items-center rounded-md px-4 py-2 text-sm',
                      {
                        'bg-gray-100 ': active,
                      },
                    )}
                  >
                    {walletType.icon}
                    {walletType.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </main>
  );
};

export default ConnectWallet;

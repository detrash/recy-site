import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';
import { Wallet as WalletIcon } from 'phosphor-react';
import { Fragment, useMemo } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const METAMASK_ID = 'METAMASK';

type WalletProps = {
  title: string;
};

const Wallet: React.FC<WalletProps> = ({ title }) => {
  const { isConnected, address } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const ConnectOptions = useMemo(() => {
    return (
      <>
        {connectors.map((connector) => (
          <Menu.Item key={connector.name} disabled={!connector.ready}>
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => {
                connect({ connector });
              }}
              className={classNames(
                'group flex w-full text-gray-900 items-center rounded-md px-4 py-2 text-sm hover:bg-gray-100',
                {
                  loading: isLoading && connector.id === pendingConnector?.id,
                  'hidden sm:flex': connector.id.toUpperCase() === METAMASK_ID,
                  'opacity-30 cursor-not-allowed': !connector.ready,
                }
              )}
            >
              <div className="mr-2 h-5 w-5 relative">
                <Image
                  alt="MetaMask"
                  src={`/wallet/${connector.id}.webp`}
                  layout="fill"
                />
              </div>
              {connector.name}
            </button>
          </Menu.Item>
        ))}
      </>
    );
  }, [connect, connectors, isLoading, pendingConnector?.id]);

  const formattedAddress = `${address?.substring(0, 12)}...`;

  return (
    <main>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={classNames(
              'inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors duration-150',
              {
                'bg-black bg-opacity-20': !isConnected,
                'bg-teal-600': isConnected,
              }
            )}
          >
            {isConnected ? <p>{formattedAddress}</p> : <p>{title}</p>}
            <WalletIcon
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
          <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {isConnected ? (
              <Menu.Item>
                <button
                  onClick={() => disconnect()}
                  className="group flex w-full text-gray-900 items-center rounded-md px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Disconnect
                </button>
              </Menu.Item>
            ) : (
              <>{ConnectOptions}</>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </main>
  );
};

export default Wallet;

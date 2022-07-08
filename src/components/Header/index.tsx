import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { MenuIcon } from '@heroicons/react/outline';
import Drawer from '../Drawer';
import classNames from 'classnames';
import DeTrashLogo from '@public/detrash-logo.svg';
import { NAV_PAGES } from '@src/utils/constants';

const Header: React.FC = () => {
  const [isOntop, setIsOnTop] = useState(true);
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setIsOnTop(false) : setIsOnTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [isOntop]);

  const pageItems = useMemo(() => {
    return (
      <>
        {NAV_PAGES.map(({ name, path }) => (
          <li key={name}>
            <Link href={path}>
              <a
                onClick={() => setIsDrawerMenuOpen(false)}
                className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
              >
                {name}
              </a>
            </Link>
          </li>
        ))}
      </>
    );
  }, []);

  return (
    <>
      <header
        className={classNames(
          'fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out',
          {
            'bg-white backdrop-blur-sm shadow-lg': !isOntop,
          },
        )}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0 mr-4 pt-4 md:pt-0">
              <Link
                href="/"
                className="block cursor-pointer"
                aria-label="DeTrash"
              >
                <a>
                  <Image
                    src={DeTrashLogo}
                    alt="DeTrash Logo"
                    width={100}
                    height={100}
                  />
                </a>
              </Link>
            </div>

            <nav>
              <div className="flex justify-end md:hidden">
                <button
                  className="btn btn-accent btn-ghost shadow-none no-animation"
                  onClick={() => setIsDrawerMenuOpen(true)}
                >
                  <MenuIcon className="h-6 w-6" />
                </button>
              </div>

              <ul className="hidden md:flex justify-end flex-wrap items-center">
                {pageItems}
                <li>
                  <Link href="/">
                    <a className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                      <span>Launch app</span>
                      <svg
                        className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Drawer
        content={<ul>{pageItems}</ul>}
        isOpen={isDrawerMenuOpen}
        setIsOpen={setIsDrawerMenuOpen}
        title="Menu"
      />
    </>
  );
};

export default Header;

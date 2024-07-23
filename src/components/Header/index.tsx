/* eslint-disable @next/next/no-html-link-for-pages */
import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { List } from "phosphor-react";
import RecyLogo from "public/recy-logo.png";
import { useEffect, useMemo, useState } from "react";
import { NAV_PAGES, UTIL_LINKS } from "src/utils/constants";
import Drawer from "../Drawer";

const Header: React.FC = () => {
  const translate = useTranslations("navItems");

  const [isOntop, setIsOnTop] = useState(true);
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setIsOnTop(false) : setIsOnTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [isOntop]);

  const pageItems = useMemo(() => {
    return (
      <>
        {NAV_PAGES.map(({ name, path }) => (
          <li key={name}>
            <Link href={path}>
              <a
                onClick={() => setIsDrawerMenuOpen(false)}
                className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
              >
                {translate(name)}
              </a>
            </Link>
          </li>
        ))}
      </>
    );
  }, [translate]);

  return (
    <>
      <header
        className={classNames(
          "fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out",
          {
            "bg-white backdrop-blur-sm shadow-lg": !isOntop,
          }
        )}
      >
        <div className="max-w-6xl px-5 mx-auto sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0 pt-4 mr-4 md:pt-0">
              <Link
                href="/"
                className="block cursor-pointer"
                aria-label="DeTrash"
              >
                <a>
                  <Image
                    src={RecyLogo}
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
                  className="shadow-none btn btn-accent btn-ghost no-animation"
                  onClick={() => setIsDrawerMenuOpen(true)}
                >
                  <List className="w-6 h-6" />
                </button>
              </div>

              <ul className="flex-wrap items-center justify-end hidden md:flex">
                {pageItems}
                <li>
                  <a
                    // href="/api/auth/login?returnTo=/app"
                    href={UTIL_LINKS.APP_URL}
                    className="ml-3 text-gray-200 bg-gray-900 btn-sm hover:bg-gray-800"
                  >
                    <span>Launch app</span>
                    <svg
                      className="flex-shrink-0 w-3 h-3 ml-2 -mr-1 text-gray-400 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </a>
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

import { Disclosure } from "@headlessui/react";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { List, X } from "phosphor-react";
import { ProfileType } from "src/graphql/generated/graphql";
import { APP_HEADER_LINKS, APP_NAV_LINKS } from "src/utils/navLinks";
import Profile from "./Profile";
import { ToggleLanguage } from "../ToggleLanguage";

const Wallet = dynamic(() => import("./Wallet"), {
  ssr: false,
});

type DashboardHeaderProps = {
  isAdmin: boolean;
  userProfileType: ProfileType;
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  isAdmin,
  userProfileType,
}) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <List className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden flex-1 sm:flex items-center sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link href={APP_NAV_LINKS.APP}>
                    <a className="h-16 w-16 relative cursor-pointer">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src="/recy-logo.png"
                        alt="Workflow"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {APP_HEADER_LINKS.map((headerItem) => {
                      if (headerItem.isAdminAccess && !isAdmin) return null;

                      if (
                        headerItem.isRecyclerOrWasteAccess &&
                        userProfileType === ProfileType.Hodler
                      )
                        return null;

                      return (
                        <Link
                          key={headerItem.key}
                          href={headerItem.href}
                          aria-current={
                            router.asPath === headerItem.href
                              ? "page"
                              : undefined
                          }
                        >
                          <button
                            className={classNames(
                              "transition-all duration-150 px-3 py-2 rounded-md text-sm font-medium",
                              {
                                "bg-gray-900 hover:bg-black text-white":
                                  router.asPath === headerItem.href,
                                "text-gray-300 hover:bg-gray-700 hover:text-white":
                                  router.asPath !== headerItem.href,
                              }
                            )}
                          >
                            {t(headerItem.key)}
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <ToggleLanguage />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center sm:justify-end">
                <Wallet title={t("connect_wallet")} />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Profile
                  profileTitle={t("your_profile")}
                  signOutTitle={t("sign_out")}
                />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {APP_HEADER_LINKS.map((headerItem) => {
                if (headerItem.isAdminAccess && !isAdmin) return null;

                if (
                  headerItem.isRecyclerOrWasteAccess &&
                  userProfileType === ProfileType.Hodler
                )
                  return null;
                return (
                  <Disclosure.Button
                    key={headerItem.name}
                    as="a"
                    href={headerItem.href}
                    className={classNames(
                      router.asPath === headerItem.href
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={
                      router.asPath === headerItem.href ? "page" : undefined
                    }
                  >
                    {t(headerItem.key)}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default DashboardHeader;

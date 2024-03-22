/* eslint-disable @next/next/no-html-link-for-pages */
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { getPageTranslations } from "src/utils/userSSGMethods";
import { ToggleLanguage } from "src/components/ToggleLanguage";

const AppHome: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white h-screen w-screen">
      <div className="max-w-screen-2xl mx-auto h-full">
        <div className="flex flex-col flex-1 md:grid md:grid-cols-1 lg:grid-cols-2 h-full">
          <div className="pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav
                className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                aria-label="Global"
              >
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <span className="sr-only">Workflow</span>
                  <Image
                    src="/recy-logo.png"
                    width={100}
                    height={100}
                    alt="Recy Logo"
                  />
                </div>
                <ToggleLanguage />
              </nav>
            </div>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">
                    {t("home:welcome_message_1")}
                  </span>{" "}
                  <span className="block text-primary xl:inline">
                    {t("home:welcome_message_2")}
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {t("home:description")}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <a
                    href="/api/auth/login?returnTo=/dashboard"
                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-darker md:py-4 md:text-lg md:px-10"
                  >
                    {t("home:login")}
                  </a>
                </div>
              </div>
            </main>
          </div>
          <div className="relative flex-1 lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <Image
              className="w-full object-cover sm:h-72 md:h-96"
              layout="fill"
              src="/ocean.jpg"
              alt="Ocean"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = getPageTranslations(["common", "home"]);

export default AppHome;

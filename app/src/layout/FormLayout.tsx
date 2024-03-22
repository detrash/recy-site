import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { APP_NAV_LINKS } from "../utils/navLinks";
import { ToggleLanguage } from "src/components/ToggleLanguage";

type FormLayoutProps = {
  children: ReactNode;
};

const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {

  return (
    <main className="flex flex-col min-h-screen sm:pb-20 sm:bg-gray-100">
      <header className="hidden sm:navbar">
        <Link href={APP_NAV_LINKS.APP}>
          <a>
            <Image
              src="/detrash-logo.svg"
              width={100}
              height={100}
              alt="DeTrash Logo"
            />
          </a>
        </Link>

        <ToggleLanguage />
      </header>

      <main className="flex flex-1 justify-center">
        <div className="sm:max-w-2xl max-h-full flex flex-1 bg-white p-4 sm:p-8 sm:rounded-xl sm:shadow-2xl sm:border-2">
          {children}
        </div>
      </main>
    </main>
  );
};

export default FormLayout;

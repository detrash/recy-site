import Image from 'next/image';
import { ReactNode } from 'react';

type FormLayoutProps = {
  children: ReactNode;
};

const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen sm:pb-20 sm:bg-gray-100">
      <div className="hidden sm:navbar">
        <Image
          src="/detrash-logo.svg"
          width={100}
          height={100}
          alt="DeTrash Logo"
        />
      </div>

      <main className="flex flex-1 justify-center">
        <div className="sm:max-w-2xl max-h-full flex flex-1 bg-white p-4 sm:p-8 sm:rounded-xl sm:shadow-2xl sm:border-2">
          {children}
        </div>
      </main>
    </main>
  );
};

export default FormLayout;

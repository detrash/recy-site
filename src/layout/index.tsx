import Footer from '@src/components/Footer';
import Header from '@src/components/Header';
import { ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      {children}

      <Footer />
    </div>
  );
};

export default AppLayout;

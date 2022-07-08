import { ReactNode } from 'react';
import Header from '../components/Header';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      {children}
    </div>
  );
};

export default AppLayout;

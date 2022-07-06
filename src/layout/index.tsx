import { ReactNode } from 'react';
import Header from '../components/Header';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />

      {children}
    </div>
  );
};

export default AppLayout;

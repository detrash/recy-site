import { ReactNode, useState } from 'react';
import Header from '../components/Header';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div>
      <Header />

      {children}
    </div>
  );
};

export default AppLayout;

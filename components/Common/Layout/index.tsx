import { ReactNode } from 'react';
import Header from '../Header';

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;

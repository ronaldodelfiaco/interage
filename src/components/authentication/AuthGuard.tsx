import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, ReactNode, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import ForgetPassword from '../../pages/authentication/ForgetPassword';
import Login from '../../pages/authentication/Login';

// component props interface
interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState<string>('');

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    if (pathname !== '/authentication/ForgetPassword') {
      return <Login />;
    } else {
      return <ForgetPassword />;
    }
    // push("/login");
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation('');
    return <Link href={requestedLocation} />;
  }
  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;

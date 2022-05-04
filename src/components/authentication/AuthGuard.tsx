import useAuth from '../../hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, ReactNode, useState } from 'react';
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

    return <Login />;
    // push("/login");
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation('');
    return <Link href={requestedLocation} />;
  }
  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;

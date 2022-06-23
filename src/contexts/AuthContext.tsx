import axios from 'axios';
import cookie from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';
import sha1 from 'sha1';
import { herokuConfig } from '../config';

const agora = new Date();

const AuthContext = createContext({
  login: (email: string, password: string) => Promise.resolve(),
  logout: (user: any) => Promise.resolve(),
  isAuthenticated: false,
});

// props type
type AuthProviderProps = {
  children: ReactNode;
};
export function AuthProvider({ children }: AuthProviderProps) {
  const [Authenticated, setAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    const passwordCrypt = sha1(password);
    const herokuLogin =
      herokuConfig + 'login?login=' + email + '&senha=' + passwordCrypt;
    try {
      await axios.get(herokuLogin).then((data) => {
        const _user = data.data.body.usuarioLogado;
        localStorage.setItem('user', JSON.stringify(_user));
        // localStorage.setItem("dtLogin", format( agora, "dd-MM-yyyy HH:mm:ss") );
        cookie.set('user', JSON.stringify(_user), {
          expires: 1 / 48,
        });
        cookie.set('token', _user.token, {
          expires: 1 / 48,
        });
        setSession(true);
      });
    } catch (error) {
      console.error(error);
      setSession(false);
    }
  };

  const logout = async () => {
    const token = cookie.get('token');

    const herokuLogin = herokuConfig + 'logout?token' + token;
    setSession(false);

    // Router.push('./');
  };

  const setSession = (session: any) => {
    if (session) {
      cookie.set('interage', session, {
        expires: 1 / 48,
      });
    } else {
      cookie.remove('interage');
      cookie.remove('user');
      cookie.remove('token');
      localStorage.removeItem('user');
      localStorage.clear();
    }
  };

  useEffect(() => {
    // if (!cookie.get('interage')) Router.push('/authentication/Login');
    // if (cookie.get('interage')) Router.push('/Pessoas');
    if (!cookie.get('interage')) setAuthenticated(false);
    if (cookie.get('interage')) setAuthenticated(true);
  }, []);

  const isAuthenticated = Authenticated;

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

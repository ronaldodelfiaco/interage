import { Auth0Client } from "@auth0/auth0-spa-js";
import LoadingScreen from "components/LoadingScreen";
import { auth0Config } from "config";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { ActionMap, AuthState, AuthUser } from "./JWTAuthContext";

// All types
// =============================================
enum Types {
  Init = "INIT",
  Login = "LOGIN",
  Logout = "LOGOUT",
}

type Auth0AuthPayload = {
  [Types.Init]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Login]: { user: AuthUser };
};

type Auth0Actions =
  ActionMap<Auth0AuthPayload>[keyof ActionMap<Auth0AuthPayload>];
// ================================================

let auth0Client: Auth0Client | null = null;

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state: AuthState, action: Auth0Actions) => {
  switch (action.type) {
    case "INIT": {
      return {
        isInitialized: true,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
      };
    }
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }
    default: {
      return state;
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "Auth0",
  login: () => Promise.resolve(),
  logout: () => {},
});

// props type
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async () => {
    await auth0Client?.loginWithPopup();
    const isAuthenticated = await auth0Client?.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0Client?.getUser();
      dispatch({ type: Types.Login, payload: { user: user || null } });
    }
  };

  const logout = () => {
    auth0Client?.logout();
    dispatch({ type: Types.Logout });
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        auth0Client = new Auth0Client({
          client_id: auth0Config.clientId || "",
          domain: auth0Config.domain || "",
          redirect_uri: window.location.origin,
        });

        await auth0Client.checkSession();
        const isAuthenticated = await auth0Client.isAuthenticated();

        if (isAuthenticated) {
          const user = await auth0Client.getUser();

          dispatch({
            type: Types.Init,
            payload: { isAuthenticated, user: user || null },
          });
        } else {
          dispatch({
            type: Types.Init,
            payload: { isAuthenticated, user: null },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Init,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };

    initialize();
  }, []);

  if (!state.isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "Auth0",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

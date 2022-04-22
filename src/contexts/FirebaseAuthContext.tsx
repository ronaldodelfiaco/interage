import LoadingScreen from "../components/LoadingScreen";
import { firebaseConfig } from "../config";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { ActionMap, AuthState, AuthUser } from "./JWTAuthContext";

// firebase app initialize
const firebaseApp = initializeApp(firebaseConfig);

// auth types
// ==========================================
enum Types {
  Init = "INIT",
}

type FirebaseAuthPayload = {
  [Types.Init]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
};

type FirebaseActions =
  ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];
// ==========================================

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === "INIT") {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      user,
      isAuthenticated,
      isInitialized: true,
    };
  }
  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: "heroku",
  register: (email: string, password: string, name: string) =>
    Promise.resolve(),
  login: (email: string, password: string) => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  loginWithFacebook: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// props type
type AuthProviderProps = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: Types.Init,
          payload: {
            isAuthenticated: true,
            user: {
              id: user.uid,
              email: user.email,
              avatar: user.photoURL,
              name: user.displayName || "Jason Alexander",
            },
          },
        });
      } else {
        dispatch({
          type: Types.Init,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch, auth]);

  const login = (email: string, password: string) => {
    
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email: string, password: string, name: string) =>
    createUserWithEmailAndPassword(auth, email, password).then(
      async (response) => {
        const userCollection = collection(db, "users");
        const findDoc = doc(userCollection, response.user?.uid);
        await setDoc(findDoc, {
          email,
          displayName: name,
          uid: response.user.uid,
        });
      }
    );
  // .catch((error) => error);

  // const register = (email: string, password: string, name: string) => {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => auth.signOut();

  if (!state.isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "heroku",
        //@ts-ignore
        login,
        logout,
        //@ts-ignore
        register,
        //@ts-ignore
        loginWithGoogle,
        //@ts-ignore
        loginWithFacebook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { getFirebaseAuth, signInWithGooglePopup, firebaseSignOut } from "./firebase";
import { registerAuthProvider } from "./apiClient";
import { appEnv } from "./env";

export interface AppUser {
  id: string;
  email?: string | null;
  displayName?: string | null;
}

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  devMode: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const mapFirebaseUser = (firebaseUser: FirebaseUser): AppUser => ({
  id: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName ?? firebaseUser.email ?? "User",
});

const DEV_USER: AppUser = {
  id: "dev-user",
  email: "dev@example.com",
  displayName: "Developer",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setDevMode(true);
      setUser(DEV_USER);
      setLoading(false);
      registerAuthProvider({
        getToken: async () => null,
        getDevHeaders: () => ({
          "x-user-id": DEV_USER.id,
          "x-user-email": DEV_USER.email ?? "dev@example.com",
          "x-user-name": DEV_USER.displayName ?? "Developer",
        }),
      });
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser));
        registerAuthProvider({
          getToken: async () => firebaseUser.getIdToken(),
        });
      } else {
        setUser(null);
        registerAuthProvider({
          getToken: async () => null,
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (devMode) {
      console.warn("Firebase is not configured. Using developer mode user.");
      return;
    }
    const auth = getFirebaseAuth();
    if (!auth) {
      console.warn("Firebase auth not available.");
      return;
    }
    await signInWithGooglePopup();
  }, [devMode]);

  const signOut = useCallback(async () => {
    if (devMode) {
      setUser(DEV_USER);
      return;
    }
    await firebaseSignOut();
  }, [devMode]);

  const refreshToken = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (auth?.currentUser) {
      await auth.currentUser.getIdToken(true);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      devMode,
      signInWithGoogle,
      signOut,
      refreshToken,
    }),
    [user, loading, devMode, signInWithGoogle, signOut, refreshToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const isFirebaseConfigured = () => Boolean(appEnv.firebase.apiKey && appEnv.firebase.projectId);

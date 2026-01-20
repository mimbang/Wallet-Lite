import { auth } from "@/firebase/config";
import { useRouter, useSegments } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  userAvatar:string | null;
  setUserAvatar: (avatar:string | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const segments = useSegments();
  const [userAvatar,setUserAvatar]=useState<string | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setUserAvatar(firebaseUser?.photoURL || null);


      const inAuthGroup = segments[0] === "(auth)";

      if (!firebaseUser && !inAuthGroup) {
        router.replace("/(auth)/login");        // pas connecté → login
      }

      if (firebaseUser && inAuthGroup) {
        router.push("/(tabs)/home/index")       // connecté → home
      }
    });

    return unsubscribe;
  }, [segments]);

  return (
    <AuthContext.Provider value={{ user, setUser ,userAvatar,setUserAvatar}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

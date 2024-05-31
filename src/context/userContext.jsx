import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getSession = async () => {
    const { data: session } = await supabase.auth.getSession();
    setUser(session?.session?.user);
    setIsLoading(false);
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setIsLoading(false);
      }
    );
    getSession();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

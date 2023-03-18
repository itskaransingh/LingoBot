"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useContext } from "react";

const AppContext = createContext({});

interface IState{
  rs: () => void;
}

const Providers = ({ children }: { children: any }) => {
  const rs = () => {
    window.location.reload();
  };
  const state:IState = {
    rs,
  };
  return (
    <SessionProvider>
      <AppContext.Provider value={state}>{children}</AppContext.Provider>
    </SessionProvider>
  );
};

export default Providers;

export const useAppContext = () => useContext(AppContext);
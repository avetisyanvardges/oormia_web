import { createContext, useContext } from "react";

import { useUser } from "./useUser.hooks";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that  calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useUser();
  // eslint-disable-next-line react/jsx-filename-extension
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

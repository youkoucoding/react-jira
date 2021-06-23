import React, { useState } from "react";
import * as auth from "../auth-provider";
import { User } from "screens/project-list/search-pannel";

interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<User>;
      register: (form: AuthForm) => Promise<User>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => {
    auth.login(form).then(setUser);
  };

  const register = (form: AuthForm) => {
    auth.register(form).then(setUser);
  };

  const logout = () => auth.logout().then(() => setUser(null));

  return <AuthContext.Provider value={{ user, login, register, logout }} />;
};

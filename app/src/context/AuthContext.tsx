import { ReactNode, createContext, useContext, useState } from "react";
import { User, Role } from "../types/user";
import jwt from "jwt-decode";

const initialUser = {
  role: Role.USER,
  credentialId: "",
};
const initial = {
  isLogIn: () => false,
  logIn: () => null,
  logOut: () => null,
  user: initialUser,
  token: "",
};

type IAuthContext = {
  isLogIn: () => boolean;
  logIn: (auth: string) => void;
  logOut: () => void;
  user: User;
  token: string;
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<IAuthContext>(initial);

const tokenKey = "flowersApp-jwtToken";

const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState(localStorage.getItem(tokenKey) || "");
  const [user, setUser] = useState<User>(token ? jwt(token): initialUser);

  const isLogIn = () => {
    return !!token && !!user.credentialId;
  };

  const logIn = (auth: string) => {
    setToken(auth);
    setUser(jwt(auth))
    localStorage.setItem(tokenKey, auth);
  };

  const logOut = () => {
    setToken("");
    setUser(initialUser)
    localStorage.removeItem(tokenKey);
    token;
  }

  return (
    <AuthContext.Provider value={{ isLogIn, logIn, logOut, user, token }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
} 


export { AuthProvider, useAuth };

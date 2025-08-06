import { createContext, useState } from "react";

interface LoginContextType {
  username: string;
  email: string;
  password: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

export const LoginContext = createContext<LoginContextType>({
  username: "",
  email: "",
  password: "",
  setEmail: () => {},
  setPassword: () => {},
  setUsername: () => {},
});

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LoginContext.Provider
      value={{ username, email, password, setUsername, setEmail, setPassword }}
    >
      {children}
    </LoginContext.Provider>
  );
};

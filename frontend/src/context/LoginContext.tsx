import { createContext, useState } from "react";

interface LoginContextType {
  name: string;
  email: string;
  password: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

export const LoginContext = createContext<LoginContextType>({
  name: "",
  email: "",
  password: "",
  setEmail: () => {},
  setPassword: () => {},
  setName: () => {},
});

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LoginContext.Provider
      value={{ name, email, password, setName, setEmail, setPassword }}
    >
      {children}
    </LoginContext.Provider>
  );
};

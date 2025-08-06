import { createContext, useState } from "react";

interface LoginContextType {
  id: string;
  name: string;
  email: string;
  password: string;
  walletAddress: string | null;
  setId: (id: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setWalletAddress: (walletAddress: string | null) => void;
}

export const LoginContext = createContext<LoginContextType>({
  id: "",
  name: "",
  email: "",
  password: "",
  walletAddress: null,
  setId: () => {},
  setName: () => {},
  setEmail: () => {},
  setPassword: () => {},
  setWalletAddress: () => {},
});

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <LoginContext.Provider
      value={{
        id,
        name,
        email,
        password,
        walletAddress,
        setId,
        setName,
        setEmail,
        setPassword,
        setWalletAddress,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

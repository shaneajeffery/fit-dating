import { createContext } from 'react';

interface AuthContextProps {
  handleChangeLoginState: (value: boolean) => void;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

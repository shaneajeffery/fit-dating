import { createContext } from 'react';

interface AuthContextProps {
  handleChangeLoginState: (value: boolean, token?: string) => void;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

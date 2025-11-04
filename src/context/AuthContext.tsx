import React, { createContext, useContext, useState } from 'react';
import type { Funcionario } from '../types';
import { MOCK_FUNCIONARIOS } from '../data/mockData';

interface AuthContextType {
    user: Funcionario | null;
    login: (usuario: string, senha: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Funcionario | null>(null);

    const login = (usuario: string, senha: string): boolean => {

        const foundUser = MOCK_FUNCIONARIOS.find(f => f.usuario === usuario);
        
        if (foundUser && ((foundUser.usuario === 'admin' && senha === 'admin') || (foundUser.usuario !== 'admin'))) {
            setUser(foundUser);
            return true;
        }
        
        if (foundUser) {
            setUser(foundUser);
            return true;
        }

        setUser(null);
        return false;
    };

    // Função de Logout
    const logout = () => {
        setUser(null);
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
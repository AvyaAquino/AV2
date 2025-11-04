import React, { createContext, useContext, useState } from 'react';
import type { Aeronave, Funcionario } from '../types';
import { MOCK_AERONAVES, MOCK_FUNCIONARIOS } from './mockData';

interface DataContextType {
    aeronaves: Aeronave[];
    funcionarios: Funcionario[];
    addAeronave: (aeronave: Omit<Aeronave, 'pecas' | 'etapas' | 'testes'>) => void;
    addFuncionario: (funcionario: Omit<Funcionario, 'id'>) => void;
    updateAeronave: (aeronaveAtualizada: Aeronave) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [aeronaves, setAeronaves] = useState<Aeronave[]>(MOCK_AERONAVES);
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>(MOCK_FUNCIONARIOS);

    const addAeronave = (aeronave: Omit<Aeronave, 'pecas' | 'etapas' | 'testes'>) => {
        const novaAeronave: Aeronave = {
            ...aeronave,
            pecas: [],
            etapas: [],
            testes: [],
        };
        setAeronaves(prev => [...prev, novaAeronave]);
    };

    const addFuncionario = (funcionario: Omit<Funcionario, 'id'>) => {
        const novoFuncionario: Funcionario = {
            ...funcionario,
            id: `f-${Date.now()}`,
        };
        setFuncionarios(prev => [...prev, novoFuncionario]);
    };
    
    const updateAeronave = (aeronaveAtualizada: Aeronave) => {
        setAeronaves(prev => 
            prev.map(a => 
                a.codigo === aeronaveAtualizada.codigo ? aeronaveAtualizada : a
            )
        );
    };

    const value = { aeronaves, funcionarios, addAeronave, addFuncionario, updateAeronave };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData deve ser usado dentro de um DataProvider');
    }
    return context;
}
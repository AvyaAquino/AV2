import { NivelPermissao, ResultadoTeste, StatusEtapa, StatusPeca, TipoAeronave, TipoPeca, TipoTeste } from "./enums";

export interface Funcionario {
    id: string;
    nome: string;
    usuario: string;
    nivelPermissao: NivelPermissao;
}

export interface Peca {
    id: string;
    nome: string;
    tipo: TipoPeca;
    fornecedor: string;
    status: StatusPeca;
}

export interface Etapa {
    id: string;
    nome: string;
    prazo: string;
    status: StatusEtapa;
    funcionariosResponsaveis: Funcionario[];
}

export interface Teste {
    id: string;
    tipo: TipoTeste;
    resultado: ResultadoTeste | null;
}

export interface Aeronave {
    codigo: string; 
    modelo: string;
    tipo: TipoAeronave;
    capacidade: number;
    alcance: number;
    pecas: Peca[];
    etapas: Etapa[];
    testes: Teste[];
}
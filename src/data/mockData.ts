import { NivelPermissao, StatusEtapa, StatusPeca, TipoAeronave, TipoPeca } from "../enums";
import type { Aeronave, Funcionario } from "../types";

export const MOCK_FUNCIONARIOS: Funcionario[] = [
    { id: 'f001', nome: 'Admin User', usuario: 'admin', nivelPermissao: NivelPermissao.ADMINISTRADOR },
    { id: 'f002', nome: 'Engenheiro Chefe', usuario: 'eng', nivelPermissao: NivelPermissao.ENGENHEIRO },
    { id: 'f003', nome: 'Operador de Montagem', usuario: 'op', nivelPermissao: NivelPermissao.OPERADOR },
];

export const MOCK_AERONAVES: Aeronave[] = [
    {
        codigo: 'AERO-001',
        modelo: 'Tucano T-27',
        tipo: TipoAeronave.MILITAR,
        capacidade: 2,
        alcance: 1500,
        pecas: [
            { id: 'p001', nome: 'Hélice Principal', tipo: TipoPeca.NACIONAL, fornecedor: 'Fornecedor A', status: StatusPeca.PRONTA },
            { id: 'p002', nome: 'Sistema de Navegação', tipo: TipoPeca.IMPORTADA, fornecedor: 'Fornecedor B', status: StatusPeca.EM_PRODUCAO },
        ],
        etapas: [
            { id: 'e001', nome: 'Montagem Fuselagem', prazo: '10 dias', status: StatusEtapa.CONCLUIDA, funcionariosResponsaveis: [MOCK_FUNCIONARIOS[2]] },
            { id: 'e002', nome: 'Instalação Elétrica', prazo: '5 dias', status: StatusEtapa.EM_ANDAMENTO, funcionariosResponsaveis: [MOCK_FUNCIONARIOS[1], MOCK_FUNCIONARIOS[2]] },
        ],
        testes: []
    },
    {
        codigo: 'EMB-190',
        modelo: 'E-Jet 190',
        tipo: TipoAeronave.COMERCIAL,
        capacidade: 114,
        alcance: 4500,
        pecas: [],
        etapas: [
            { id: 'e003', nome: 'Design de Interiores', prazo: '15 dias', status: StatusEtapa.PENDENTE, funcionariosResponsaveis: [] }
        ],
        testes: []
    }
];
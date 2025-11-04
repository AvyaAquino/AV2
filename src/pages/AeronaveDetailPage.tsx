import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../data/DataContext'; 
import type { Peca, Etapa, Funcionario, Teste } from '../types';
import { StatusPeca, TipoPeca, StatusEtapa, TipoTeste, ResultadoTeste } from '../enums';
import {
    Tabs,
    Typography,
    Descriptions,
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Space,
    message
} from 'antd';
import type { TabsProps, TableProps } from 'antd';
import { PlusOutlined, FileTextOutlined, EditOutlined } from '@ant-design/icons'; 

const { Title, Text } = Typography;
const { Option } = Select;

export function AeronaveDetailPage() {
    const { codigo } = useParams<{ codigo: string }>();
    
    const { aeronaves, funcionarios, updateAeronave } = useData();

    const aeronave = aeronaves.find(a => a.codigo === codigo);


    const [isPecaModalOpen, setIsPecaModalOpen] = useState(false);
    const [isEtapaModalOpen, setIsEtapaModalOpen] = useState(false);
    const [isTesteModalOpen, setIsTesteModalOpen] = useState(false);
    const [isRelatorioModalOpen, setIsRelatorioModalOpen] = useState(false);
    const [relatorioConteudo, setRelatorioConteudo] = useState("");

    const [isPecaStatusModalOpen, setIsPecaStatusModalOpen] = useState(false);
    const [selectedPeca, setSelectedPeca] = useState<Peca | null>(null);
    const [isEtapaFuncModalOpen, setIsEtapaFuncModalOpen] = useState(false);
    const [selectedEtapa, setSelectedEtapa] = useState<Etapa | null>(null);

    const [formPeca] = Form.useForm();
    const [formEtapa] = Form.useForm();
    const [formTeste] = Form.useForm();
    const [formRelatorio] = Form.useForm();
    const [formPecaStatus] = Form.useForm();
    const [formEtapaFunc] = Form.useForm();

    useEffect(() => {

        if (selectedEtapa) {
            formEtapaFunc.setFieldsValue({
                funcionarios: selectedEtapa.funcionariosResponsaveis.map(f => f.id)
            });
        }
    }, [selectedEtapa, formEtapaFunc]); 

    if (!aeronave) {
        return (
            <div>
                <h2>Aeronave não encontrada</h2>
                <p>Nenhuma aeronave com o código "{codigo}" foi localizada.</p>
                <Link to="/app/aeronaves">Voltar para a lista</Link>
            </div>
        );
    }


    const handleAdicionarPeca = (values: any) => {
        const novaPeca: Peca = {
            id: `p-${Date.now()}`,
            nome: values.nome,
            fornecedor: values.fornecedor,
            tipo: values.tipo,
            status: StatusPeca.EM_PRODUCAO,
        };
        updateAeronave({ ...aeronave, pecas: [...aeronave.pecas, novaPeca] });
        setIsPecaModalOpen(false);
        formPeca.resetFields();
    };

    const handleAdicionarEtapa = (values: any) => {
        const responsaveis = funcionarios.filter(f => values.funcionarios.includes(f.id));
        const novaEtapa: Etapa = {
            id: `e-${Date.now()}`,
            nome: values.nome,
            prazo: values.prazo,
            status: StatusEtapa.PENDENTE,
            funcionariosResponsaveis: responsaveis,
        };
        updateAeronave({ ...aeronave, etapas: [...aeronave.etapas, novaEtapa] });
        setIsEtapaModalOpen(false);
        formEtapa.resetFields();
    };

    const handleAvancarEtapa = (etapaId: string) => {
        if (!aeronave) return;
        const indexEtapa = aeronave.etapas.findIndex(e => e.id === etapaId);
        if (indexEtapa === -1) return;
        const etapaAtual = aeronave.etapas[indexEtapa];
        let novoStatus = etapaAtual.status;
        if (etapaAtual.status === StatusEtapa.PENDENTE) {
            if (indexEtapa === 0) {
                novoStatus = StatusEtapa.EM_ANDAMENTO;
            } else {
                const etapaAnterior = aeronave.etapas[indexEtapa - 1];
                if (etapaAnterior.status === StatusEtapa.CONCLUIDA) {
                    novoStatus = StatusEtapa.EM_ANDAMENTO;
                } else {
                    message.warning(`A etapa anterior "${etapaAnterior.nome}" não foi concluída.`);
                    return;
                }
            }
        } else if (etapaAtual.status === StatusEtapa.EM_ANDAMENTO) {
            novoStatus = StatusEtapa.CONCLUIDA;
        }
        const novasEtapas = aeronave.etapas.map(etapa =>
            etapa.id === etapaId ? { ...etapa, status: novoStatus } : etapa
        );
        updateAeronave({ ...aeronave, etapas: novasEtapas });
    };

    const handleAdicionarTeste = (values: any) => {
        const novoTeste: Teste = {
            id: `t-${Date.now()}`,
            tipo: values.tipo,
            resultado: values.resultado
        };
        updateAeronave({ ...aeronave, testes: [...aeronave.testes, novoTeste] });
        setIsTesteModalOpen(false);
        formTeste.resetFields();
    };

    const handleGerarRelatorio = (values: any) => {
        let conteudo = `=================================================\n`;
        conteudo += `  RELATÓRIO FINAL DE ENTREGA - AERONAVE ${aeronave.codigo}\n`;
        conteudo += `=================================================\n\n`;
        conteudo += `A. DADOS DA ENTREGA\n`;
        conteudo += `   - Cliente: ${values.cliente}\n`;
        conteudo += `   - Data: ${values.data}\n\n`;
        conteudo += `B. ESPECIFICAÇÕES DA AERONAVE\n`;
        conteudo += `   - Modelo: ${aeronave.modelo}\n`;
        conteudo += `   - Tipo: ${aeronave.tipo}\n`;
        conteudo += `   - Capacidade: ${aeronave.capacidade} passageiros\n`;
        conteudo += `   - Alcance: ${aeronave.alcance} km\n\n`;
        conteudo += `C. PEÇAS UTILIZADAS (${aeronave.pecas.length})\n`;
        aeronave.pecas.forEach(p => { conteudo += `   - ${p.nome} (Fornecedor: ${p.fornecedor}) - Status: ${p.status}\n`; });
        conteudo += `\n`;
        conteudo += `D. ETAPAS DE PRODUÇÃO REALIZADAS (${aeronave.etapas.length})\n`;
        aeronave.etapas.forEach(e => { conteudo += `   - ${e.nome} (Status: ${e.status})\n`; });
        conteudo += `\n`;
        conteudo += `E. RESULTADOS DOS TESTES (${aeronave.testes.length})\n`;
        aeronave.testes.forEach(t => { conteudo += `   - Teste de ${t.tipo}: ${t.resultado}\n`; });
        conteudo += `\n-------------------------------------------------\n`;

        setRelatorioConteudo(conteudo);
        setIsRelatorioModalOpen(true);
        formRelatorio.resetFields();
    };
    
    const handleOpenPecaStatusModal = (peca: Peca) => {
        setSelectedPeca(peca);
        formPecaStatus.setFieldsValue({ status: peca.status });
        setIsPecaStatusModalOpen(true);
    };

    const handleUpdatePecaStatus = (values: any) => {
        if (!selectedPeca || !aeronave) return;
        
        const pecaAtualizada = { ...selectedPeca, status: values.status };
        const novasPecas = aeronave.pecas.map(p => 
            p.id === selectedPeca.id ? pecaAtualizada : p
        );
        updateAeronave({ ...aeronave, pecas: novasPecas });
        setIsPecaStatusModalOpen(false);
    };

    const handleOpenEtapaFuncModal = (etapa: Etapa) => {
        setSelectedEtapa(etapa);
        setIsEtapaFuncModalOpen(true);
    };

    const handleUpdateEtapaFuncs = (values: any) => {
        if (!selectedEtapa || !aeronave) return;

        const responsaveis = funcionarios.filter(f => values.funcionarios.includes(f.id));
        const etapaAtualizada = { ...selectedEtapa, funcionariosResponsaveis: responsaveis };
        const novasEtapas = aeronave.etapas.map(e =>
            e.id === selectedEtapa.id ? etapaAtualizada : e
        );
        updateAeronave({ ...aeronave, etapas: novasEtapas });
        setIsEtapaFuncModalOpen(false);
    };

    
    const colunasPecas: TableProps<Peca>['columns'] = [
        { title: 'Nome', dataIndex: 'nome', key: 'nome' },
        { title: 'Fornecedor', dataIndex: 'fornecedor', key: 'fornecedor' },
        { title: 'Tipo', dataIndex: 'tipo', key: 'tipo' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Ação',
            key: 'acao',
            render: (_, peca) => (
                <Button type="link" size="small" onClick={() => handleOpenPecaStatusModal(peca)}>
                    Atualizar Status
                </Button>
            )
        }
    ];

    const colunasEtapas: TableProps<Etapa>['columns'] = [
        { title: 'Nome', dataIndex: 'nome', key: 'nome' },
        { title: 'Prazo', dataIndex: 'prazo', key: 'prazo' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { 
            title: 'Responsáveis', 
            dataIndex: 'funcionariosResponsaveis', 
            key: 'funcionarios',
            render: (funcs: Funcionario[]) => funcs.map(f => f.nome).join(', ') || 'Nenhum'
        },
        {
            title: 'Ação',
            key: 'acao',
            width: 220,
            render: (_, etapa) => (
                <Space size="small">
                    {etapa.status === StatusEtapa.PENDENTE && (
                        <Button type="primary" size="small" onClick={() => handleAvancarEtapa(etapa.id)}>
                            Iniciar
                        </Button>
                    )}
                    {etapa.status === StatusEtapa.EM_ANDAMENTO && (
                        <Button size="small" onClick={() => handleAvancarEtapa(etapa.id)} style={{ background: '#52c41a', color: 'white' }}>
                            Finalizar
                        </Button>
                    )}
                    {etapa.status === StatusEtapa.CONCLUIDA && (
                        <Button size="small" disabled>Concluído</Button>
                    )}
                    <Button 
                        type="default" 
                        icon={<EditOutlined />} 
                        size="small" 
                        onClick={() => handleOpenEtapaFuncModal(etapa)}
                    >
                        Responsáveis
                    </Button>
                </Space>
            )
        }
    ];

    const colunasTestes: TableProps<Teste>['columns'] = [
        { title: 'Tipo de Teste', dataIndex: 'tipo', key: 'tipo' },
        { title: 'Resultado', dataIndex: 'resultado', key: 'resultado' },
    ];

    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Detalhes',
            children: (
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Tipo">{aeronave.tipo}</Descriptions.Item>
                    <Descriptions.Item label="Capacidade">{aeronave.capacidade} passageiros</Descriptions.Item>
                    <Descriptions.Item label="Alcance">{aeronave.alcance} km</Descriptions.Item>
                </Descriptions>
            )
        },
        {
            key: '2',
            label: `Peças (${aeronave.pecas.length})`,
            children: (
                <>
                    <Button onClick={() => setIsPecaModalOpen(true)} type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
                        Adicionar Peça
                    </Button>
                    <Table columns={colunasPecas} dataSource={aeronave.pecas} rowKey="id" pagination={false} />
                </>
            )
        },
        {
            key: '3',
            label: `Etapas (${aeronave.etapas.length})`,
            children: (
                <>
                    <Button onClick={() => setIsEtapaModalOpen(true)} type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
                        Adicionar Etapa
                    </Button>
                    <Table columns={colunasEtapas} dataSource={aeronave.etapas} rowKey="id" pagination={false} />
                </>
            )
        },
        {
            key: '4',
            label: `Testes (${aeronave.testes.length})`,
            children: (
                <>
                    <Button onClick={() => setIsTesteModalOpen(true)} type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
                        Registrar Teste
                    </Button>
                    <Table columns={colunasTestes} dataSource={aeronave.testes} rowKey="id" pagination={false} />
                </>
            )
        },
        {
            key: '5',
            label: 'Relatório Final',
            children: (
                <div>
                    <Title level={4}>Gerar Relatório de Entrega</Title>
                    <Text>Preencha os dados do cliente para gerar o relatório final da aeronave.</Text>
                    <Form form={formRelatorio} layout="vertical" onFinish={handleGerarRelatorio} style={{ maxWidth: 400, marginTop: 16 }}>
                        <Form.Item name="cliente" label="Nome do Cliente" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="data" label="Data de Entrega" rules={[{ required: true }]}>
                            <Input placeholder="ex: 01/01/2025" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" icon={<FileTextOutlined />}>
                                Gerar Relatório
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )
        }
    ];
    
    return (
        <div>
            <Title level={2}>
                <Link to="/app/aeronaves" style={{ marginRight: 16 }}>{"<"}</Link>
                {aeronave.modelo} <Text type="secondary" style={{ fontWeight: 400 }}>({aeronave.codigo})</Text>
            </Title>
            
            <Tabs defaultActiveKey="1" items={tabItems} />

            <Modal
                title="Adicionar Nova Peça"
                open={isPecaModalOpen}
                onOk={() => formPeca.submit()}
                onCancel={() => setIsPecaModalOpen(false)}
                okText="Salvar Peça"
                cancelText="Cancelar"
            >
                <Form form={formPeca} layout="vertical" name="form_peca" onFinish={handleAdicionarPeca}>
                    <Form.Item name="nome" label="Nome da Peça" rules={[{ required: true, message: 'Por favor, insira o nome' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="fornecedor" label="Fornecedor" rules={[{ required: true, message: 'Por favor, insira o fornecedor' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="tipo" label="Tipo" rules={[{ required: true, message: 'Por favor, selecione o tipo' }]}>
                        <Select placeholder="Selecione o tipo">
                            <Option value={TipoPeca.NACIONAL}>Nacional</Option>
                            <Option value={TipoPeca.IMPORTADA}>Importada</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Adicionar Nova Etapa"
                open={isEtapaModalOpen}
                onOk={() => formEtapa.submit()}
                onCancel={() => setIsEtapaModalOpen(false)}
                okText="Salvar Etapa"
                cancelText="Cancelar"
            >
                <Form form={formEtapa} layout="vertical" name="form_etapa" onFinish={handleAdicionarEtapa}>
                    <Form.Item name="nome" label="Nome da Etapa" rules={[{ required: true, message: 'Por favor, insira o nome' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="prazo" label="Prazo" rules={[{ required: true, message: 'Por favor, insira o prazo' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="funcionarios" label="Associar Funcionários">
                        <Select mode="multiple" placeholder="Selecione um ou mais funcionários" style={{ width: '100%' }}>
                            {funcionarios.map((func: Funcionario) => (
                                <Option key={func.id} value={func.id}>{func.nome} ({func.nivelPermissao})</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            
            <Modal
                title="Registrar Novo Teste"
                open={isTesteModalOpen}
                onOk={formTeste.submit}
                onCancel={() => setIsTesteModalOpen(false)}
                okText="Salvar Teste"
                cancelText="Cancelar"
            >
                <Form form={formTeste} layout="vertical" onFinish={handleAdicionarTeste}>
                    <Form.Item name="tipo" label="Tipo de Teste" rules={[{ required: true, message: 'Por favor, selecione o tipo' }]}>
                        <Select placeholder="Selecione o tipo">
                            <Option value={TipoTeste.ELETRICO}>Elétrico</Option>
                            <Option value={TipoTeste.HIDRAULICO}>Hidráulico</Option>
                            <Option value={TipoTeste.AERODINAMICO}>Aerodinâmico</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="resultado" label="Resultado" rules={[{ required: true, message: 'Por favor, selecione o resultado' }]}>
                        <Select placeholder="Selecione o resultado">
                            <Option value={ResultadoTeste.APROVADO}>Aprovado</Option>
                            <Option value={ResultadoTeste.REPROVADO}>Reprovado</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={`Relatório Final - ${aeronave.codigo}`}
                open={isRelatorioModalOpen}
                onCancel={() => setIsRelatorioModalOpen(false)}
                footer={[ <Button key="fechar" type="primary" onClick={() => setIsRelatorioModalOpen(false)}>Fechar</Button> ]}
                width={700}
            >
                <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '4px', whiteSpace: 'pre-wrap', maxHeight: '60vh', overflowY: 'auto' }}>
                    {relatorioConteudo}
                </pre>
            </Modal>

            <Modal
                title={`Atualizar Status - ${selectedPeca?.nome || ''}`}
                open={isPecaStatusModalOpen}
                onOk={formPecaStatus.submit}
                onCancel={() => setIsPecaStatusModalOpen(false)}
                okText="Salvar"
                cancelText="Cancelar"
            >
                <Form form={formPecaStatus} layout="vertical" onFinish={handleUpdatePecaStatus}>
                    <Form.Item name="status" label="Novo Status" rules={[{ required: true }]}>
                        <Select placeholder="Selecione o novo status">
                            <Option value={StatusPeca.EM_PRODUCAO}>Em Produção</Option>
                            <Option value={StatusPeca.EM_TRANSPORTE}>Em Transporte</Option>
                            <Option value={StatusPeca.PRONTA}>Pronta para Uso</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={`Editar Responsáveis - ${selectedEtapa?.nome || ''}`}
                open={isEtapaFuncModalOpen}
                onOk={formEtapaFunc.submit}
                onCancel={() => setIsEtapaFuncModalOpen(false)}
                okText="Salvar"
                cancelText="Cancelar"
            >
                <Form form={formEtapaFunc} layout="vertical" onFinish={handleUpdateEtapaFuncs}>
                    <Form.Item name="funcionarios" label="Associar Funcionários">
                        <Select mode="multiple" placeholder="Selecione um ou mais funcionários" style={{ width: '100%' }}>
                            {funcionarios.map((func: Funcionario) => (
                                <Option key={func.id} value={func.id}>{func.nome} ({func.nivelPermissao})</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
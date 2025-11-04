import React, { useState } from 'react';
import { useData } from '../data/DataContext';
import { Table, Typography, Button, Modal, Form, Input, Select, message } from 'antd';
import type { TableProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Funcionario } from '../types';
import { NivelPermissao } from '../enums';

const { Title } = Typography;
const { Option } = Select;

export function FuncionariosPage() {
    const { funcionarios, addFuncionario } = useData(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const columns: TableProps<Funcionario>['columns'] = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Nome', dataIndex: 'nome', key: 'nome' },
        { title: 'Usuário (login)', dataIndex: 'usuario', key: 'usuario' },
        { title: 'Nível de Permissão', dataIndex: 'nivelPermissao', key: 'nivelPermissao' },
    ];

    const onFinish = (values: any) => {
        addFuncionario(values);
        message.success(`Funcionário "${values.nome}" adicionado com sucesso!`);
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>Gerenciar Funcionários</Title>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)} 
                >
                    Adicionar Novo Funcionário
                </Button>
            </div>
            
            <Table
                columns={columns}
                dataSource={funcionarios}
                rowKey="id"
            />

            <Modal
                title="Adicionar Novo Funcionário"
                open={isModalOpen}
                onOk={form.submit}
                onCancel={() => setIsModalOpen(false)}
                okText="Salvar"
                cancelText="Cancelar"
            >
                <Form form={form} layout="vertical" name="form_funcionario" onFinish={onFinish}>
                    <Form.Item name="nome" label="Nome Completo" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="usuario" label="Usuário (para login)" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="nivelPermissao" label="Nível de Permissão" rules={[{ required: true }]}>
                        <Select placeholder="Selecione o nível">
                            <Option value={NivelPermissao.ADMINISTRADOR}>Administrador</Option>
                            <Option value={NivelPermissao.ENGENHEIRO}>Engenheiro</Option>
                            <Option value={NivelPermissao.OPERADOR}>Operador</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
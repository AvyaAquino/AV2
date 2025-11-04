import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { Aeronave } from '../types';
import { useData } from '../data/DataContext';

const { Title } = Typography;

export function AeronavesListPage() {
    const { aeronaves } = useData();

    const columns: TableProps<Aeronave>['columns'] = [
        {
            title: 'Código',
            dataIndex: 'codigo',
            key: 'codigo',
        },
        {
            title: 'Modelo',
            dataIndex: 'modelo',
            key: 'modelo',
        },
        {
            title: 'Tipo',
            dataIndex: 'tipo',
            key: 'tipo',
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/app/aeronaves/${record.codigo}`}>
                        <Button type="primary">
                            Ver Detalhes
                        </Button>
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>Gerenciar Aeronaves</Title>
                
                <Link to="/app/aeronaves/novo"> 
                    <Button type="primary" icon={<PlusOutlined />}>
                        Adicionar Nova Aeronave
                    </Button>
                </Link>
            </div>
            
            <Table
                columns={columns}
                dataSource={aeronaves}
                rowKey="codigo"
            />
        </div>
    );
}

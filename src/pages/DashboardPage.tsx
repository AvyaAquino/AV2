import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_AERONAVES, MOCK_FUNCIONARIOS } from '../data/mockData';
import { Typography, Row, Col, Card, Statistic } from 'antd';
import { BuildOutlined, UsergroupAddOutlined, ToolOutlined } from '@ant-design/icons';
import { StatusEtapa } from '../enums';

const { Title, Text } = Typography;

export function DashboardPage() {
    const { user } = useAuth(); 

    const totalAeronaves = MOCK_AERONAVES.length;
    const totalFuncionarios = MOCK_FUNCIONARIOS.length;
    
    const aeronavesEmProducao = MOCK_AERONAVES.filter(a => 
        a.etapas.some(e => e.status === StatusEtapa.EM_ANDAMENTO)
    ).length;

    return (
        <div>
            <Title level={2}>Bem-vindo(a), {user?.nome || 'Usuário'}!</Title>
            <Text type="secondary">Este é o painel de controle da AeroCode.</Text>

            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total de Aeronaves"
                            value={totalAeronaves}
                            prefix={<BuildOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Aeronaves em Produção"
                            value={aeronavesEmProducao}
                            prefix={<ToolOutlined />}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total de Funcionários"
                            value={totalFuncionarios}
                            prefix={<UsergroupAddOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
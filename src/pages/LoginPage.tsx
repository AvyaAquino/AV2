import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Form, Input, Button, Card, Alert, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f0f2f5',
};

const cardStyle: React.CSSProperties = {
    width: 400,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
};

export function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const { login } = useAuth();
    const navigate = useNavigate(); 

    const onFinish = (values: any) => {
        setLoading(true);
        setError(null);

        const { username, password } = values;

        const success = login(username, password);

        if (success) {
            navigate('/app/dashboard');
        } else {
            setError('Usuário ou senha inválidos. (Tente: admin/admin)');
            setLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <Card style={cardStyle}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <Title level={2}>AeroCode</Title>
                    <Typography.Text type="secondary">Gestão de Produção Aeronáutica</Typography.Text>
                </div>

                {error && (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        style={{ marginBottom: '24px' }}
                    />
                )}

                <Form
                    name="login_form"
                    onFinish={onFinish} 
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Por favor, insira seu usuário!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Usuário (admin, eng, op)"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Senha (use 'admin' para o admin)"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%' }}
                            loading={loading}
                            size="large"
                        >
                            Entrar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
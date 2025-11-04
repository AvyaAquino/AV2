import React, { useMemo } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd'; 
import { DashboardOutlined, BuildOutlined, UsergroupAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext'; 
import { NivelPermissao } from '../enums';

const { Sider, Content } = Layout;

export function AppLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth(); 

    const menuItems = useMemo(() => {
        const items: MenuProps['items'] = [
            {
                key: '/app/dashboard',
                icon: <DashboardOutlined />,
                label: <Link to="/app/dashboard">Dashboard</Link>,
            },
            {
                key: '/app/aeronaves',
                icon: <BuildOutlined />,
                label: <Link to="/app/aeronaves">Aeronaves</Link>,
            },
        ];

        if (user?.nivelPermissao === NivelPermissao.ADMINISTRADOR) {
            items.push({
                key: '/app/funcionarios',
                icon: <UsergroupAddOutlined />,
                label: <Link to="/app/funcionarios">Funcionários</Link>,
            });
        }

        items.push({
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            style: { marginTop: 'auto', marginBottom: '16px' },
            onClick: () => {
                logout();
                navigate('/'); 
            }
        });

        return items;

    }, [user, logout, navigate]); 

    if (!user) {
        return null; 
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={220} theme="dark">
                <div style={{ padding: '16px', color: 'white', fontSize: '20px', textAlign: 'center' }}>
                    AeroCode
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    style={{ height: 'calc(100% - 64px)', display: 'flex', flexDirection: 'column' }}
                />
            </Sider>
            <Layout>
                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: 24, minHeight: 'calc(100vh - 32px)', background: '#fff', borderRadius: '8px' }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
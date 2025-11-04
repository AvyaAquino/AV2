import React, { useState } from 'react';

type TabsProps = {
    children: React.ReactElement<TabProps>[];
};

type TabProps = {
    title: string;
    children: React.ReactNode;
};

export function Tab({ title, children }: TabProps) {
    return <div data-title={title}>{children}</div>;
}

export function Tabs({ children }: TabsProps) {
    const [abaAtiva, setAbaAtiva] = useState(children[0].props.title);

        const estiloBotao = (tituloAba: string) => ({
            padding: '10px 15px',
            border: 'none',
            background: abaAtiva === tituloAba ? '#fff' : 'transparent',
            cursor: 'pointer',
            borderBottom: abaAtiva === tituloAba ? '2px solid #1890ff' : '2px solid transparent',
            fontSize: '16px',
            fontWeight: abaAtiva === tituloAba ? '600' : 'normal',
        });
    
        return (
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', background: '#fff', overflow: 'hidden' }}>
                <nav style={{ display: 'flex', borderBottom: '1px solid #ddd', background: '#f9f9f9' }}>
                    {children.map((aba) => (
                        <button
                            key={aba.props.title}
                            onClick={() => setAbaAtiva(aba.props.title)}
                            style={estiloBotao(aba.props.title)}
                        >
                            {aba.props.title}
                        </button>
                    ))}
                </nav>
                <div style={{ padding: '16px' }}>
                    {children.find((aba) => aba.props.title === abaAtiva)?.props.children}
                </div>
            </div>
        );
    }
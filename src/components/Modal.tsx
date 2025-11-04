import React from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) {
        return null;
    }

    // Estilos (CSS-in-JS)
    const backdropStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const modalStyle: React.CSSProperties = {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '500px',
        maxWidth: '90%',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1001,
    };

    const headerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
        marginBottom: '20px',
    };

    const closeButtonStyle: React.CSSProperties = {
        border: 'none',
        background: 'transparent',
        fontSize: '24px',
        cursor: 'pointer',
    };

    return (
        <div style={backdropStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={headerStyle}>
                    <h2>{title}</h2>
                    <button onClick={onClose} style={closeButtonStyle}>&times;</button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
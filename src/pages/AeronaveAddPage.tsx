import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../data/DataContext';
import {
    Typography,
    Form,
    Input,
    Select,
    InputNumber,
    Button,
    message
} from 'antd';
import { TipoAeronave } from '../enums';

const { Title } = Typography;
const { Option } = Select;

const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

export function AeronaveAddPage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { addAeronave } = useData(); 

    const onFinish = (values: any) => {

        addAeronave(values);
        
        console.log('Valores do Formulário:', values);
        
        message.success(`Aeronave "${values.modelo}" adicionada com sucesso!`);
        
        form.resetFields();
        
        navigate('/app/aeronaves');
    };

    return (
        <div>
            <Title level={2}>
                <Link to="/app/aeronaves" style={{ marginRight: 16 }}>{"<"}</Link>
                Adicionar Nova Aeronave
            </Title>
            
            <Form
                {...formLayout}
                form={form}
                name="add_aeronave_form"
                onFinish={onFinish}
                style={{ marginTop: 24 }}
            >
                <Form.Item
                    name="codigo"
                    label="Código Único"
                    rules={[{ required: true, message: 'Por favor, insira o código' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="modelo"
                    label="Modelo"
                    rules={[{ required: true, message: 'Por favor, insira o modelo' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="tipo"
                    label="Tipo"
                    rules={[{ required: true, message: 'Por favor, selecione o tipo' }]}
                >
                    <Select placeholder="Selecione o tipo">
                        <Option value={TipoAeronave.COMERCIAL}>Comercial</Option>
                        <Option value={TipoAeronave.MILITAR}>Militar</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="capacidade"
                    label="Capacidade"
                    rules={[{ required: true, message: 'Por favor, insira a capacidade' }]}
                >
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="alcance"
                    label="Alcance (km)"
                    rules={[{ required: true, message: 'Por favor, insira o alcance' }]}
                >
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item wrapperCol={{ ...formLayout.wrapperCol, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Salvar Aeronave
                    </Button>
                    <Link to="/app/aeronaves" style={{ marginLeft: 8 }}>
                        <Button htmlType="button">
                            Cancelar
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
}
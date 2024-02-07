import React, { useState } from 'react'
import { Button, Divider, Form, Input, InputNumber, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

const { Text, Title } = Typography;
export const Ingresar = () => {

  const [usuario] = useState(getUsuarioStorage());
  useHideMenu(false);
  const navigate = useNavigate();

  const onFinish = ({escritorio, agente }) => {
    localStorage.setItem('agente', agente)
    localStorage.setItem('escritorio', escritorio)
    navigate('/escritorio')
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if(usuario.agente && usuario.escritorio)
    return <Navigate to='/escritorio' />
  return (
    <>
      <Title level={2} >Ingresar</Title>
      <Text>Ingrese su nombre y numero de escritorio</Text>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 8, }}
        wrapperCol={{ span: 14, }}
        style={{ maxWidth: 600, }}
        initialValues={{ remember: true, }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Nobre del agente" name="agente"
          rules={[{ required: true, message: 'Ingresa tu usuario', },]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio" name="escritorio"
          rules={[{ required: true, message: 'Ingresa el escritorio', },]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 14, }}>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14, }} >
          <Button type="primary" htmlType="submit" shape='round'>
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

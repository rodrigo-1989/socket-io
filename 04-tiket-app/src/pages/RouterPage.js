import React, { useContext } from 'react';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';
import { Link, Route, BrowserRouter as Router, Navigate, Routes } from 'react-router-dom';
import { Ingresar } from './Ingresar';
import { Cola } from './Cola';
import { CrearTiket } from './CrearTiket';
import { Escritorio } from './Escritorio';
import { UiContext } from '../context/UiContext';

const { Sider, Content } = Layout;


export const RouterPage = () => {
    const { ocultarMenu } = useContext(UiContext);
    return (
        <Router>
            <Layout style={{ height: '100vh' }}>
                <Sider collapsedWidth="0" breakpoint='md' hidden={ ocultarMenu }>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
                        items={[
                            { key: '1', icon: <UserOutlined />, label: <Link to='/ingresar'> Ingresar</Link> },
                            { key: '2', icon: <VideoCameraOutlined />, label: <Link to='/cola'>Cola</Link> },
                            { key: '3', icon: <UploadOutlined />, label: <Link to='/crear'>Crear Tiket</Link> },
                            // { key: '4', icon: <DesktopOutlined />, label: <Link to='/crear'>Escritorio</Link> },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            // background: colorBgContainer,
                            // borderRadius: borderRadiusLG,
                        }}
                    >
                        <Routes>
                            <Route path='/ingresar' element={<Ingresar />} />
                            <Route path='/cola' element={<Cola />} />
                            <Route path='/crear' element={<CrearTiket />} />

                            <Route path='/escritorio' element={<Escritorio />} />
                            <Route path='/*' element={<Navigate to="/ingresar" />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    )
}

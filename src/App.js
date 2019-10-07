import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

import './assets/style/App.css';
import MainContainer from './containers/MainContainer';

const { Header, Content, Footer } = Layout;

function App() {
  return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to='/'>Invoices List</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', textAlign: "center" }}>
          <MainContainer />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
  );
}

export default App;

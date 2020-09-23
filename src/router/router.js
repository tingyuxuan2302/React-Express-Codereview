import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


const Fallback = React.memo(function () {
	return <div>Loading...别急哦</div>
});

const Home = lazy(() => import('pages/home/home'));
const Login = lazy(() => import('pages/login/login'));
const Register = lazy(() => import('pages/register/register'));

const NoMatch = () => {
	return <div>抱歉，404</div>
}


import { Layout, Menu, Breadcrumb } from 'antd';

import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';
import './router.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderDemo extends React.Component {
	state = {
		collapsed: false,
	};

	onCollapse = collapsed => {
		console.log(collapsed);
		this.setState({ collapsed });
	};

	render() {
		return (
			<Router>
				<Layout style={{ minHeight: '100vh' }}>
					<Sider className="slider-container" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
						<div className="logo">CODEREVIEW SYSTEM</div>
						<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
							<Menu.Item key="1" icon={<PieChartOutlined />}>
								<Link to="/">首页</Link>
							</Menu.Item>
							<Menu.Item key="2" icon={<DesktopOutlined />}>
								<Link to="/login">登陆</Link>
							</Menu.Item>
							<Menu.Item key="3" icon={<DesktopOutlined />}>
								<Link to="/register">注册</Link>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout className="site-layout">
						{/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
						<Content style={{ margin: '0 16px' }}>
							<Breadcrumb style={{ margin: '16px 0' }}>
								<Breadcrumb.Item>User</Breadcrumb.Item>
								<Breadcrumb.Item>Bill</Breadcrumb.Item>
							</Breadcrumb>
							<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

								<Suspense
									fallback={<Fallback />}
								>
									<Switch>
										<Route exact path="/" component={Home} />
										<Route exact path="/login" component={Login} />
										<Route exact path="/register" component={Register} />
										<Route component={NoMatch} />
									</Switch>
								</Suspense>


							</div>
						</Content>
						<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
					</Layout>
				</Layout>
			</Router>
		);
	}
}

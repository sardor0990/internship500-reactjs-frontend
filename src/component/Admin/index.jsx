import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, TableOutlined, HomeOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const App = () => {
	const location = useLocation();
	const [selectedKey, setSelectedKey] = useState('1');
	const navigate = useNavigate();


	useEffect(() => {
		// Get the last selected menu item from localStorage or set default
		const savedKey = localStorage.getItem('selectedMenuKey') || '1';
		setSelectedKey(savedKey);
	  }, []);
	
	  useEffect(() => {
		// Update the selected menu key based on current route on refresh
		const routeToMenuKey = {
		  '/admin/users': '1',
		  '/admin/internships': '2',
		  '/admin/requisition': '4',
		  '/admin/call': '5',
		  '/': '3',
		  '/admin': '1',

		};
		const currentKey = routeToMenuKey[location.pathname];
		if (currentKey) {
		  setSelectedKey(currentKey);
		  localStorage.setItem('selectedMenuKey', currentKey);
		}
	  }, [location]);
	
	  const handleMenuClick = (e) => {
		setSelectedKey(e.key);
		localStorage.setItem('selectedMenuKey', e.key);
	  };

	  const handleLogout = () => {
			localStorage.removeItem('token');
			localStorage.removeItem('tokenTimeStamp');
	  };


	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible>
				<div className="logo" />
				<h1 className="text-xl font-bold text-white mt-[20px] text-center cursor-pointer" onClick={() => navigate('/')}>
					INTERNSHIP 500
				</h1>
				<Menu
					theme="dark"
					mode="inline"
					selectedKeys={[selectedKey]}
					onClick={handleMenuClick}
                     className="mt-[10px]"
				>
					<Menu.Item key="1" icon={<UserOutlined />}>
						<Link to="/admin/users">Foydalanuvchilar</Link>
					</Menu.Item>
					<Menu.Item key="2" icon={<TableOutlined />}>
						<Link to="/admin/internships">Internshiplar</Link>
					</Menu.Item>
					<Menu.Item key="4" icon={<TableOutlined />}>
						<Link to="/admin/requisition">Murojaatlar</Link>
					</Menu.Item>
					<Menu.Item key="5" icon={<TableOutlined />}>
						<Link to="/admin/call">Call</Link>
					</Menu.Item>
					<Menu.Item key="6" icon={<TableOutlined />}>
						<Link to="/admin/season">Season</Link>
					</Menu.Item>
					<Menu.Item
						key="3"
						icon={<HomeOutlined />}
						style={{ marginTop: '20px' }}
					>
						<Link to="/" onClick={handleLogout}>Chiqish</Link>
					</Menu.Item>
				</Menu>
			</Sider>

			{/* Page Content */}
			<div className="w-full flex flex-col">
				<Header style={{ background: '#001529', padding: 0 }}>
					<h2 className="text-center text-white">Boshqaruv paneli</h2>
				</Header>
				<Layout className="site-layout">
					<Content style={{ margin: '0 16px' }}>
						<Outlet />
					</Content>
				</Layout>
			</div>
		</Layout>
	);
};

export default App;

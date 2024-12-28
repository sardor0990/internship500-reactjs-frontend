import React, { useState } from 'react';
import { Table, Input, Button, Space, Popconfirm, Image,Avatar } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { create, read, update, delete_Api } from '@api/crud_api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Page1 = () => {

	const queryClient = useQueryClient();

	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');

	// const dataSource = [
	// 	{ key: '1', login: 'user1', name: 'John Doe' },
	// 	{ key: '2', login: 'user2', name: 'Jane Doe' },
	// ];


	const fetchResource = async () => {
		return await read('admin/users/all');
	};


	const { data } = useQuery({
		queryKey: ['resource'],
		queryFn: fetchResource,
		refetchOnWindowFocus: false,
	});
	console.log(data)

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					placeholder={`Qidirish `}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Qidirish
					</Button>
					<Button
						onClick={() => handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Tozalash
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase())
				: '',
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.select(), 100);
			}
		},
	});

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};

	

	const columns = [
	  {
		title: 'Rasm',
		key: 'photoUrl',
		render: (data) => {
		  return data?.photoUrl ? (
			<Image
			  src={data.photoUrl}
			  alt="App"
			  style={{
				width: 50,
				height: 50,
				borderRadius: '50%',
				objectFit: 'cover',
			  }}
			/>
		  ) : (
			<Avatar size={54} icon={<UserOutlined />} />
		  );
		},
	  },
	  {
		title: 'Ism',
		dataIndex: 'firstName',
		key: 'firstName',
		...getColumnSearchProps('firstName'),
	  },
	  {
		title: "Familiya",
		dataIndex: 'lastName',
		key: 'lastName',
		...getColumnSearchProps('lastName'),
	  },
	  {
		title: 'Username',
		dataIndex: 'login',
		key: 'login',
		...getColumnSearchProps('login'),
	  },
	  {
		title: 'Phone',
		dataIndex: 'phone',
		key: 'phone',
		...getColumnSearchProps('phone'),
	  },
	  {
		title: 'Harakat',
		key: 'actions',
		render: (_, record) => (
		  <Space size="middle">
			{/* <Button icon={<EditOutlined />} onClick={() => openDrawer(record)}>
			  Tahrirlash
			</Button> */}
			<Popconfirm
			  title="Rostdan ham bu elementni o'chirmoqchimisiz?"
			  onConfirm={() => deleteMutation.mutate(record.id)}
			  okText="Ha"
			  cancelText="Yo'q"
			>
			  <Button icon={<DeleteOutlined />} danger>
				O'chirish
			  </Button>
			</Popconfirm>
		  </Space>
		),
	  },
	];
	

	return <Table dataSource={data?.data} columns={columns} loading={false} />;
};

export default Page1;

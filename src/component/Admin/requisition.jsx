import React, { useState } from 'react';
import {
	Table,
	Input,
	Button,
	Space,
	Popconfirm,
	Image,
	Drawer,
	Form,
	Upload,
	Badge,
	Dropdown,
} from 'antd';
import {
	SearchOutlined,
	EditOutlined,
	DeleteOutlined,
	DownloadOutlined,
	DownOutlined,
	LinkOutlined,
	UploadOutlined,
	InboxOutlined
} from '@ant-design/icons';
import { create, read, update, delete_Api } from '@api/crud_api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const items = [
	{
		label: 'SUBMITTED',
		key: '0',
	},
	{
		label: 'APPROVED',
		key: '1',
	},
	{
		label: 'REJECTED',
		key: '3',
	},
];

const Page1 = () => {
	const queryClient = useQueryClient();

	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const [editingItem, setEditingItem] = useState(null); // Tahrirlash uchun
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState([]);

	//Dropdown inside edit
	const [selectedStatus, setSelectedStatus] = useState('New');
	const handleMenuClick = (e) => {
		const selectedItem = items.find(item => item.key === e.key);
		if (selectedItem) {
			setSelectedStatus(selectedItem.label);
			form.setFieldsValue({ status: selectedItem.label }); // Update the form value
		}
	};

	const dataSource = [
		{ key: '1', login: 'user1', name: 'John Doe' },
		{ key: '2', login: 'user2', name: 'Jane Doe' },
	];

	const fetchResource = async () => {
		return await read('/account/applications/all');
	};

	const { data } = useQuery({
		queryKey: ['resource'],
		queryFn: fetchResource,
		refetchOnWindowFocus: false,
	});

	const editMutation = useMutation({
		mutationFn: (updatedItem) => update(`/account/applications`, updatedItem),
		onSuccess: () => {
			queryClient.invalidateQueries(['resource']);
			message.success('Element muvaffaqiyatli yangilandi!');
		},
		onError: () => {
			message.error('Elementni yangilash muvaffaqiyatsiz tugadi');
		},
	});


	// Qo'shish yoki tahrirlash uchun Drawer ochish
	const openDrawer = (record) => {
		console.log('record', record);
		if (record) {
			setEditingItem(record);
			console.log('inside record', record);
			form.setFieldsValue({
				photoUrl: record.cvUrl,
				link: `https://internship500.itskills.uz/internship500/detail/${record.id}`,
				fullDescription: record.fullDescription,
				shortDescription: record.shortDescription,
				redirectUrl: record.redirectUrl,
				// Map nested properties if necessary
				firstName: record.userClient?.firstName,
				lastName: record.userClient?.lastName,
				phone: record.userClient?.phone || 'N/A',
			});
			// Tanlangan yozuv bilan formani oldindan to'ldirish
			setFileList([
				{
					uid: `${record.key}`,
					name: 'rasm',
					status: 'done',
				},
			]);
		}
		setDrawerVisible(true);
	};

	// Drawer-ni yopish
	const closeDrawer = () => {
		setDrawerVisible(false);
		setEditingItem(null);
		form.resetFields(); // Yopishda formani tozalash
		setFileList([]); // Yopishda fayl ro'yxatini tozalash
	};

	// Element qo'shish yoki tahrirlash
	const onSubmit = async (values) => {
		if (editingItem) {
			// Elementni tahrirlash
			const updatedItem = {
				...editingItem,
				...values,
				photoUrl: fileList?.[0]?.photoUrl,
			};
			editMutation.mutate(updatedItem);
		} else {
			// Yangi element qo'shish
			const newItem = {
				...values,
				photoUrl: fileList?.[0]?.photoUrl,
			};
			addMutation.mutate(newItem);
		}
		closeDrawer();
	};

	// Faylni boshqarish uchun
	const handleFileChange = async ({ file }) => {
		const response = await uploadFile(file);
		if (response) {
			setFileList([
				{
					...response,
					photoUrl: response?.fileUrl,
					uid: response?.id,
				},
			]);
			message.success('Fayl muvaffaqiyatli yuklandi!');
		} else {
			message.error('Faylni yuklash muvaffaqiyatsiz tugadi');
		}
	};

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
			title: 'Resume',
			key: 'photoUrl',
			render: (data) => {
			  return data?.cvUrl ? (
				<a
				  href={data.cvUrl}
				  style={{
					width: 50,
					height: 50,
					borderRadius: '50%',
					objectFit: 'cover',
				  }}
				  target="_blank"
				  rel="noopener noreferrer"
				>
				  Download <DownloadOutlined />
				</a>
			  ) : (
					  <div
						  style={{
							  width: 50,
							  height: 50,
							  display: 'flex',
							  justifyContent: 'center',
							  alignItems: 'center',
							  borderRadius: '50%',
							  backgroundColor: 'rgba(240, 240, 240, 0.5)',
							  color: '#999',
						  }}
					  >
						  <InboxOutlined />
					  </div>
			  );
			},
		  },
		  
		{
			title: 'Internship',
			key: 'internshipId',
			render: (data) => {
				return (
					<div>
						<a
							key={data.id}
							href={`https://internship500.itskills.uz/internship500/detail/${data.internshipId}`}
							style={{
								width: 50,
								height: 50,
								borderRadius: '50%',
								objectFit: 'cover',
							}}
							target="_blank"
							rel="noopener noreferrer"
						>
							Open Internship <LinkOutlined />
						</a>
					</div>
				);
			},
		},
		{
			title: 'Ism',
			dataIndex: 'firstName',
			key: 'firstName',
			render: (_, data) => data.userClient?.firstName || 'N/A',
			...getColumnSearchProps('firstName'),
		},
		{
			title: 'Familiya',
			dataIndex: 'lastName',
			key: 'lastName',
			render: (_, data) => data.userClient?.lastName || 'N/A',
			...getColumnSearchProps('lastName'),
		},
		{
			title: 'Telefon',
			dataIndex: 'phone',
			key: 'phone',
			render: (_, data) => data.userClient?.phone || 'N/A',
			...getColumnSearchProps('phone'),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			...getColumnSearchProps('status'),
			render: (text) => (
				<Badge
					count={text}
					style={{ backgroundColor: text === 'SUBMITTED' ? 'orange' : text === 'APPROVED' ? 'green' : text === 'REJECTED' ? 'red' : 'black' }}
				></Badge>
			),
		},
		{
			title: 'Season',
			dataIndex: 'sessionId',
			key: 'session',
			render: (sessionId) => {
				const seasonMap = {
				  1: 'Winter',
				  2: 'Summer',
				  3: 'Spring',
				};
			
				return seasonMap[sessionId] || 'N/A';
			  },
		},
		{
			title: 'Harakat',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
					<Button icon={<EditOutlined />} onClick={() => openDrawer(record)}>
						Tahrirlash
					</Button>
					{/* <Popconfirm
						title="Rostdan ham bu elementni o'chirmoqchimisiz?"
						onConfirm={() => deleteMutation.mutate(record.id)}
						okText="Ha"
						cancelText="Yo'q"
					>
						<Button icon={<DeleteOutlined />} danger>
							O'chirish
						</Button>
					</Popconfirm> */}
				</Space>
			),
		},
	];

	return (
		<div>
			<Table dataSource={data?.data} columns={columns} loading={false} />

			{/* Qo'shish/Tahrirlash uchun Drawer */}
			<Drawer
				title={editingItem ? 'Tahrirlash' : 'Yaratish'}
				open={drawerVisible}
				onClose={closeDrawer}
				width={400}
				footer={
					<div style={{ textAlign: 'right' }}>
						<Button onClick={closeDrawer} style={{ marginRight: 8 }}>
							Bekor qilish
						</Button>
						<Button type="primary" onClick={() => form.submit()}>
							{editingItem ? 'Tahrirlash' : 'Yaratish'}
						</Button>
					</div>
				}
			>
				<Form form={form} layout="vertical" onFinish={onSubmit}>
					{/* <Form.Item name="photoUrl" label="Rasm yuklash">
						<Upload
							name="logo"
							listType="file"
							accept=".png,.jpg,.jpeg, .pdf, .doc, .docx"
							fileList={fileList}
							beforeUpload={() => false}
							onChange={handleFileChange}
							onRemove={(file) => {
								setFileList((prevList) =>
									prevList.filter((item) => item.uid !== file.uid),
								);
							}}
						>
							<Button icon={<UploadOutlined />}>Resume yuklash</Button>
						</Upload>
					</Form.Item> */}
					{/* <Form.Item
						name="link"
						label="Internship"
						rules={[{ required: true, message: 'Sarlavha kiriting!' }]}
					>
						<Input placeholder="Sarlavha kiriting" />
					</Form.Item> */}
					{/* <Form.Item
						name="firstName"
						label="Ism"
						rules={[{ required: true, message: "To'liq matn kiriting!" }]}
					>
						<Input.TextArea placeholder="To'liq matn kiriting" />
					</Form.Item>
					<Form.Item
						name="lastName"
						label="Familiya"
						rules={[{ required: true, message: 'Qisqa matn kiriting!' }]}
					>
						<Input placeholder="Qisqa matn kiriting" />
					</Form.Item> */}
					<Form.Item
						name="status"
						label="Statusni O'zgartirish"
						rules={[{ required: true, message: 'Qisqa matn kiriting!' }]}
					>
						<Dropdown
							menu={{
								items,
								onClick: handleMenuClick,
							}}
						>
							<a onClick={(e) => e.preventDefault()}>
								<Space>
									{selectedStatus}
									<DownOutlined />
								</Space>
							</a>
						</Dropdown>
					</Form.Item>

					<Form.Item
						name="phone"
						label="Telefon"
						rules={[{ required: true, message: 'Link URL kiriting!' }]}
					>
						<Input placeholder="Link URL kiriting" />
					</Form.Item>
				</Form>
			</Drawer>
		</div>
	);
};

export default Page1;

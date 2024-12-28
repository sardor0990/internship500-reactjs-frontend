import React, { useState } from 'react';
import {
	Table,
	Button,
	Drawer,
	Form,
	Input,
	Upload,
	Space,
	Popconfirm,
	message,
	Image,
	Modal,
} from 'antd';
import {
	UploadOutlined,
	EditOutlined,
	DeleteOutlined,
	PlusOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import { create, read, update, delete_Api } from '@api/crud_api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { uploadFile } from '../../services/fileUpload';

const Page2 = () => {
	const queryClient = useQueryClient();

	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});

	const handleTableChange = (pagination) => {
		setPagination({
			...pagination,
			current: pagination.current,
			pageSize: pagination.pageSize,
		});
	};

	const fetchResource = async () => {
		return await read(`admin/call-requests?page=${pagination.current - 1}`);
	};

	const { data } = useQuery({
		queryKey: ['resource', pagination.current],
		queryFn: fetchResource,
		refetchOnWindowFocus: false,
	});

	const deleteMutation = useMutation({
		mutationFn: (key) => delete_Api(`/admin/call-requests/${key}`),
		onSuccess: () => {
			queryClient.invalidateQueries(['resource']);
			message.success("Element muvaffaqiyatli o'chirildi!");
		},
		onError: () => {
			message.error("Elementni o'chirish muvaffaqiyatsiz tugadi");
		},
	});

	const addMutation = useMutation({
		mutationFn: (newItem) => {
			create('/admin/internships', newItem);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['resource']);
			message.success("Yangi element muvaffaqiyatli qo'shildi!");
		},
		onError: () => {
			message.error("Yangi elementni qo'shish muvaffaqiyatsiz tugadi");
		},
	});

	const editMutation = useMutation({
		mutationFn: (updatedItem) => update(`admin/internship`, updatedItem),
		onSuccess: () => {
			queryClient.invalidateQueries(['resource']);
			message.success('Element muvaffaqiyatli yangilandi!');
		},
		onError: () => {
			message.error('Elementni yangilash muvaffaqiyatsiz tugadi');
		},
	});

	const [drawerVisible, setDrawerVisible] = useState(false);
	const [editingItem, setEditingItem] = useState(null); // Tahrirlash uchun
	const [fileList, setFileList] = useState([]);
	const [form] = Form.useForm();
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');

	// State for modal
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [modalContent, setModalContent] = useState('');

	// Handle modal visibility
	const showModal = (comment) => {
		setModalContent(comment);
		setIsModalVisible(true);
	};

	const handleModalClose = () => {
		setIsModalVisible(false);
		setModalContent('');
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

	// Qo'shish yoki tahrirlash uchun Drawer ochish
	const openDrawer = (record) => {
		if (record) {
			setEditingItem(record);
			form.setFieldsValue(record); // Tanlangan yozuv bilan formani oldindan to'ldirish
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

	// Jadval ustunlari
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
						onClick={() => {
							clearFilters();
							setSelectedKeys([]);
							handleSearch([], confirm, dataIndex);
						}}
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
				// setTimeout(() => searchInput.select(), 100);
			}
		},
	});

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const columns = [
		{
			title: 'Sarlavha',
			dataIndex: 'title',
			key: 'title',
			...getColumnSearchProps('title'),
		},
		{
			title: "To'liq matn",
			dataIndex: 'comment',
			key: 'comment',
			...getColumnSearchProps('comment'),
			render: (text) => (
				<Button type="link" onClick={() => showModal(text)}>
					To'liq matni ko'rish
				</Button>
			),
		},
		{
			title: 'Email',
			dataIndex: 'userEmail',
			key: 'userEmail',
			...getColumnSearchProps('userEmail'),
		},
		{
			title: 'UserName',
			dataIndex: 'userName',
			key: 'userName',
			...getColumnSearchProps('userName'),
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
	return (
		<div className="pt-[16px]">
			{/* Qo'shish tugmasi */}

			<Modal
				title="To'liq matn"
				visible={isModalVisible}
				onCancel={handleModalClose}
				footer={null}
			>
				<p>{modalContent}</p>
			</Modal>

			{/* Jadval */}
			<Table
				dataSource={data?.data}
				columns={columns}
				pagination={{
					current: pagination.current,
					pageSize: pagination.pageSize,
					total: data?.pagination?.totalElements,
				}}
				onChange={handleTableChange}
			/>

			{/* Qo'shish/Tahrirlash uchun Drawer */}
			<Drawer
				title={editingItem ? 'Tahrirlash' : 'Yaratish'}
				visible={drawerVisible}
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
					<Form.Item
						name="title"
						label="Sarlavha"
						rules={[{ required: true, message: 'Sarlavha kiriting!' }]}
					>
						<Input placeholder="Sarlavha kiriting" />
					</Form.Item>
					<Form.Item
						name="fullDescription"
						label="To'liq matn"
						rules={[{ required: true, message: "To'liq matn kiriting!" }]}
					>
						<Input.TextArea placeholder="To'liq matn kiriting" />
					</Form.Item>
					<Form.Item
						name="shortDescription"
						label="Qisqa matn"
						rules={[{ required: true, message: 'Qisqa matn kiriting!' }]}
					>
						<Input.TextArea placeholder="Qisqa matn kiriting" />
					</Form.Item>
					<Form.Item name="photoUrl" label="Rasm yuklash">
						<Upload
							name="logo"
							listType="picture"
							accept=".png,.jpg,.jpeg"
							fileList={fileList}
							beforeUpload={() => false}
							onChange={handleFileChange}
							onRemove={(file) => {
								setFileList((prevList) =>
									prevList.filter((item) => item.uid !== file.uid),
								);
							}}
						>
							<Button icon={<UploadOutlined />}>Rasm yuklash</Button>
						</Upload>
					</Form.Item>
					<Form.Item
						name="redirectUrl"
						label="Link URL"
						rules={[{ required: true, message: 'Link URL kiriting!' }]}
					>
						<Input placeholder="Link URL kiriting" />
					</Form.Item>
				</Form>
			</Drawer>
		</div>
	);
};

export default Page2;

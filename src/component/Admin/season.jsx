import React, { useState } from 'react';
import {
	Table,
	Button,
	Drawer,
	Form,
	Input,
	Select,
	Space,
	Popconfirm,
	message,
} from 'antd';
import {
	EditOutlined,
	DeleteOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { create, read, update, delete_Api } from '@api/crud_api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Page2 = () => {
	const queryClient = useQueryClient();
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [editingItem, setEditingItem] = useState(null);
	const [form] = Form.useForm();

	// Fetch data
	const fetchResource = async () => {
		return await read(`account/session?page=${pagination.current - 1}`);
	};

	const { data } = useQuery({
		queryKey: ['resource', pagination.current],
		queryFn: fetchResource,
		refetchOnWindowFocus: false,
	});

	// Mutations
	const deleteMutation = useMutation({
		mutationFn: (key) => delete_Api(`/account/session/${key}`),
		onSuccess: () => {
			queryClient.invalidateQueries(['resource']);
			message.success("Element muvaffaqiyatli o'chirildi!");
		},
		onError: () => {
			message.error("Elementni o'chirish muvaffaqiyatsiz tugadi");
		},
	});

	const addMutation = useMutation({
		mutationFn: (newItem) => create('/account/session', newItem),
		onSuccess: () => {
			queryClient.invalidateQueries(['resource']);
			message.success("Yangi element muvaffaqiyatli qo'shildi!");
		},
		onError: () => {
			message.error("Yangi elementni qo'shish muvaffaqiyatsiz tugadi");
		},
	});

	const editMutation = useMutation({
		mutationFn: (updatedItem) => update('/account/session', updatedItem),
		onSuccess: () => {
			queryClient.invalidateQueries(['resource']);
			message.success('Element muvaffaqiyatli yangilandi!');
		},
		onError: () => {
			message.error('Elementni yangilash muvaffaqiyatsiz tugadi');
		},
	});

	// Close drawer and reset form
	const closeDrawer = () => {
		setDrawerVisible(false);
		setEditingItem(null);
		form.resetFields();
	};

	// Handle form submit
	const onSubmit = async (values) => {
		if (editingItem) {
			const updatedItem = { ...editingItem, ...values };
			editMutation.mutate(updatedItem);
		} else {
			addMutation.mutate(values);
		}
		closeDrawer();
	};

	// Open drawer with pre-filled data for editing or empty for adding
	const openDrawer = (record) => {
		console.log(record,'ffff')
		if (record) {
			setEditingItem(record);
			form.setFieldsValue({
				...record,
				title: record.title || 'Winter', // Fallback to 'Winter' if season is missing
			});
		} else {
			form.resetFields();
		}
		setDrawerVisible(true);
	};

	// Table columns
	const columns = [
		{
			title: 'Sarlavha',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Caption',
			dataIndex: 'caption',
			key: 'caption',
		},
		{
			title: 'UserName',
			dataIndex: 'userName',
			key: 'userName',
		},
		{
			title: 'Harakat',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
					<Button icon={<EditOutlined />} onClick={() => openDrawer(record)}>
						Tahrirlash
					</Button>
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

	// Pagination handler
	const handleTableChange = (pagination) => {
		setPagination({
			...pagination,
			current: pagination.current,
			pageSize: pagination.pageSize,
		});
	};

	return (
		<div className="pt-[16px]">
			<Button
				type="primary"
				icon={<PlusOutlined />}
				onClick={() => openDrawer(null)}
				style={{ marginBottom: 16 }}
			>
				Yaratish
			</Button>

			{/* Table */}
			<Table
				dataSource={data?.data}
				columns={columns}
				pagination={{
					current: pagination.current,
					pageSize: pagination.pageSize,
					total: data?.pagination?.totalElements,
				}}
				onChange={handleTableChange}
				rowKey="id"
			/>

			{/* Add/Edit Drawer */}
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
						name="season"
						label="Mavsum"
						rules={[{ required: true, message: 'Mavsumni tanlang!' }]}
					>
						<Select placeholder="Mavsumni tanlang" allowClear>
							<Select.Option value="Winter">Winter</Select.Option>
							<Select.Option value="Summer">Summer</Select.Option>
							<Select.Option value="Spring">Spring</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="caption"
						label="To'liq matn"
						rules={[{ required: true, message: "To'liq matn kiriting!" }]}
					>
						<Input.TextArea placeholder="To'liq matn kiriting" />
					</Form.Item>
				</Form>
			</Drawer>
		</div>
	);
};

export default Page2;

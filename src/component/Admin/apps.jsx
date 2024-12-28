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
	Avatar,
} from 'antd';
import {
	UploadOutlined,
	EditOutlined,
	DeleteOutlined,
	PlusOutlined,
	SearchOutlined,
	UserOutlined,
} from '@ant-design/icons';
//Markdown
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import Showdown from 'showdown';
import { create, read, update, delete_Api } from '@api/crud_api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { uploadFile } from '../../services/fileUpload';

const Page2 = () => {
	const queryClient = useQueryClient();
	const [pagination, setPagination] = useState({
		current: 1, // Current page
		pageSize: 10, // Number of items per page
		total: 0,
	});

	const fetchResource = async (page, pageSize) => {
		const response = await read(
			`admin/internships?page=${pagination.current - 1}`,
			{
				params: { page, pageSize },
			},
		);
		return response;
	};
	

	const { data } = useQuery({
		queryKey: ['resource', pagination],
		queryFn: () => fetchResource(pagination.current, pagination.pageSize),
		refetchOnWindowFocus: false,
	});

	const deleteMutation = useMutation({
		mutationFn: (key) =>
			delete_Api(
				`https://api.internship500.itskills.uz/api/admin/internships/${key}`,
			),
		onSuccess: () => {
			queryClient.invalidateQueries(['resource']);
			message.success("Element muvaffaqiyatli o'chirildi!");
		},
		onError: () => {
			message.error("Elementni o'chirish muvaffaqiyatsiz tugadi");
		},
	});

	const addMutation = useMutation({
		mutationFn: (newItem) => create('admin/internships', newItem),
		onSuccess: () => {
			queryClient.invalidateQueries(['resource']);
			message.success("Yangi element muvaffaqiyatli qo'shildi!");
		},
		onError: () => {
			message.error("Yangi elementni qo'shish muvaffaqiyatsiz tugadi");
		},
	});

	const editMutation = useMutation({
		mutationFn: (updatedItem) =>
			update(
				`https://api.internship500.itskills.uz/api/admin/internships`,
				updatedItem,
			),
		onSuccess: () => {
			queryClient.invalidateQueries(['resource']);
			message.success('Element muvaffaqiyatli yangilandi!');
		},
		onError: () => {
			message.error('Elementni yangilash muvaffaqiyatsiz tugadi');
		},
	});

	const handleTableChange = (pagination) => {
		setPagination({
			...pagination,
			current: pagination.current,
			pageSize: pagination.pageSize,
		});
	};

	const [drawerVisible, setDrawerVisible] = useState(false);
	const [editingItem, setEditingItem] = useState(null); // Tahrirlash uchun
	const [fileList, setFileList] = useState([]);
	const [form] = Form.useForm();
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	//Markdown
	const [markdownValue, setMarkdownValue] = useState('');
	const [selectedTab, setSelectedTab] = useState('write');
	// Markdown converter
	const converter = new Showdown.Converter();

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
			//Markdonw
			setMarkdownValue(record.fullDescription || ''); // Set markdown for editing
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
		//Markdown
		setMarkdownValue('');
	};

	// Element qo'shish yoki tahrirlash
	const onSubmit = async (values) => {
		
		const htmlDescription = converter.makeHtml(markdownValue);
		console.log(htmlDescription, 'htmlDescription');
		if (editingItem) {
			// Elementni tahrirlash
			const updatedItem = {
				...editingItem,
				...values,
				photoUrl: fileList?.[0]?.photoUrl,
				fullDescription: markdownValue,
				//Markdown
				
			};
			editMutation.mutate(updatedItem);
		} else {
			// Yangi element qo'shish
			const newItem = {
				...values,
				photoUrl: fileList?.[0]?.photoUrl,
				fullDescription: htmlDescription,
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
		onFilterDropdownOpenChange: (visible) => {
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
		  title: 'Sarlavha',
		  dataIndex: 'title',
		  key: 'title',
		  ...getColumnSearchProps('title'),
		  render: (text) => (
			<div
			  style={{
				whiteSpace: 'normal', // Allow wrapping
				wordWrap: 'break-word', // Wrap long words
				wordBreak: 'break-word', // Ensure long words break within container
				maxWidth: '300px', // Limit the width of the cell
			  }}
			>
			  {text}
			</div>
		  ),
		},
		{
		  title: "To'liq matn",
		  dataIndex: 'fullDescription',
		  key: 'fullDescription',
		  render: (text) => (
			<div
			  style={{
				whiteSpace: 'normal',
				wordWrap: 'break-word',
				wordBreak: 'break-word',
				maxWidth: '300px', // Adjust width as needed
				overflow: 'hidden', // Prevent horizontal scroll
			  }}
			  dangerouslySetInnerHTML={{ __html: text }}
			/>
		  ),
		  ...getColumnSearchProps('fullDescription'),
		},
		{
		  title: 'Qisqa matn',
		  dataIndex: 'shortDescription',
		  key: 'shortDescription',
		  render: (text) => (
			<div
			  style={{
				whiteSpace: 'normal',
				wordWrap: 'break-word',
				wordBreak: 'break-word',
				maxWidth: '300px',
			  }}
			>
			  {text}
			</div>
		  ),
		  ...getColumnSearchProps('shortDescription'),
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
	  

	return (
		<div>
			{/* Qo'shish tugmasi */}
			<Button
				type="primary"
				icon={<PlusOutlined />}
				onClick={() => openDrawer(null)}
				style={{ margin: '16px ' }}
			>
				Yaratish
			</Button>

			{/* Jadval */}
			<Table
				dataSource={data?.data}
				columns={columns}
				onChange={handleTableChange}
				pagination={{
					current: pagination.current,
					pageSize: pagination.pageSize,
					total: data?.pagination?.totalElements || 0, // Assuming the API returns a 'total' field
					showTotal: (total) => `Jami ${total} ta`,
				}}
			/>

			{/* Qo'shish/Tahrirlash uchun Drawer */}
			<Drawer
				title={editingItem ? 'Tahrirlash' : 'Yaratish'}
				open={drawerVisible}
				onClose={closeDrawer}
				width={600}
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
						label="Sarlavha En"
						rules={[{ required: true, message: 'Sarlavha kiriting!' }]}
					>
						<Input placeholder="Sarlavha kiriting" />
					</Form.Item>
					<Form.Item
						name="titleRu"
						label="Sarlavha Uz"
						rules={[{ required: true, message: 'Sarlavha kiriting!' }]}
					>
						<Input placeholder="Sarlavha kiriting" />
					</Form.Item>
					<Form.Item
						name="titleUz"
						label="Sarlavha Ru"
						rules={[{ required: true, message: 'Sarlavha kiriting!' }]}
					>
						<Input placeholder="Sarlavha kiriting" />
					</Form.Item>
					<Form.Item
						name="fullDescription"
						label="To'liq matn Markdown"
						rules={[{ required: true, message: "To'liq matn kiriting!" }]}
					>
						<ReactMde
							value={markdownValue}
							onChange={setMarkdownValue}
							selectedTab={selectedTab}
							onTabChange={setSelectedTab} // Ensure this function is passed correctly
							generateMarkdownPreview={(markdown) =>
								Promise.resolve(converter.makeHtml(markdown))
							}
						/>
					</Form.Item>
					<Form.Item
						name="fullDescriptionRu"
						label="To'liq matn Ru"
						rules={[{ required: true, message: "To'liq matn kiriting!" }]}
					>
						<Input.TextArea placeholder="To'liq matn kiriting" />
					</Form.Item>
					<Form.Item
						name="fullDescriptionUz"
						label="To'liq matn Uz"
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
					<Form.Item
						name="shortDescriptionRu"
						label="Qisqa matn Ru"
						rules={[{ required: true, message: 'Qisqa matn kiriting!' }]}
					>
						<Input.TextArea placeholder="Qisqa matn kiriting" />
					</Form.Item>
					<Form.Item
						name="shortDescriptionUz"
						label="Qisqa matn Uz"
						rules={[{ required: true, message: 'Qisqa matn kiriting!' }]}
					>
						<Input.TextArea placeholder="Qisqa matn kiriting" />
					</Form.Item>
					<Form.Item
						name="tags"
						label="Tags Ex: Java, Ruby"
						rules={[{ required: true, message: 'Tags kiriting' }]}
					>
						<Input placeholder="java ruby" />
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
						// rules={[
						// 	{ required: true, message: 'Link URL kiriting!' },
						// 	{
						// 		type: 'url',
						// 		message: 'Iltimos, to‘g‘ri URL manzilini kiriting!',
						// 	},
						// ]}
					>
						<Input placeholder="Link URL kiriting" />
					</Form.Item>
				</Form>
			</Drawer>
		</div>
	);
};

export default Page2;

import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../Navbar';
import Personal from '../../../../assets/icons/personalinfo.svg';
import Settings from '../../../../assets/icons/settings.svg';
import Application from '../../../../assets/icons/application.svg';
import Avatar from '../../../../assets/img/Avatar.png';
import UploadIcon from '../../../../assets/icons/uploadIcon.svg';
import { Button, Input } from 'antd';
import Footer from '../../Footer';
import BG from '../../../../assets/img/bg2.png';
import { useSelector } from 'react-redux';
import { LogoutOutlined, DownloadOutlined } from '@ant-design/icons';
import LogoutIcon from '../../../../assets/img/logout.png';
import { useNavigate } from 'react-router-dom';
import { message, Modal } from 'antd';
import request from '@/services/api';
import { uploadFile } from '@/services/fileUpload';

const buttonStyle = {
	borderRadius: '12px',
	boxShadow:
		'0px 1px 2px 0px rgba(3, 7, 18, 0.12), 0px 0px 0px 1px rgba(3, 7, 18, 0.08)',
	border: '1px solid rgba(255, 255, 255, 0.10)',
	background:
		'linear-gradient(180deg, rgba(3, 7, 18, 0.00) 0%, rgba(3, 7, 18, 0.03) 100%), rgba(245, 245, 245, 0.10)',
};

const inputStyle = {
	borderRadius: '12px',
	border: '1px solid rgba(255, 255, 255, 0.05)',
	background: 'rgba(255, 255, 255, 0.05)',
};

const Profile = () => {
	const [selectedOption, setSelectedOption] = useState(1);
	const [selectedStatus, setSelectedStatus] = useState('Ko’rib chiqilmoqda');
	const [expired, setExpired] = useState(false); // Local state to trigger re-render

	//fileupload
	const fileInputRef = useRef(null); // Create a ref for the file input
	const handleUploadTrigger = () => {
		fileInputRef.current.click(); // Trigger the file input click event
	};

	// State for modal
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [modalContent, setModalContent] = useState('');
	//Application list
	const [applications, setApplications] = useState([]);

	const { data } = useSelector((state) => state.generelReducer);

	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		login: '',
		phone: '',
		id: '',
		file: null,
		photo: '',
		filePreview: null,
	});

	const [image, setImage] = useState(null);

	const [password, setPassword] = useState({
		currentPassword: '',
		newPassword: '',
		newPasswordConfirmation: '',
	});

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('tokenTimeStamp');
		navigate('/login');
	};

	//handleFile change
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setUser({ ...user, file });
		setImage(file);
		message.success('Image uploaded');

		if (file) {
			const reader = new FileReader();
			console.log('file', file);
			reader.onloadend = () => {
				setUser({ ...user, filePreview: reader.result });
			};
			console.log('reader.result', reader.result);

			reader.readAsDataURL(file);
		}
	};

	setTimeout(() => {
		console.log(user.file);
	}, 10000);

	//handleFileDelete
	const handleFileDelete = () => {
		setUser((prevState) => ({ ...prevState, file: '' }));
		message.success('Image deleted successfully!');
	};

	//handleFileSubmit
	const handleFileSubmit = async (e) => {
		e.preventDefault();
		console.log(user.file);
		if (image) {
			try {
				const response = await uploadFile(image);
				const fileUrl = response.fileUrl;
				console.log('response data', response);

				setUser((prevState) => ({
					...prevState,
					photo: fileUrl,
				}));

				await request.put(`/account/auth`, {
					data: {
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						login: user.login,
						phone: user.phone,
						photoUrl: fileUrl,
					},
				});
				message.success('File uploaded successfully!');
				message.success('Profile data updated successfully!');
			} catch (error) {
				message.error('File upload failed');
			}
		} else {
			message.warning('Please select a file to upload');
		}
	};

	// Password update change handler
	const handleChange = (e) => {
		const { name, value } = e.target;
		setPassword((prevState) => ({ ...prevState, [name]: value }));
		console.log(password.currentPassword);
		console.log(password.newPassword);
		console.log(password.newPasswordConfirmation);
	};

	// Password Update
	const handlePasswordUpdate = async (e) => {
		e.preventDefault();

		// Check if any password fields are empty
		if (password.oldPassword == '' || password.newPassword == '' || password.newPasswordConfirmation == '') {
			message.error('Please fill in all fields');
			return; // Prevent the form from submitting
		}

		 // Check if the new password and confirmation match
		 if (password.newPassword !== password.newPasswordConfirmation) {
			message.error('New password and confirmation do not match');
			return; // Prevent the form from submitting
		}

		try {
			const res = await request.post(
				`/account/auth/reset-password/${user.login}`,
				{ data: { ...password } },
			);
			if (res.status == 200) {
				message.success('Parol yangilandi');
				setPassword({
					oldPassword: '',
					newPassword: '',
					confirmPassword: '', // Fixed typo here
				});
			} else {
				alert('Xato bor');
				message.error('Xato bor');
			}
		} catch (error) {
			message.error('error');
		}
	};

	// Handle modal visibility
	const showModal = (comment) => {
		setModalContent(comment);
		setIsModalVisible(true);
	};

	const handleModalClose = () => {
		setIsModalVisible(false);
		setModalContent('');
	};

	const options = [
		{
			id: 1,
			label: 'Personal info',
			icon: Personal,
			content: personalInfoContent(),
		},
		{ id: 2, label: 'Settings', icon: Settings, content: SettingsInfo() },
		{
			id: 3,
			label: 'My applications',
			icon: Application,
			content: ApplicationInfo(),
		},
		{
			id: 4,
			label: 'Log out',
			icon: LogoutIcon,
			content: null,
			action: handleLogout,
		},
	];

	// Function to check if the token has expired
	const isTokenExpired = () => {
		const tokenTimeStamp = localStorage.getItem('tokenTimeStamp');
		if (tokenTimeStamp) {
			const currentTime = new Date().getTime(); // Current time in milliseconds
			const tokenAge = currentTime - tokenTimeStamp; // Age in milliseconds

			// Check if 1 day have passed for demo
			if (tokenAge > 86400000) {
				localStorage.removeItem('token');
				localStorage.removeItem('tokenTimeStamp');
				return true; // Token is expired
			}
		}
		return false; // Token is still valid
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (isTokenExpired()) {
				message.warning('Your session has expired. Please log in again.');
				setExpired(true); // Set expired state when token is expired
				localStorage.removeItem('token');
				localStorage.removeItem('tokenTimeStamp');
				navigate('/login');
			}
			console.log('Checking token expiration...');
		}, 18000000); // Check every 5 hours

		return () => clearInterval(interval); // Cleanup interval on component unmount
	}, []);

	// Update user data when `data` changes
	useEffect(() => {
		if (data) {
			const userId = data?.data?.id || '';
			setUser({
				firstName: data?.data?.firstName || '',
				lastName: data?.data?.lastName || '',
				login: data?.data?.login || '',
				phone: data?.data?.phone || '',
				id: userId,
			});

			if (userId) {
				// Make the API request
				const fetchApplications = async () => {
					try {
						const response = await request.get(
							`/admin/users/${userId}/applications`,
						);
						setApplications(response?.data?.data); // Update state with response data
						console.log(applications,"fffff")
					} catch (error) {
						console.error('Error fetching applications:', error);
					}
				};

				fetchApplications();
			}
		}
	}, [data]);

	console.log(applications);

	function personalInfoContent() {
		return (
			<div className="p-[24px] max-w-[1040px] w-full">
				<p
					className="font-ProDisplay text-[20px] sm:text-[18px] md:text-[20px]"
					style={{ color: 'rgba(248, 248, 248, 0.95)' }}
					id="personalInfo"
				>
					Personal info
				</p>
				<div className="mt-[30px]">
					<div className="flex flex-col gap-4 justify-between sm:flex-col">
						<div className="flex items-center gap-3">
							<img
								src={data?.data?.photoUrl}
								alt="avatar"
								width={80}
								height={80}
							/>
							<div>
								<p className="text-white text-sm sm:text-base">
									Profile picture
								</p>
								<p className="text-white text-sm sm:text-base opacity-50">
									PNG, JPG under 15MB
								</p>
							</div>
						</div>
						<div className="flex flex-col gap-3 sm:flex-row">
							<div>
								<button
									className="py-[12px] px-[32px] border-none outline-none font-ProDisplayLight font-400 w-full sm:w-auto flex gap-3 items-center justify-center rounded-[8px] shadow-md transition-all duration-300 ease-in-out hover:bg-[#2a2a2a] hover:shadow-lg"
									style={{
										...buttonStyle,
										background: 'rgba(40, 40, 40, 0.70)',
										color: '#F8F8F8',
									}}
									onClick={handleUploadTrigger}
								>
									<img
										src={UploadIcon}
										alt="uploadIcon"
										width={24}
										height={24}
										className="transition-all duration-200 ease-in-out"
									/>
									<input
										type="file"
										className="hidden"
										ref={fileInputRef}
										onChange={handleFileChange}
									/>
									<span className="ml-2">Upload New Picture</span>
								</button>
							</div>
							<div>
								<button
									className="py-[10px] mr-[20px] px-[76px] text-white font-ProDisplayLight font-400 w-full sm:w-auto mb-4 sm:mb-0"
									style={buttonStyle}
									onClick={handleFileDelete}
								>
									Delete
								</button>
							</div>
						</div>
					</div>

					<div className="mt-[30px] flex flex-col gap-4 lg:flex-row">
						<div>
							<p className=" text-white mb-[20px] text-sm sm:text-base">Ism</p>
							<Input
								className="h-[51px] mb-[16px] w-full sm:w-[300px] md:w-[400px] lg:w-[470px] text-white"
								style={inputStyle}
								placeholder="First Name"
								value={user.firstName}
								onChange={(e) =>
									setUser({ ...user, firstName: e.target.value })
								}
							/>
						</div>
						<div>
							<p className="text-white mb-[20px] text-sm sm:text-base">
								Familiya
							</p>
							<Input
								className="h-[51px] mb-[16px] w-full sm:w-[300px] md:w-[400px] lg:w-[470px] text-white"
								style={inputStyle}
								placeholder="Last Name"
								value={user.lastName}
								onChange={(e) => setUser({ ...user, lastName: e.target.value })}
							/>
						</div>
					</div>

					<div className="flex flex-col gap-4 lg:flex-row">
						<div>
							<p className="text-white mb-[20px] text-sm sm:text-base">
								Telefon raqam
							</p>
							<Input
								className="h-[51px] mb-[16px] w-full sm:w-[300px] md:w-[400px] lg:w-[470px] text-white"
								style={inputStyle}
								placeholder="Phone Number"
								value={user.phone}
								onChange={(e) => setUser({ ...user, phone: e.target.value })}
							/>
						</div>
						<div>
							<p className="text-white mb-[20px] text-sm sm:text-base">Email</p>
							<Input
								className="h-[51px] mb-[16px] w-full sm:w-[300px] md:w-[400px] lg:w-[470px] text-white"
								style={inputStyle}
								placeholder="Last Name"
								value={user.login}
								onChange={(e) => setUser({ ...user, login: e.target.value })}
							/>
						</div>
					</div>
				</div>
				<div className="py-[24px] px-[16px] flex flex-col sm:flex-row items-center sm:justify-start">
					<button
						className="py-[10px] px-[76px] border-none outline-none font-ProDisplayLight font-400 w-full sm:w-auto"
						style={{
							...buttonStyle,
							background: 'rgba(40, 40, 40, 0.70)',
							color: '#F8F8F8',
						}}
						onClick={handleFileSubmit}
					>
						Saqlash
					</button>
				</div>
			</div>
		);
	}

	function SettingsInfo() {
		return (
			<div className="p-[24px] ">
				<p
					className="font-ProDisplay text-[20px] sm:text-[18px] md:text-[20px]"
					style={{ color: 'rgba(248, 248, 248, 0.95)' }}
				>
					Settings
				</p>

				<div className="flex flex-col sm:flex-row mt-[30px] justify-between">
					<p className="text-white mb-[20px] sm:mr-[160px] whitespace-nowrap">
						Old Password
					</p>
					<Input
						className="h-[51px] mb-[16px] w-full sm:w-[300px] md:w-[400px] lg:w-[488px] text-white"
						style={inputStyle}
						placeholder="Old Password"
						name="currentPassword"
						value={password.currentPassword}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col sm:flex-row mt-[30px] justify-between">
					<p className="text-white mb-[20px] sm:mr-[160px] whitespace-nowrap">
						New Password
					</p>
					<Input
						className="h-[51px] mb-[16px] w-full sm:w-[300px] md:w-[400px] lg:w-[488px] text-white"
						style={inputStyle}
						placeholder="New Password"
						name="newPassword"
						value={password.newPassword}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col sm:flex-row mt-[30px] justify-between">
					<p className="text-white mb-[20px] sm:mr-[160px] whitespace-nowrap">
						Confirm new Password
					</p>
					<Input
						className="h-[51px] mb-[16px] w-full sm:w-[300px] md:w-[400px] lg:w-[488px] text-white"
						style={inputStyle}
						placeholder="Confirm new Password"
						name="newPasswordConfirmation"
						value={password.newPasswordConfirmation}
						onChange={handleChange}
					/>
				</div>

				<div className="py-[24px] px-[16px] flex flex-col sm:flex-row items-center sm:justify-end">
					<button
						className="py-[10px] mr-[20px] px-[76px] text-white font-ProDisplayLight font-400 w-full sm:w-auto mb-4 sm:mb-0"
						style={buttonStyle}
					>
						Cancel
					</button>
					<button
						className="py-[10px] px-[36px] border-none outline-none font-ProDisplayLight font-400 w-full sm:w-auto"
						style={{
							...buttonStyle,
							background: 'rgba(40, 40, 40, 0.70)',
							color: '#F8F8F8',
						}}
						onClick={handlePasswordUpdate}
					>
						Update password
					</button>
				</div>
			</div>
		);
	}

	function ApplicationInfo() {
	const statusMap = {
		SUBMITTED: 'Ko’rib chiqilmoqda',
		APPROVED: 'Tasdiqlangan',
		REJECTED: 'Rad etilgan',
	};

	const statuses = Object.values(statusMap);
	const [selectedStatus, setSelectedStatus] = useState(statusMap.SUBMITTED);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5; // Number of items per page

	// Filtered applications based on selected status
	const filteredApplications = applications.filter(
		(app) => statusMap[app.status] === selectedStatus
	);

	// Calculate pagination
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedApplications = filteredApplications.slice(startIndex, endIndex);

	// Total pages
	const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div className="p-[24px] max-w-full md:w-[700px]">
			<p
				className="font-ProDisplay text-[20px] sm:text-[16px]"
				style={{ color: 'rgba(248, 248, 248, 0.95)' }}
			>
				My applications
			</p>

			<div
				className="flex mt-[24px] sm:w-[300px] md:w-[354px] rounded-[12px] px-[0px]"
				style={{ background: 'rgba(255, 255, 255, 0.15)' }}
			>
				{statuses.map((status) => (
					<p
						key={status}
						onClick={() => {
							setSelectedStatus(status);
							setCurrentPage(1); // Reset to first page on status change
						}}
						className={`font-ProDisplay rounded-[12px] text-[16px] sm:text-[14px] px-[12px] mr-[0px] py-[10px] cursor-pointer ${
							selectedStatus === status
								? 'rounded-[8px] bg-[rgba(255,255,255,0.15)] shadow-[0px_2px_7px_0px_rgba(0,0,0,0.07)]'
								: ''
						}`}
						style={{ color: 'rgba(248, 248, 248, 0.95)' }}
					>
						{status}
					</p>
				))}
			</div>

			<div className="mt-[20px] w-full">
				{paginatedApplications.map((app, index) => (
					<div
						key={app?.id || index}
						className="w-full mb-[10px] sm:w-[350px] md:w-[484px] p-[16px]"
						style={{
							borderRadius: '16px',
							border: '1px solid rgba(255, 255, 255, 0.10)',
							background:
								'var(--neutral-neutral-15, rgba(255, 255, 255, 0.05))',
							backdropFilter: 'blur(12.5px)',
						}}
					>
						<div className="flex items-center justify-between">
							<p
								className="font-ProDisplay w-[300px] overflow-hidden line-clamp-3 text-[20px] sm:text-[16px]"
								style={{
									color: 'rgba(248, 248, 248, 0.95)',
									wordBreak: 'break-word',
								}}
							>
								{app?.internship?.title || 'Title'}
							</p>
							<span
								className="font-ProDisplay text-[14px] px-[12px] py-[5px] rounded-[8px]"
								style={{
									color: 'rgba(248, 248, 248, 0.95)',
									background: '#32B141',
								}}
							>
								{selectedStatus}
							</span>
						</div>
						<p
							className="w-full w-[300px] overflow-hidden line-clamp-3 md:w-[401px] text-[16px] sm:text-[14px] font-ProDisplay mt-[16px]"
							style={{
								color: 'rgba(248, 248, 248, 0.70)',
								wordBreak: 'break-word',
							}}
						>
							{app?.internship?.shortDescription}
						</p>
						<div>
							<button
								className="px-[32px] py-[8px] text-white font-ProDisplay h-[40px] mt-[20px]"
								style={{
									borderRadius: '12px',
									border: '1px solid rgba(255, 255, 255, 0.40)',
									background: 'rgba(40, 40, 40, 0.70)',
								}}
								onClick={() => showModal(app)}
							>
								View
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-center mt-[20px]">
				{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
					<button
						key={page}
						onClick={() => handlePageChange(page)}
						className={`px-[12px] py-[6px] mx-[4px] rounded-[8px] ${
							page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'
						}`}
					>
						{page}
					</button>
				))}
			</div>
			<Modal
					title="To'liq matn"
					open={isModalVisible}
					onCancel={handleModalClose}
					footer={null}
				>
					<div className='flex justify-between'>
					<p className='mb-5 w-[300px] line-clamp-3 overflow-hidden'>{modalContent?.internship?.shortDescription}</p>
					<p>{modalContent.sessionId =='1'?'winter':modalContent.sessionId =='2'?'summer':'spring'}</p>
					</div>
					<Button>
						<a href={modalContent.cvUrl}>Resume <DownloadOutlined />
						</a>
					</Button>
				</Modal>
		</div>
	);
}


	return (
		<div className="flex flex-col min-h-screen " style={{}}>
			<Navbar />
			<div className="flex flex-col  sm:pl-[10px] md:pl-[10px] lg:flex-row xl:px-[270px] pt-[120px] justify-center">
				<div
					className="w-[304px] p-[16px] h-[350px] mt-[10px]"
					style={{
						borderRadius: '24px',
						border: '1px solid rgba(255, 255, 255, 0.05)',
						background: 'rgba(255, 255, 255, 0.05)',
						backdropFilter: 'blur(12.5px)',
					}}
				>
					<p className="font-ProDisplay text-white text-[18px] ml-[16px]">
						Profile
					</p>
					{options.map((option) => (
						<div
							key={option.id}
							onClick={() =>
								option.id === 4 ? option.action() : setSelectedOption(option.id)
							}
							className={`py-[12px] px-[12px] flex items-center mt-[22px] w-[272px] cursor-pointer ${
								selectedOption === option.id
									? 'bg-[rgba(232, 232, 232, 0.3)] text-white'
									: ''
							}`}
							style={{
								borderRadius: '16px',
								background:
									selectedOption === option.id
										? 'rgba(40, 40, 40, 0.85)'
										: 'transparent',
							}}
						>
							<img
								className="mr-[12px]"
								src={option.icon}
								alt={option.label}
								width={30}
								height={30}
								style={{ filter: option.id === 4 ? 'invert(100%)' : '' }}
							/>
							<p
								style={{ opacity: '2px', color: 'rgba(232, 227, 227, 0.7)' }}
								className="font-ProDisplay font-500"
							>
								{option.label}
							</p>
						</div>
					))}
				</div>
				<div
					className=" mt-[10px] sm:w-[600px] md:w-[600px] lg:w-[1040px] xl:w-[1040px] mx-auto md:ml-[20px] p-4 md:p-0"
					style={{
						borderRadius: '24px',
						border: '1px solid rgba(255, 255, 255, 0.05)',
						background: 'rgba(255, 255, 255, 0.05)',
						backdropFilter: 'blur(12.5px)',
					}}
				>
					{selectedOption !== 4 &&
						options.find((option) => option.id === selectedOption)?.content}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Profile;
{/* {selectedStatus === 'Tasdiqlangan' && (
						<div className="flex flex-wrap gap-5">
							{[...Array(3)].map((_, i) => (
								<div
									key={i}
									className="w-full sm:w-[350px] md:w-[484px] p-[16px]"
									style={{
										borderRadius: '16px',
										border: '1px solid rgba(255, 255, 255, 0.10)',
										background:
											'var(--neutral-neutral-15, rgba(255, 255, 255, 0.05))',
										backdropFilter: 'blur(12.5px)',
									}}
								>
									<div className="flex items-center justify-between">
										<p
											className="font-ProDisplay text-[20px] sm:text-[16px]"
											style={{ color: 'rgba(248, 248, 248, 0.95)' }}
										>
											Title
										</p>
										<span
											className="font-ProDisplay text-[14px] px-[12px] py-[5px] rounded-[8px]"
											style={{
												color: 'rgba(248, 248, 248, 0.95)',
												background: 'green',
											}}
										>
											Tasdiqlangan
										</span>
									</div>
									<p
										className="w-full md:w-[401px] text-[16px] sm:text-[14px] font-ProDisplay mt-[16px]"
										style={{ color: 'rgba(248, 248, 248, 0.70)' }}
									>
										Keep a close eye on your investments in the decentralized
										finance (DeFi) space and monitor the yields they generate.
									</p>
									<button
										className="px-[32px] py-[8px] text-white font-ProDisplay h-[40px] mt-[20px]"
										style={{
											borderRadius: '12px',
											border: '1px solid rgba(255, 255, 255, 0.40)',
											background: 'rgba(40, 40, 40, 0.70)',
										}}
									>
										View
									</button>
								</div>
							))}
						</div>
					)}

					{selectedStatus === 'Rad etilgan' && (
						<div className="flex flex-wrap gap-5">
							{[...Array(3)].map((_, i) => (
								<div
									key={i}
									className="w-full sm:w-[350px] md:w-[484px] p-[16px]"
									style={{
										borderRadius: '16px',
										border: '1px solid rgba(255, 255, 255, 0.10)',
										background:
											'var(--neutral-neutral-15, rgba(255, 255, 255, 0.05))',
										backdropFilter: 'blur(12.5px)',
									}}
								>
									<div className="flex items-center justify-between">
										<p
											className="font-ProDisplay text-[20px] sm:text-[16px]"
											style={{ color: 'rgba(248, 248, 248, 0.95)' }}
										>
											Title
										</p>
										<span
											className="font-ProDisplay text-[14px] px-[12px] py-[5px] rounded-[8px]"
											style={{
												color: 'rgba(248, 248, 248, 0.95)',
												background: 'red',
											}}
										>
											Rad etilgan
										</span>
									</div>
									<p
										className="w-full md:w-[401px] text-[16px] sm:text-[14px] font-ProDisplay mt-[16px]"
										style={{ color: 'rgba(248, 248, 248, 0.70)' }}
									>
										Keep a close eye on your investments in the decentralized
										finance (DeFi) space and monitor the yields they generate.
									</p>
									<button
										className="px-[32px] py-[8px] text-white font-ProDisplay h-[40px] mt-[20px]"
										style={{
											borderRadius: '12px',
											border: '1px solid rgba(255, 255, 255, 0.40)',
											background: 'rgba(40, 40, 40, 0.70)',
										}}
									>
										View
									</button>
								</div>
							))}
						</div>
					)} */}
import React, { useEffect, useState } from 'react';
import IT from '../../../../assets/icons/digit.svg';
import { Avatar, Button, Drawer, Select, Space } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {changeState} from '../../../../redux/slices/generelSlice'
import { useDispatch,useSelector } from 'react-redux';
import request from "@/services/api/index"
import { useTranslation } from 'react-i18next';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { i18n, t } = useTranslation();
	const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');
	const [visible, setVisible] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userType, setUserType] = useState(null);

	const changeLanguage = (language) => {

		i18n.changeLanguage(language.toLowerCase());
		setSelectedLanguage(language.toLowerCase());
		localStorage.setItem('language', language.toLowerCase());
	};
	const data_new = useSelector(state=>state.generelReducer);

	const getMe = async () => {
		try {
			const response = await request.get("account/auth/me");

			dispatch(changeState({
				name: 'data',
				value: response.data
			}));

		} catch (e) {
			console.log('Error', e);
		}
	};

	useEffect(() => {
		
		getMe();
		const token = localStorage.getItem('token');
		setIsLoggedIn(!!token);
		i18n.changeLanguage(selectedLanguage);

		
			try {
			  const tokenPayload = JSON.parse(atob(token.split('.')[1]));
			  const userType = tokenPayload.user_type;
			
			  if (userType) {
				setUserType(userType);
			  } else {
				console.error("Invalid token structure: user_type not found.");
			  }
			} catch (error) {
			  console.error("Failed to decode token:", error);
			}
		    console.log(userType,'ffffff')

		const handleResize = () => {
			if (window.innerWidth >= 768) { 
				setVisible(false);
			}
		};

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
		
	}, []);

	const showDrawer = () => {
		setVisible(true);
	};

	

	const onClose = () => {
		setVisible(false);
	};

	const handleClick = () => {
		if (isLoggedIn) {
			if (userType === "ADMIN") {
				navigate("/admin");
			} else {
				navigate("/profile");
			}
		} else {
			navigate("/login");
		}
	};
	

	return (
		<div className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6 lg:px-[48px] lg:py-8">
			{/* Left side: Logo */}
			<div className="flex items-center">
				<img
					onClick={() => navigate('/')}
					className="w-[48px] h-[50px] md:h-10 mr-8 cursor-pointer"
					src={IT}
					alt="IT Skills"
				/>
				{/* Menu for larger screens */}
				<ul className="hidden md:flex items-center space-x-8">
					<li><a onClick={() => navigate('/')} className="cursor-pointer text-base md:text-lg font-ProDisplay font-medium text-white">{t("home")}</a></li>
					<li><a onClick={() => navigate('/internship500')} className="cursor-pointer text-base md:text-lg font-ProDisplay font-medium text-white">{t("internships")}</a></li>
					<li><a onClick={() => navigate('/about')} className="cursor-pointer text-base md:text-lg font-ProDisplay font-medium text-white">{t("about")}</a></li>
					<li><a onClick={() => navigate('/contact')} className="cursor-pointer text-base md:text-lg font-ProDisplay font-medium text-white">{t("contact")}</a></li>
				</ul>
				{/* Drawer toggle button for small screens */}
				<Button className="absolute right-[10px] md:hidden" icon={<MenuOutlined />} onClick={showDrawer} />
			</div>

			{/* Right side: Language Selector, Button */}
			<div className="flex items-center space-x-4">
				<Select
					defaultValue={selectedLanguage.toUpperCase()}
					style={{ width: 60 }}
					options={[
						{ value: 'UZ', label: 'Uz' },
						{ value: 'EN', label: 'En' },
						{ value: 'RU', label: 'Ru' },
					]}
					className="hidden md:block"
					onChange={changeLanguage}
				/>
				<button
				onClick={handleClick}
					className="hidden md:block border-none outline-none px-[20px] py-[8px] rounded-[10px]"
					style={{
						background: 'rgba(40, 40, 40, 0.70)',
						boxShadow: '0px 1px 2px 0px rgba(3, 7, 18, 0.40), 0px 0px 0px 1px rgba(3, 7, 18, 0.80), 0px 0.75px 0px 0px rgba(255, 255, 255, 0.20) inset',
					}}
				>
					<p className="font-ProDisplay font-medium text-base text-white">
						{userType === "ADMIN" ? "Admin" : userType === "USER_CLIENT" ? "Profile" : t("login_profile")}
					</p>				
					</button>
			</div>

			{/* Drawer for small screens */}
			<Drawer
				style={{
					background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.10) 100%), #324ECF',
				}}
				title="Menu"
				placement="left"
				onClose={onClose}
				open={visible}
				width={200}
				footer={null}
			>
				<ul className="list-none p-4">
					<li><a onClick={() => navigate('/internship500')} className="block py-2 text-white">Internships</a></li>
					<li><a onClick={() => navigate('/')} className="block py-2 text-white">Home</a></li>
					<li><a onClick={() => navigate('/about')} className="block py-2 text-white">About</a></li>
					<li><a onClick={() => navigate('/contact')} className="block py-2 text-white">Contact</a></li>
				</ul>
				<Select
					defaultValue={selectedLanguage.toUpperCase()}
					style={{ width: 120 }}
					options={[
						{ value: 'UZ', label: 'UZ' },
						{ value: 'EN', label: 'EN' },
						{ value: 'RU', label: 'RU' },
					]}
					className="block mb-4"
					onChange={changeLanguage}
				/>
				<button
				onClick={handleClick}
					className="border-none outline-none px-4 py-2 rounded-md mb-4"
					style={{
						background: 'rgba(40, 40, 40, 0.70)',
						boxShadow: '0px 1px 2px 0px rgba(3, 7, 18, 0.40), 0px 0.75px 0px 0px rgba(255, 255, 255, 0.20) inset',
					}}
				>
					<p className="font-ProDisplay font-medium text-base text-white">{userType === "ADMIN" ? "Admin" : userType === "USER_CLIENT" ? "Profile" : t("login_profile")}</p>
				</button>
			</Drawer>
		</div>
	);
};

export default Navbar;

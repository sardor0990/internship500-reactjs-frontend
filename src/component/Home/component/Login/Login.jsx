import React, { useState, useEffect } from 'react';
import logoWhite from '../../../../assets/img/logo-white.png';
import avatar from '../../../../assets/img/Avatar.png';
import googleIcon from '../../../../assets/img/googleIcon.png';
import { InputBackground } from './style';
import { Button } from '@/component/generics';
import { message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import request from '@/services/api/index';
import { useTranslation } from 'react-i18next';


const Login = () => {
	const { t } = useTranslation();

	const navigate = useNavigate();

	const [rememberMe, setRememberMe] = useState(false);
	const [data, setLoginData] = useState({
		login: '',
		password: '',
	});

	// password toggle
	const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleCheckBoxChange = (e) => {
		setRememberMe(e.target.checked);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await request.post('account/auth/sign-in', { data });
			if (res.status === 200) {
				setLoginData(res.data);
				const accessToken = res.data.data.accessToken;
				const timestamp = new Date().getTime();

				if (rememberMe) {
					localStorage.setItem('token', accessToken);
				} else {
					localStorage.setItem('token', accessToken);
					localStorage.setItem('tokenTimeStamp', timestamp);
				}

				// Decode the token to get the user type
				try {
					const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));

					// Ensure the token has a 'user_type' field
					const userType = tokenPayload.user_type;
					if (userType) {
						if (userType === 'ADMIN') {
							console.log('admin');
							navigate('/admin/users');
						} else if (userType === 'USER_CLIENT') {
							console.log('user');
							navigate('/profile');
						} else {
							throw new Error('Unrecognized user type.');
						}
						message.success('Boshqaruv paneli muvaffaqqiyatli ochildi!');
					} else {
						throw new Error('Invalid token structure: user_type not found.');
					}
				} catch (error) {
					console.error('Error decoding token:', error);
					message.error('Login yoki parol xato');
				}

			} else {
				alert('Login yoki parol xato');
				message.error('Login yoki parol xato');
			}
		} catch (error) {
			message.error('Login yoki parol xato');
		}
	};

	return (
		<div>
			<section>
				<div className="w-full flex flex-col md:flex-row h-screen">
					{/* Left Side */}
					<div 
					className="w-full md:w-1/2 bg-white px-[32px] py-[32px] flex flex-col justify-between"
					>
						<img
							src={logoWhite}
							alt="logo"
							width={48}
							height={48}
							onClick={() => navigate('/')}
							className="cursor-pointer"
						/>

						<div className="flex flex-col items-center justify-center h-full">
							<div className="w-full max-w-[550px] text-center">
								<p className="text-[#101828] font-inter text-[30px] font-[500] leading-[38px] mb-[32px]">
									{t('register_title')}
								</p>

								<div className="flex justify-center mb-[16px]">
									<img src={avatar} alt="avatar" width={64} height={64} />
								</div>

								<p className="text-[#101828] font-[600] text-[16px] leading-[24px] font-inter mb-[4px]">
									Pippa Wilkinson
								</p>
								<p className="text-[#475467] font-inter text-[14px] leading-[20px] font-[500]">
									ITIC HR Manager
								</p>
							</div>
						</div>

						<p className="text-[#000] mt-4">{t('all_rights')}</p>
					</div>

					{/* Right Side */}
					<div className="w-full md:w-1/2">
						<div className="flex flex-col items-center justify-center h-full w-full">
							<div className="w-full items-start max-w-[484px] mb-[32px]">
								<h2 className="text-white font-inter text-[30px] font-[600] leading-[38px] tracking-[-0.72px] mb-[12px] text-left">
									{t('welcome_back')}
								</h2>
								<p className="text-white font-inter text-[16px] font-[400] leading-[24px] text-left opacity-70">
									{t('please_enter_your_details')}
								</p>
							</div>

							<form action="" className="w-full max-w-[480px]">
								<InputBackground
									type="email"
									placeholder={t('email')}
									className="w-full max-w-[480px] outline-none px-[16px] py-[16px] text-white font-inter text-[14px] font-[400] leading-[24px] mb-[24px]"
									name="login"
									value={data.login}
									onChange={handleChange}
								/>
								<div className="relative w-full max-w-[480px] mb-[24px]">
									<InputBackground
										type={showPassword ? 'text' : 'password'}
										placeholder="Password"
										className="w-full outline-none px-[16px] py-[16px] text-white font-inter text-[14px] font-[400] leading-[24px]"
										name="password"
										value={data.password}
										onChange={handleChange}
									/>
									<div
										className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
										onClick={togglePasswordVisibility}
									>
										{showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
									</div>
								</div>
								

								{/* <div className="flex mb-[24px] items-center">
									<input
										type="checkbox"
										id="rememberMe"
										className="mr-2 outline-none w-[16px] h-[16px] focus:outline-none"
										checked={rememberMe}
										onChange={handleCheckBoxChange}
									/>
									<label htmlFor="rememberMe" className="text-white">
										{t('remember_for_30_days')}
									</label>
								</div> */}
								<Button
									className="max-w-[480px] max-h-[56px] mb-[16px]"
									width={'100%'}
									padding={'10px 18px'}
									height={'56px'}
									bgcolor={'rgba(40, 40, 40, 0.70)'}
									hovercolor={'#fff'}
									radius={'12px'}
									onClick={handleSubmit}
								>
									{t('sign_in')}
								</Button>
								{/* <Button
									className="max-w-[480px] max-h-[56px]"
									width={'100%'}
									padding={'10px 18px'}
									height={'56px'}
									bgcolor={'#fff'}
									hovercolor={'#344054'}
									radius={'12px'}
								>
									<img src={googleIcon} alt="icon" width={24} height={24} />
									{t('sign_in_with_google')}
								</Button> */}
							</form>

							<p className="font-inter text-white text-[14px] font-[400] leading-[20px]">
								Don’t have an account?{' '}
								<span>
									<a
										href=""
										className="text-[#282828] opacity-70 font-[600] ml-[4px]"
										onClick={() => navigate('/registration')}
									>
										{t('sign_up')}
									</a>
								</span>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;

import React, { useState } from 'react'
import logoWhite from '../../../../assets/img/logo-white.png';
import avatar from '../../../../assets/img/Avatar.png';
import googleIcon from '../../../../assets/img/googleIcon.png';
import {InputBackground}  from './style';
import { Button } from '@/component/generics';
import { message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import request from "@/services/api/index"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Registration = () => {

    const {t} = useTranslation();
  
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [data, setRegister] = useState({
        firstName: "",
        lastName: "",
        login: "",
        password: "",
        copyPassword: "",
    })

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    

  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister(prevState => ({ ...prevState, [name]: value }));
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!emailRegex.test(data.login)) {
          console.log('enter valid email');
            return message.error('Please enter a valid email address.');
            
        }

          if(data.password !== data.copyPassword){
            return message.error('Passowrds do not match');
          }
    
    

    
        try {
            const res = await request.post("account/auth/sign-up", { data });
			console.log(data)
            console.log("Form submission triggered");
            if (res.status == 200) {
                navigate("/login");
                message.success('Boshqaruv paneli muvaffaqqiyatli ochildi!');
            } else {
                message.error('Login yoki parol xato');
            }
        } catch (error) {
          if (error.response && error.response.status === 409) {
            message.error('An account with this email already exists.');
        } else {
            message.error('Something went wrong. Please try again.');
        }
      }
    };
      

  return (
		<div>
			<section>
				<div className="w-full flex flex-col md:flex-row h-screen">
					{/* Left Side */}
					<div className="w-full md:w-1/2 bg-white px-[32px] py-[32px]  flex flex-col justify-between">
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
									{t('sign_up')}
								</h2>
								<p className="text-white font-inter text-[16px] font-[400] leading-[24px] text-left opacity-70">
									{t('please_enter_your_details')}
								</p>
							</div>

							<form
								action=""
								className="w-full max-w-[480px] mb-[32px]"
								onSubmit={handleSubmit}
							>
								<InputBackground
									type="text"
									placeholder={t('first_name')}
									className="w-full max-w-[480px] outline-none px-[16px] py-[16px] text-white font-inter text-[14px] font-[400] leading-[24px] mb-[24px]"
									name="firstName"
									value={data.firstName}
									onChange={handleChange}
								/>
								<InputBackground
									type="text"
									placeholder={t('last_name')}
									className="w-full max-w-[480px] outline-none px-[16px] py-[16px] text-white font-inter text-[14px] font-[400] leading-[24px] mb-[24px]"
									name="lastName"
									value={data.lastName}
									onChange={handleChange}
								/>
								<InputBackground
									type="mail"
									placeholder={t('email')}
									className="w-full max-w-[480px] outline-none px-[16px] py-[16px] text-white font-inter text-[14px] font-[400] leading-[24px] mb-[24px]"
									name="login"
									value={data.login}
									onChange={handleChange}
								/>
								<div className="relative w-full max-w-[480px] mb-[24px]">
									<InputBackground
										type={showPassword ? 'text' : 'password'}
										placeholder={t('password')}
										className="w-full max-w-[480px] outline-none px-[16px] py-[16px] text-white font-inter text-[14px] font-[400] leading-[24px] mb-[24px]"
										name="password"
										value={data.password}
										onChange={handleChange}
									/>
									<div
										className="absolute inset-y-0 right-4 bottom-6 flex items-center cursor-pointer"
										onClick={togglePasswordVisibility}
									>
										{showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
									</div>
								</div>
								<div className="relative w-full max-w-[480px] mb-[24px]">
									<InputBackground
										type={showPassword ? 'text' : 'password'}
										placeholder={t('confirm_password')}
										className="w-full max-w-[480px] outline-none px-[16px] py-[16px] text-white font-inter text-[14px] font-[400] leading-[24px] mb-[24px]"
										name="copyPassword"
										value={data.copyPassword}
										onChange={handleChange}
									/>
									<div
										className="absolute inset-y-0 right-4 bottom-6 flex items-center cursor-pointer"
										onClick={togglePasswordVisibility}
									>
										{showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
									</div>
								</div>
								<Button
									type="submit"
									onClick={handleSubmit}
									className="max-w-[480px] max-h-[56px] mb-[-10px]"
									width={'100%'}
									padding={'10px 18px'}
									height={'56px'}
									bgcolor={'rgba(40, 40, 40, 0.70)'}
									hovercolor={'#fff'}
									radius={'12px'}
								>
									{t('sign_up')}
								</Button>
								{/* <Button className="max-w-[480px] max-h-[56px]" width={'100%'} padding={'10px 18px'} height={'56px'} bgcolor={'#fff'} hovercolor={'#344054'} radius={'12px'}><img src={googleIcon} alt="icon" width={24} height={24}/>{t("sign_up_with_google")}</Button> */}
							</form>

							<p className="font-inter text-white text-[14px] font-[400] leading-[20px]">
								{t('already_have_account')}
								<span>
									<a
										href=""
										className="text-[#282828] opacity-70 font-[600] ml-[4px]"
										onClick={() => navigate('/login')}
									>
										{t('login')}
									</a>
								</span>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Registration

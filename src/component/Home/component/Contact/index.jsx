import React, { useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../../Footer'
import { CardBackground, InputBackground, TextAreaBackground } from './style'
import phoneIcon from '../../../../assets/icons/call-calling.svg';
import messageIcon from '../../../../assets/icons/message-chat-circle.svg';
import girlImage from '../../../../assets/img/girl3-modified.png';
import ministry from '../../../../assets/img/ministry.jpg';
import { Button } from '@/component/generics';
import { message } from "antd";
import request from "@/services/api/index"
import { useTranslation } from 'react-i18next';


const Contact = () => {

  const {t} = useTranslation();

  const [data, setContactData] = useState({
    userName: "",
    title: "",
    comment: "",
    userEmail: "",
})

const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData(prevState => ({ ...prevState, [name]: value }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await request.post("admin/call-requests", {data}, {
        headers: {
          Authorization: null
        }
      });
      if(res.status === 200){
        setContactData(res.data);
        message.success("Xabar jo'natildi");
      } else {
        alert('Xato bor');
        message.error('Xato bor');
      }
        
    } catch (error) {
      message.error('Xato bor');
    }
  };

  return (
    <div>
      <Navbar/>

      <section className=' px-4 md:px-32 lg:px-[278px] py-20 text-white justify-between'>
        <div className='flex flex-col items-center'>
        {/* First Row */}
        <CardBackground className=' flex flex-col  px-[60px] py-[60px] mb-[80px]'>
             {/* First Row -> first row */}
            <div className='flex mb-[64px] gap-[96px] max-sm:flex-col justify-center '>
                <div className='ml-[-40px] md:w-1/2 max-w-[560px] pl-[32px]'>
                    <p className='text-white font-inter text-[16px] font-[600] leading-[24px] mb-[12px]'>{t("contact_us")}</p>
                    <h2 className=' text-white font-inter text-[36px] font-[600] leading-[44px] tracking-[-0.72px] mb-[20px]'>{t("contact_title")}</h2>
                    <p className='text-white font-inter text-[20px] font-[400] leading-[30px]'>{t("get_in_touch")}</p>
                </div>

                <div className='w-full md:w-1/2 max-w-[560px]'>
                    <div className='flex items-start gap-[16px] mb-7'>
                        <img src={phoneIcon} alt="Phone" width={24} height={24}/>
                        <div>
                            <p className='text-white font-inter text-[20px] font-[600] leading-[30px]'>{t("call_us")}</p>
                            <p className='text-white font-inter text-[16px] font-[400] leading-[24px]'>+998(71)238-43-58</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-[16px] pr-[32px]'>
                        <img src={messageIcon} alt="Chat" width={24} height={24}/>
                        <div>
                            <p className='text-white font-inter text-[20px] font-[600] leading-[30px]'>{t("chat_to_support")}</p>
                            <p className='text-white font-inter text-[16px] font-[400] leading-[24px]'>internship@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

             {/* First Row -> second row */}
             <div>
                <img src={ministry} alt="girl image" className='w-full max-w-[1240px] h-auto rounded-[50px]' />
             </div>
        </CardBackground>

        <CardBackground className='w-full max-w-[1364px] px-[60px] py-[60px] '>
            {/* First Row -> first row */}
           <div className='flex flex-col justify-center items-center'>
            <div className='w-full md:w-1/2 text-center mb-[64px]'>
              <p className='text-white font-inter text-[16px] font-[600] leading-[24px] mb-[12px]'>{t("contact_us")}</p>
              <h2 className='text-white font-inter text-[36px] font-[600] leading-[44px] tracking-[-0.72px] mb-[20px]'>{t("contact_title")}</h2>
              <p className='text-white font-inter text-[20px] font-[400] leading-[30px]'>{t("get_in_touch")}</p>
            </div>

            <div className='w-full flex flex-col items-center text-center'>
              <form action="" className='w-full max-w-[480px]'>
                <InputBackground type="text" placeholder={t("full_name")} className='w-full max-w-[480px] outline-none px-[16px] py-[16px] text-white font-inter text-[14px] font-[400] leading-[24px] mb-[24px]' name="userName" value={data.userName} onChange={handleChange}/>
                <InputBackground type="text" placeholder={t("title")} className='w-full max-w-[480px] outline-none px-[16px] py-[16px] text-white font-inter text-[14px] font-[400] leading-[24px] mb-[24px]' name="title" value={data.title} onChange={handleChange}/>
                <InputBackground type="email" placeholder={t("email")} className='w-full max-w-[480px] outline-none px-[16px] py-[16px] text-white font-inter text-[14px] font-[400] leading-[24px] mb-[24px]' name="userEmail" value={data.userEmail} onChange={handleChange}/>
                <TextAreaBackground type="text" placeholder={t("message")} className='w-full max-w-[480px] outline-none px-[16px] py-[16px] text-white font-inter text-[14px] font-[400] leading-[24px] max-h-[120px] mb-[32px]' name="comment" value={data.comment} onChange={handleChange}/>

                <Button className="max-w-[480px] max-h-[56px]" width={'100%'} padding={'10px 18px'} height={'56px'} bgcolor={'#fff'} hovercolor={'#000'} radius={'12px'} onClick={handleSubmit}>{t("send_message")}</Button>
              </form>
            </div>
           </div>
        </CardBackground>
        </div>
      </section>  

      <Footer/>
    </div>
  )
}

export default Contact

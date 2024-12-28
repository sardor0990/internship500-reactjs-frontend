import React, { useMemo } from 'react';
import Star from '../../../../../assets/icons/premiumstar.svg';
import Search from '../../../../../assets/icons/search.svg';
import { Input } from 'antd';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import CountUp from 'react-countup';
import { motion } from "framer-motion";
import CardImg from '../../../../../assets/img/cardimg1.png'


const HeadSection = () => {

  const navigate = useNavigate();
  const {t} = useTranslation();
  const fadeInVariant = useMemo(()=>({
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }))
  const Seasons=[
    {
      name: (t("spring_title")),
     description:(t("spring"))
    },
    {
      name:(t("summer_title")),
      description:(t("summer"))    
    },
    {
      name:(t("winter_title")),
      description:(t("winter"))   
     }
  ]

	return (
		<div className="flex flex-col items-center px-4 sm:px-6 lg:px-8" style={{borderTop: 'var(--unit-0, 1px) solid rgba(235, 217, 241, 0.05)',borderRadius: '1920px',
			background: 'radial-gradient(82.92% 62.68% at 50% 50%, #4F46E5 0%, rgba(79, 70, 229, 0.00) 55%)',
			strokeWidth: '1px',
			stroke: 'rgba(41, 144, 65, 0.04)'}}>
			
			<div className="mt-8 lg:mt-[80px] rounded-[50px] lg:rounded-[100px] w-full max-w-[489px] px-[16px] py-[8px] flex items-center justify-between bg-white/5 mx-auto">
				<img src={Star} className="mr-[8px]" alt="Premium Icon" />
				<span className="text-[14px] sm:text-[16px] font-ProDisplay font-400 text-white mr-[16px]">
					{t("where_does_it_come_from")}
				</span>
				<span
					className="text-[14px] sm:text-[16px] font-ProDisplay font-400 ml-[16px]"
					style={{ color: '#23CE70' }}
				>
					{t("why_we_use_it")}
				</span>
			</div>

			{/* Title & Search Section */}
			

<div className="text-center flex flex-col items-center mt-[40px] mb-[24px]">
  {/* Animated Heading */}
  <motion.h1
    className="w-full max-w-[790px] text-[32px] md:text-[40px] lg:text-[56px] font-ProDisplayBold font-700 text-white tracking-[1px]"
    variants={fadeInVariant}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.8, delay: 0 }}
  >
    {t("home_title")}
  </motion.h1>

  {/* Animated Paragraph */}
  <motion.p
    className="w-full max-w-[641px] text-[16px] sm:text-[20px] font-ProDisplay font-400 text-white/80 mt-4"
    variants={fadeInVariant}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    {t("home_description")}
  </motion.p>

  {/* Animated Input */}
  <motion.div
    className="w-full max-w-[524px]"
    variants={fadeInVariant}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.8, delay: 0.6 }}
  >
    <Input
      className="text-white w-full h-[54px] mt-[40px] border-none"
      style={{
        caretColor: "white",
        background:
          "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(248, 248, 248, 0.00) 54.17%), rgba(248, 248, 248, 0.02)",
        boxShadow: "2px 4px 16px rgba(248, 248, 248, 0.06) inset",
        backdropFilter: "blur(50px)",
      }}
      placeholder={t("search")}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
          e.preventDefault();
            navigate(`/internships?search=${e.target.value}`);
          }
      }}
      prefix={
        <img
          src={Search}
          alt="search-icon"
          style={{ width: "20px", height: "20px" }}
        />
      }
    />
  </motion.div>
</div>

			<div
  className="flex flex-col flex-wrap md:flex-row items-center justify-between max-w-full md:w-[1364px] py-8 md:py-[72px] px-6 md:px-[24px] mt-[48px] md:mt-[138px] mb-8 md:mb-[96px] rounded-[32px]"
  style={{
    background: 'var(--neutral-neutral-15, rgba(255, 255, 255, 0.05))',
    backdropFilter: 'blur(16px)',
  }}
>
  <p
    className="text-[16px] md:text-[18px] font-normal mr-0 md:mr-[30px] w-full md:w-[285px] ml-0 md:ml-[80px] text-center md:text-left"
    style={{
      fontFamily: 'Inter',
      color: 'rgba(255, 255, 255, 0.80)',
      lineHeight: '28px',
    }}
  >
    {t("very_good")}<br />{t("performance")}<br />{t("achieved")}
  </p>
  
  <div
    className="flex flex-col  w-full md:w-[251px] px-4 md:px-[30px] my-4 md:my-0"
    style={{
      borderLeft: '2px solid rgba(255, 255, 255, 0.10)',
      borderRight: '2px solid rgba(255, 255, 255, 0.10)',
    }}
  >
   
    <p
      className="text-[48px] md:text-[64px] font-bold text-white text-center md:text-left"
      style={{ fontFamily: 'Inter' }}
    >
<CountUp start={0} end={750} duration={2} />+    
</p>
    <span
      className="text-[16px] md:text-[18px] font-normal text-center md:text-left"
      style={{ fontFamily: 'Inter', color: 'rgba(255, 255, 255, 0.80)' }}
    >
      {t("users")}
    </span>
  </div>
  
  <div
    className="w-full text-center md:w-[251px] px-4 md:px-[30px] my-4 md:my-0 md:text-start"
    style={{ borderRight: '2px solid rgba(255, 255, 255, 0.10)' }}
  >
    <p
      className="text-[48px] md:text-[64px] font-bold text-white text-center md:text-left"
      style={{ fontFamily: 'Inter' }}
    >
<CountUp start={0} end={750} duration={2} />+    
</p>
    <span
      className="text-[16px] md:text-[18px] font-normal text-center md:text-left"
      style={{ fontFamily: 'Inter', color: 'rgba(255, 255, 255, 0.80)' }}
    >
      {t("internships")} 
    </span>
  </div>
  
  <div className="w-full text-center md:w-[251px] px-4 md:px-[30px] my-4 md:my-0 md:text-start">
    <p
      className="text-[48px] md:text-[64px] font-bold text-white text-center md:text-left"
      style={{ fontFamily: 'Inter' }}
    >
<CountUp start={0} end={50} duration={2} />+    
</p>
    <span
      className="text-[16px] md:text-[18px] font-normal text-center md:text-left"
      style={{ fontFamily: 'Inter', color: 'rgba(255, 255, 255, 0.80)' }}
    >
      {t("applications")} 
    </span>
  </div>
</div>

<div className="flex justify-center px-4">
  <div className="mb-[96px]  mt-[56px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-[16px] w-full lg:px-[170px] ">
    {Seasons.map((item, index) => (
      <div
        key={index}
        className="bg-[#ffffff0d] rounded-[14px] p-[16px] flex flex-col items-center"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.10)',
          backdropFilter: 'blur(12.5px)',
        }}
      >
        <div className="flex flex-col justify-between mt-[8px] w-full">
          <span
            className="line-clamp-1 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-bold py-[4px] overflow-hidden"
            style={{
              color: 'white',
              fontFamily: 'Inter',
            }}
          >
            {item.name}
          </span>

          <p
            className="mt-[8px] mb-[20px] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[16px] font-[500] w-full"
            style={{
              color: 'rgba(248, 248, 248, 0.95)',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {item.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>


		
		</div>
	);
};

export default HeadSection;

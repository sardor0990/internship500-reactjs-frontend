import React, { useMemo } from 'react';
import Navbar from '../Navbar';
import Footer from '../../Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const About = () => {

	const {t} = useTranslation();
	const fadeIn = useMemo(()=>({
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
	}),[])
	
	const fadeInLeft = useMemo(()=>({
		hidden: { opacity: 0, x: -50 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
	}),[])

	const fadeInRight = useMemo(()=>({
		hidden: { opacity: 0, x: 200 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
	}), [])
		
	
	

	return (
		<div>
			<Navbar />

			<section className="px-4 md:px-32 lg:px-[278px] py-20 text-white">
				
				<div className="flex">
			<div className="w-full md:w-1/2">
				<motion.p
					className="text-white text-opacity-80 font-inter text-[16px] font-[600] leading-[24px]"
					initial="hidden"
					animate="visible"
					variants={fadeIn}
				>
					{t("about")}
				</motion.p>
			</div>
		</div>

		<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[96px]">
			<motion.div
				className="w-full md:w-1/2 max-w-[768px]"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeInLeft}
			>
				<h2 className="font-inter text-[48px] font-[600] leading-[60px] tracking-[-0.96px]">
					{t("empowering_growth_through")}
				</h2>
			</motion.div>
			<motion.div
				className="w-full md:w-1/2 max-w-[532px]"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeInRight}
			>
				<p className="font-inter text-[20px] font-[400] leading-[30px] opacity-80">
					{t("home_description")}
				</p>
			</motion.div>
		</div>

				<div
					className="flex flex-col flex-wrap md:flex-col items-center justify-between max-w-full md:w-[1364px] py-8 md:py-[72px] px-6 md:px-[24px] mt-[48px] md:mt-[138px] mb-8 md:mb-[96px] rounded-[32px] lg:flex-col items-center xl:flex-row justify-center"
					style={{
						background: 'var(--neutral-neutral-15, rgba(255, 255, 255, 0.05))',
						backdropFilter: 'blur(16px)',
					}}
				>
					{/* <p
						className="text-[16px] md:text-[18px] font-normal mr-0 md:mr-[30px] w-full md:w-[285px] ml-0 md:ml-[80px] text-center md:text-left"
						style={{
							fontFamily: 'Inter',
							color: 'rgba(255, 255, 255, 0.80)',
							lineHeight: '28px',
						}}
					>
						{t("very_good")}
						<br /> {t("performance")}
						<br /> {t("achieved")}
					</p> */}

					<div
						className="flex  flex-col  w-full md:w-[251px] px-4 md:px-[30px] my-4 md:my-0"
						// style={{
						// 	borderLeft: '2px solid rgba(255, 255, 255, 0.10)',
						// 	borderRight: '2px solid rgba(255, 255, 255, 0.10)',
						// }}
					>
						<p
							className=" text-[48px] md:text-[64px] font-bold text-white text-center md:text-left"
							style={{ fontFamily: 'Inter' }}
						>
							<CountUp start={0} end={750} duration={2} />+
						</p>
						<span
							className="text-[16px] md:text-[18px] font-normal text-center md:text-left"
							style={{
								fontFamily: 'Inter',
								color: 'rgba(255, 255, 255, 0.80)',
							}}
						>
							{t("users")}
						</span>
					</div>

					<div
						className="w-full text-center md:w-[251px] px-4 md:px-[30px] my-4 md:my-0 md:text-start"
						// style={{ borderRight: '2px solid rgba(255, 255, 255, 0.10)' }}
					>
						<p
							className="text-[48px] md:text-[64px] font-bold text-white text-center md:text-left"
							style={{ fontFamily: 'Inter' }}
						>
							<CountUp start={0} end={750} duration={2} />+
							</p>
						<span
							className="text-[16px] md:text-[18px] font-normal text-center md:text-left"
							style={{
								fontFamily: 'Inter',
								color: 'rgba(255, 255, 255, 0.80)',
							}}
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
							style={{
								fontFamily: 'Inter',
								color: 'rgba(255, 255, 255, 0.80)',
							}}
						>
							{t("applications")}
						</span>
					</div>
				</div>

				{/* Third Row - Two Columns */}
				<div className="flex mb-[64px]">
					<div className="w-full md:w-1/2">
						<p className="text-white text-opacity-80 font-inter text-[16px] font-[600] leading-[24px] mb-[12px]">
							{t("about")}
						</p>
						<h2 className="font-inter text-[36px] font-[600] leading-[44px] tracking-[-0.72px] text-white mb-[20px]">
							{t("we_are_just_getting_started")}
						</h2>
						<p className="font-inter text-[20px] font-[400] leading-[30px] opacity-80">
							{t("we_helped_4000")}
						</p>
					</div>
				</div>

				<div className="flex flex-col md:flex-row justify-between">
					<div className="w-full md:w-1/2 max-w-[650px]">
						<p className="text-white opacity-80 font-inter text-[18px] font-[400] leading-[28px] mb-5">
                        	{t("about_page_text_1")}
						</p>
						<p className="text-white opacity-80 font-inter text-[18px] font-[400] leading-[28px] mb-5">
							{t("about_page_text_2")}

						</p>
						<p className="text-white opacity-80 font-inter text-[18px] font-[400] leading-[28px]">
							{t("about_page_text_3")}
						</p>
					</div>

					<div className="w-full md:w-1/2 max-w-[650px]">
						<p className="text-white opacity-80 font-inter text-[18px] font-[400] leading-[28px] mb-5">
							{t("about_page_text_4")}
						</p>
						<p className="text-white opacity-80 font-inter text-[18px] font-[400] leading-[28px] mb-5">
							{' '}
							{t("about_page_text_5")}
						</p>
						<p className="text-white opacity-80 font-inter text-[18px] font-[400] leading-[28px]">
							{' '}
							{t("about_page_text_6")}
						</p>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default About;

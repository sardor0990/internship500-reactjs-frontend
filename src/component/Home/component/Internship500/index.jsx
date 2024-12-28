import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../Navbar';
import { Input, Pagination } from 'antd';
import Search from '../../../../assets/icons/search.svg';
import More from '../../../../assets/icons/more.svg';
import CardImg from '../../../../assets/img/cardimg2.png'
import Footer from '../../Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
export default function Internship500() {

	const {t, i18n} = useTranslation();

	const navigate = useNavigate();

	const [internships, setInternships] = useState([]);
	const [visibleCards, setVisibleCards] = useState(); // Show initial 6 cards

	const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

	const handleTableChange = (newPagination) => {

        setPagination((prevPagination) => ({

        ...prevPagination,

        current: newPagination,

        pageSize: newPagination.pageSize || prevPagination.pageSize,

        }));

    };

	const GoDetail = (id, photoUrl) => {
		const resolvedPhotoUrl = photoUrl || CardImg; // Use CardImg if photoUrl is empty or falsy
		navigate(`/internship500/detail/${id}`, { state: { photoUrl: resolvedPhotoUrl } });
	};
	

	useEffect(() => {
		axios
			.get(`https://api.internship500.itskills.uz/api/admin/internships?page=${pagination.current - 1}`)
			.then((res) => {
				if (res.data && Array.isArray(res.data.data)) {
					setInternships(res.data.data);
					// Update pagination total based on API response
					setPagination((prevPagination) => ({
						...prevPagination,
						total: res.data.pagination.totalElements, // Update this line to reflect the total count from API
					}));
				} else {
					console.error("Unexpected response format:", res.data);
					setInternships([]);
				}
			})
			.catch((error) => {
				console.error("Error fetching internships:", error);
				setInternships([]);
			});
	}, [pagination.current]);

	// Function to show more cards
	const showMoreCards = () => {
		setVisibleCards((prev) => prev + 3); 
	};

	const getTitle = useMemo(() => {
		return (internship) => {
			switch (i18n.language) {
				case "ru":
					return internship.titleRu || internship.title;
				case "uz":
					return internship.titleUz || internship.title;
				default:
					return internship.title;
			}
		};
	}, [i18n.language]);

	const getShortDescription = useMemo(() => {
		return (internship) => {
			switch (i18n.language) {
				case "ru":
					return internship.shortDescriptionRu || internship.shortDescription;
				case "uz":
					return internship.shortDescriptionUz || internship.shortDescription;
				default:
					return internship.shortDescription;
			}
		};
	}, [i18n.language]);

	const getFullDescription = useMemo(() => {
		return (internship) => {
			switch (i18n.language) {
				case "ru":
					return internship.fullDescriptionRu || internship.fullDescription;
				case "uz":
					return internship.fullDescriptionUz || internship.fullDescription;
				default:
					return internship.fullDescription;
			}
		};
	}, [i18n.language]);
	const containerVariants = useMemo(()=>({
		hidden: { opacity: 0, y: 50 },
		visible: {
		  opacity: 1,
		  y: 0,
		  transition: {
			duration: 0.6,
			staggerChildren: 0.2,
		  },
		},
	}),[])
		
	
	
	  const childVariants = useMemo(()=>({
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	  }),[])
		
	  

	return (
		<div className="relative min-h-screen flex flex-col">
			<Navbar />
			<div>
				<motion.div
					className="flex flex-col flex-grow items-center text-center px-4"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={containerVariants}
				>
					<motion.h1
						className="mt-10 mb-6 w-full md:w-[790px] text-3xl md:text-[56px] font-ProDisplayBold font-700 text-white"
						variants={childVariants}
					>
						Internship500
					</motion.h1>

					<motion.p
						className="w-full md:w-[641px] text-base md:text-[20px] font-ProDisplay font-400 text-white opacity-80"
						variants={childVariants}
					>
						{t('home_description')}
					</motion.p>

					<motion.div className="w-full max-w-[524px]" variants={childVariants}>
						<Input
							className="text-white w-full max-w-[524px] h-[54px] mt-10 border-none"
							style={{
								background:
									'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(248, 248, 248, 0.00) 54.17%), rgba(248, 248, 248, 0.02)',
								boxShadow: '2px 4px 16px 0px rgba(248, 248, 248, 0.06) inset',
								backdropFilter: 'blur(50px)',
							}}
							placeholder={t('search')}
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
									style={{ width: '20px', height: '20px' }}
								/>
							}
						/>
					</motion.div>
				</motion.div>

				<div className=" px-4 h- md:px-[100px] py-[60px] mt-[90px] flex flex-wrap justify-center gap-[24px]">
					{internships.slice(0, visibleCards).map((internship, index) => (
						<div
							key={index}
							className="h-[450px] mt-[30px] rounded-[8px] sm:rounded-[12px] md:rounded-[14px] lg:rounded-[16px] w-[240px] sm:w-[280px] md:w-[340px] lg:w-[400px] mr-[6px] sm:mr-[12px] md:mr-[18px] lg:mr-[24px] h-full"
							style={{
								border: '1px solid rgba(255, 255, 255, 0.10)',
								background: 'rgba(255, 255, 255, 0.05)',
								backdropFilter: 'blur(12.5px)',
							}}
						>
							<img
								className="w-[240px] h-[214px]  sm:w-[280px] md:w-[340px] lg:w-[399px] mb-[6px] sm:mb-[12px] md:mb-[18px] lg:mb-[24px]"
								style={{
									borderTopLeftRadius: '16px',
									borderTopRightRadius: '16px',
								}}
								src={internship.photoUrl || CardImg} // Fallback to Card1 if image is unavailable
								alt="Internship"
							/>
							<div className="flex flex-col ">
							<div className="flex gap-1 flex-wrap pl-[10px] mb-[10px]">
										{internship.tags
											? internship.tags.split(',').map((tag, tagIndex) => (
													<span
														key={tagIndex}
														className="w-[80px] text-center overflow-hidden px-[8px] py-[4px] rounded-[1000px] font-ProDisplay text-white"
														style={{
															border: '1px solid rgba(255, 220, 209, 0.10)',
															background: 'rgba(255, 253, 252, 0.10)',
															boxShadow:
																'0px -1px 1px 0px rgba(0, 0, 0, 0.10) inset, 0px 2px 4px 0px rgba(0, 0, 0, 0.09)',
														}}
													>
														{tag.trim()}{' '}
														{/* Fallback to 'Design' if category is unavailable */}
													</span>
											  ))
											: ''}
									</div>
								<div className="flex items-center justify-between pr-[16px] max-sm:flex-col">
									<span
										className="flex-nowrap  overflow-hidden mb-[2px] sm:mb-[4px]  md:mb-[6px] lg:mb-[8px] font-ProDisplay text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-500 px-[4px] sm:px-[8px] md:px-[12px] lg:px-[16px]"
										style={{ color: 'rgba(248, 248, 248, 0.70)' }}
									>
										{getTitle(internship)}
									</span>

									
								</div>

								<p
									className="line-clamp-3 h-[90px] overflow-hidden w-[200px] sm:w-[240px] md:w-[300px] lg:w-[367px] font-ProDisplay text-[10px] sm:text-[12px] md:text-[14px] lg:text-[20px] font-500 px-[4px] sm:px-[8px] md:px-[12px] lg:px-[16px]"
									style={{
										color: 'rgba(248, 248, 248, 0.95)',
										wordWrap: 'break-word',
										overflowWrap: 'break-word',
									}}
								>
									{getShortDescription(internship)}
								</p>
							</div>
							<div className="py-[6px] sm:py-[12px] md:py-[18px] lg:py-[24px] px-[4px] sm:px-[8px] md:px-[12px] lg:px-[16px] flex items-center">
								<button
									  onClick={() => GoDetail(internship?.id, internship?.photoUrl)}
									className="w-[367px] py-[4px] sm:py-[6px] md:py-[8px] lg:py-[10px] px-[20px] sm:px-[36px] md:px-[46px] lg:px-[56px] font-ProDisplayLight font-400 mr-[4px] sm:mr-[8px] md:mr-[10px] lg:mr-[12px]"
									style={{
										borderRadius: '12px',
										color: '#F8F8F8',
										background: 'rgba(40, 40, 40, 0.70)',
										boxShadow:
											'0px 1px 2px rgba(3, 7, 18, 0.40), 0px 0px 0px 1px rgba(3, 7, 18, 0.80), 0px 0.75px rgba(255, 255, 255, 0.20) inset',
									}}
								>
									{t('apply')}
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Show More Button */}
				{/* {visibleCards < internships.length && (
					<div className="flex items-center justify-center mb-[40px]">
						<button
							onClick={showMoreCards}
							className="flex w-[200px] px-[32px] py-[12px] items-center justify-center font-ProDisplay text-white"
							style={{
								borderRadius: '12px',
								border: '1px solid rgba(255, 255, 255, 0.40)',
								background: 'rgba(40, 40, 40, 0.70)',
								boxShadow:
									'0px 1px 2px 0px rgba(3, 7, 18, 0.40), 0px 0px 0px 1px rgba(3, 7, 18, 0.80), 0px 0.75px 0px 0px rgba(255, 255, 255, 0.20) inset',
							}}
						>
							Show More
							<img src={More} alt="more" className="ml-2" />
						</button>
					</div>
				)} */}
				<div className="flex items-center justify-center mb-[40px]">
					<Pagination
						current={pagination.current}
						total={pagination.total}
						pageSize={pagination.pageSize}
						hideOnSinglePage={true}
						onChange={handleTableChange}
						className="mt-6"
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
}

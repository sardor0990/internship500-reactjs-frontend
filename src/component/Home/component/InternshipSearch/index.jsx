import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { Input } from 'antd';
import Search from '../../../../assets/icons/search.svg';
import More from '../../../../assets/icons/more.svg';
import Footer from '../../Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import request from '@/services/api/index';
import { useTranslation } from 'react-i18next';


export default function InternshipSearch() {
	const {t} = useTranslation();
	const navigate = useNavigate();

	const [internships, setInternships] = useState([]);
	const slicedInternships = Array.isArray(internships) ? internships.slice(0, 10) : [];
  
	const [visibleCards, setVisibleCards] = useState(6); // Show initial 6 cards
	const location = useLocation();
	const searchQuery = new URLSearchParams(location.search).get('search'); // Get search query from URL

	const GoDetail = (id) => {
		navigate(`/internship500/detail/${id}`, )
	};

	useEffect(() => {
		if (searchQuery) {
		  // Make an API request to get internships based on search query
		  axios.get(`https://api.internship500.itskills.uz/api/admin/internships?search=${searchQuery}`)
			.then((response) => {
			  setInternships(response?.data?.data);  // Assuming the API returns an array of internships
			})
			.catch((error) => {
			  console.error("Error fetching internships:", error);
			});
		}
	  }, [searchQuery]);

	
	// Function to show more cards
	

	return (
		<div className="relative min-h-screen flex flex-col">
			<Navbar />
			<div>
				<div className="flex flex-col flex-grow items-center text-center px-4">
					<h1 className="mt-10 mb-6 w-full md:w-[790px] text-3xl md:text-[56px] font-ProDisplayBold font-700 text-white">
						Internship500
					</h1>
					<p className="w-full md:w-[641px] text-base md:text-[20px] font-ProDisplay font-400 text-white opacity-80">
						{t("home_description")}
					</p>
					<Input
						className="text-white w-full max-w-[524px] h-[54px] mt-10 border-none"
						style={{
							
							background:
								'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(248, 248, 248, 0.00) 54.17%), rgba(248, 248, 248, 0.02)',
							boxShadow: '2px 4px 16px 0px rgba(248, 248, 248, 0.06) inset',
							backdropFilter: 'blur(50px)',
						}}
						placeholder={t("search")}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
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
				</div>

				<div className="px-4 md:px-[100px] py-[60px] mt-[90px] flex flex-wrap justify-center gap-[24px]">
					{slicedInternships.map((internship) => (
						<div
							key={internship.id}
							className="mt-[30px] rounded-[8px] sm:rounded-[12px] md:rounded-[14px] lg:rounded-[16px] w-[240px] sm:w-[280px] md:w-[340px] lg:w-[400px] mr-[6px] sm:mr-[12px] md:mr-[18px] lg:mr-[24px]"
							style={{
								border: '1px solid rgba(255, 255, 255, 0.10)',
								background: 'rgba(255, 255, 255, 0.05)',
								backdropFilter: 'blur(12.5px)',
							}}
						>
							<img
								className="w-[240px] sm:w-[280px] md:w-[340px] lg:w-[399px] mb-[6px] sm:mb-[12px] md:mb-[18px] lg:mb-[24px]"
								style={{
									borderTopLeftRadius: '16px',
									borderTopRightRadius: '16px',
								}}
								src={internship.photoUrl } // Fallback to Card1 if image is unavailable
								alt="Internship"
							/>
							<div className="flex items-center justify-between pr-[16px]">
								<span
									className="mb-[2px] sm:mb-[4px] md:mb-[6px] lg:mb-[8px] font-ProDisplay text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-500 px-[4px] sm:px-[8px] md:px-[12px] lg:px-[16px]"
									style={{ color: 'rgba(248, 248, 248, 0.70)' }}
								>
									{internship.title}
								</span>
								<span
									className="px-[8px] py-[4px] rounded-[1000px] font-ProDisplay text-white"
									style={{
										border: '1px solid rgba(255, 220, 209, 0.10)',
										background: 'rgba(255, 253, 252, 0.10)',
										boxShadow: '0px -1px 1px 0px rgba(0, 0, 0, 0.10) inset, 0px 2px 4px 0px rgba(0, 0, 0, 0.09)',
									}}
								>
									{internship.category || 'Design'} {/* Fallback to 'Design' if category is unavailable */}
								</span>
							</div>

							<p
								className="line-clamp-3 w-[200px] sm:w-[240px] md:w-[300px] lg:w-[367px] font-ProDisplay text-[10px] sm:text-[12px] md:text-[14px] lg:text-[20px] font-500 px-[4px] sm:px-[8px] md:px-[12px] lg:px-[16px]"
								style={{ color: 'rgba(248, 248, 248, 0.95)' }}
							>
								{internship.description}
							</p>
							<div className="py-[6px] sm:py-[12px] md:py-[18px] lg:py-[24px] px-[4px] sm:px-[8px] md:px-[12px] lg:px-[16px] flex items-center">
								<button
									onClick={() => GoDetail(internship?.id)}
									className="w-[367px] py-[4px] sm:py-[6px] md:py-[8px] lg:py-[10px] px-[20px] sm:px-[36px] md:px-[46px] lg:px-[56px] font-ProDisplayLight font-400 mr-[4px] sm:mr-[8px] md:mr-[10px] lg:mr-[12px]"
									style={{
										borderRadius: '12px',
										color: '#F8F8F8',
										background: 'rgba(40, 40, 40, 0.70)',
										boxShadow:
											'0px 1px 2px rgba(3, 7, 18, 0.40), 0px 0px 0px 1px rgba(3, 7, 18, 0.80), 0px 0.75px rgba(255, 255, 255, 0.20) inset',
									}}
								>
									{t("apply")}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
}

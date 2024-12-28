import Card1 from '../../../../../assets/img/cardimg1.png';
import Card2 from '../../../../../assets/img/cardimg2.png';
import Card3 from '../../../../../assets/img/cardimg3.png';
import Card4 from '../../../../../assets/img/cardimg4.png';
import Card5 from '../../../../../assets/img/cardimg5.png';
import 'react-multi-carousel/lib/styles.css';
import Logo1 from '../../../../../assets/img/logo1.png';
import Logo2 from '../../../../../assets/img/logo2.png';
import Logo3 from '../../../../../assets/img/logo3.png';
import Logo4 from '../../../../../assets/img/logo4.png';
import Logo5 from '../../../../../assets/img/logo5.png';
import Logo6 from '../../../../../assets/img/logo6.png';
import Earth from '../../../../../assets/img/earth.png';
import { Input, Pagination } from 'antd';
import { message } from 'antd';
import request from '@/services/api/index';
import { useEffect, useMemo, useState } from 'react';
import { StyledInput } from './style';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import ITPARK from '../../../../../assets/img/itpark.png'
import Uztelecom from '../../../../../assets/icons/uztelecom.svg'
import Uzinfocom from '../../../../../assets/icons/uzinfocom.svg'
import Talim from '../../../../../assets/img/talimuyushmasi.png'
import AloqaBank from '../../../../../assets/img/aloqabank.png'
import Unicon from '../../../../../assets/icons/unicon.svg'
import CardImg from '../../../../../assets/img/cardimg2.png'


const Card = () => {
	const {t, i18n} = useTranslation();
	const navigate = useNavigate();
	const View = () => {
		navigate('/internship500');
	};

	const [internships, setInternships] = useState([]);
	const [visibleCards, setVisibleCards] = useState(); // Show initial 6 cards
	// const [currentPage, setCurrentPage] = useState(1);
	// const itemsPerPage = 6; // Number of items per page
	
	const GoDetail = (id, photoUrl) => {
		const resolvedPhotoUrl = photoUrl || CardImg; // Use CardImg if photoUrl is empty or falsy
		navigate(`/internship500/detail/${id}`, { state: { photoUrl: resolvedPhotoUrl } });
	};

	const cardsData2 = [
		{
			image: Card3,
			title: 'ITIC',
			description:
				'Crafting Compelling CTAs for SaaS Websites" or "The Ultimate Guide to SaaS Website SEO',
		},
		{
			image: Card3,
			title: 'ITIC',
			description:
				'Crafting Compelling CTAs for SaaS Websites" or "The Ultimate Guide to SaaS Website SEO',
		},
		{
			image: Card2,
			title: 'ITIC',
			description:
				'Crafting Compelling CTAs for SaaS Websites" or "The Ultimate Guide to SaaS Website SEO',
		},
		{
			image: Card5,
			title: 'ITIC',
			description:
				'Crafting Compelling CTAs for SaaS Websites" or "The Ultimate Guide to SaaS Website SEO',
		},
	];

	const [data, setContactData] = useState({
		userName: '',
		title: '',
		comment: '',
		userEmail: '',
		callRequestStatus: 'NEW',
	});
	

	const getTitle = useMemo(() => {
		return(internship)=>{	
		switch(i18n.language){
			case 'ru' : return internship.titleRu || internship.title;
			case 'uz' : return internship.titleUz || internship.title;
			default: return internship.title;
		}
	}
	},[i18n.language]);

	const getShortDescription =  useMemo(() => {
		return (internship) => {
			switch (i18n.language) {
			case 'ru' : return internship.shortDescriptionRu || internship.shortDescription;
			case 'uz' : return internship.shortDescriptionUz || internship.shortDescription;
			default : return internship.shortDescription;
		}
	};
}, [i18n.language]);
	


	const handleChange = (e) => {
		const { name, value } = e.target;
		setContactData((prevState) => ({ ...prevState, [name]: value }));
	};

	// const requestWithoutHeader = axios.create({
	// 	baseURL: process.env.REACT_APP_BASE_URL,
	// 	timeout: 30000,
	// })

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await request.post('admin/call-requests', { data });
			if (res.status === 200) {
				setContactData(res.data);
				message.success("Xabar jo'natildi");
				setContactData({
					userName: '',
					title: '',
					comment: '',
					phoneNumber: '',
				});
			} else {
				alert('Xato bor');
				message.error('Xato bor');
			}
		} catch (error) {
			message.error('Xato bor');
		}
	};

	useEffect(() => {
		request
			.get('https://api.internship500.itskills.uz/api/admin/internships')
			.then((res) => {
				if (res.data && Array.isArray(res.data.data)) {
					setInternships(res.data.data);
				} else {
					console.error('Unexpected response format:', res.data);
					setInternships([]);
				}
			})
			.catch((error) => {
				console.error('Error fetching internships:', error);
				setInternships([]);
			});
	}, []);

	// const handlePageChange = (page) => {
	// 	setCurrentPage(page);
	//   };
	
	//   // Calculate the internships to display for the current page
	//   const currentData = internships.slice(
	// 	(currentPage - 1) * itemsPerPage,
	// 	currentPage * itemsPerPage
	//   );
	

	return (
		<div className=" flex flex-col items-center ml-[10px] sm:ml-[20px] md:ml-[60px] lg:ml-[100px] xl:ml-[178px] mr-[10px] sm:mr-[20px] md:mr-[60px] lg:mr-[100px] xl:mr-[178px]">
			<div
				className="flex flex-col items-center px-4 py-8 md:px-8 lg:px-12 mb-[100px]"
				style={{
					background:
						'linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.10) 100%), #324ECF',
				}}
			>
				<p className="text-white text-base mb-8 mt-24 md:text-lg md:mb-10 lg:text-xl">
					{t('join')}
				</p>
				<div className="flex flex-wrap items-center justify-center gap-8">
					<img className="w-[100px] md:w-[140px] lg:w-[170px]" src={ITPARK} />
					<img className="w-[100px] md:w-[140px] lg:w-[170px]" src={Uzinfocom} />
					<img className="w-[100px] md:w-[140px] lg:w-[170px]" src={Uztelecom} />
					<img className="w-[100px] md:w-[140px] lg:w-[170px]" src={Talim} />
					<img className="w-[100px] md:w-[140px] lg:w-[170px]" src={AloqaBank} />
					<img className="w-[100px] md:w-[140px] lg:w-[170px]" src={Unicon} />
				</div>
			</div>

			<div
				className="max-w-[1400px] max-sm:w-[320px] px-[50px] sm:px-[20px] md:px-[40px] lg:px-[60px] py-[10px] sm:py-[20px] md:py-[40px] lg:py-[60px] rounded-[15px] sm:rounded-[30px] md:rounded-[60px] lg:rounded-[80px] mt-[15px] sm:mt-[30px] md:mt-[60px] lg:mt-[90px]"
				style={{
					border: '1px solid rgba(255, 255, 255, 0.40)',
					background:
						'linear-gradient(124deg, rgba(248, 248, 248, 0.03) 0%, rgba(248, 248, 248, 0.00) 46.5%), linear-gradient(180deg, rgba(248, 248, 248, 0.02) 0%)',
				}}
			>
				<h4 className="text-white font-ProDisplay text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] opacity-80 font-700">
					Internship500
				</h4>

				<div className="flex flex-col sm:flex-row items-center justify-between mb-[8px] sm:mb-[16px] md:mb-[24px] lg:mb-[32px]">
					<p
						className="w-full sm:w-[300px] md:w-[454px] opacity-80 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] mt-[4px] sm:mt-[6px] md:mt-[8px] lg:mt-[12px]"
						style={{ color: 'rgba(255, 255, 255, 0.80)' }}
					>
						{t('explore_wide')}
					</p>
					<p
						onClick={View}
						className="cursor-pointer opacity-80 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] mt-[4px] sm:mt-[6px] md:mt-[8px] lg:mt-[12px]"
						style={{ color: 'rgba(255, 255, 255, 0.80)' }}
					>
						{t('view_more')}
					</p>
				</div>

				<div className="mt-[10px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] justify-center">
					{internships.slice(0, 6).map((internship, index) => (
						<div
							key={index}
							className="bg-[#ffffff0d] rounded-[14px] p-[16px] flex flex-col items-center"
							style={{
								border: '1px solid rgba(255, 255, 255, 0.10)',
								backdropFilter: 'blur(12.5px)',
							}}
						>
							<img
								className="w-full h-[214px] sm:w-[280px] md:w-[340px] lg:w-[399px] object-cover rounded-t-[16px]"
								style={{
									borderTopLeftRadius: '16px',
									borderTopRightRadius: '16px',
								}}
								src={internship.photoUrl || CardImg} // Fallback to Card1 if image is unavailable
								alt="Internship"
							/>
							<div className="flex flex-col  justify-between mt-[8px] w-full">
								<span
									className="flex-nowrap w-[150px] flex flex-start line-clamp-1 overflow-hidden text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-500 px-[8px] py-[4px] text-center"
									style={{ color: 'rgba(248, 248, 248, 0.70)' }}
								>
									{getTitle(internship)}
								</span>

								<div className="flex flex-wrap justify-center gap-[8px] mt-[6px]">
									{internship.tags
										? internship.tags.split(',').map((tag, tagIndex) => (
												<span
													key={tagIndex}
													className="px-[12px] py-[6px] rounded-[1000px] bg-[#ffffff1a] text-white text-[12px] sm:text-[14px] font-500"
													style={{
														border: '1px solid rgba(255, 220, 209, 0.10)',
														boxShadow:
															'0px -1px 1px 0px rgba(0, 0, 0, 0.10) inset, 0px 2px 4px 0px rgba(0, 0, 0, 0.09)',
													}}
												>
													{tag.trim()}
												</span>
										  ))
										: ''}
								</div>

								<p
									className="mt-[8px] overflow-hidden line-clamp-3 w-full h-[80px] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-500 text-center"
									style={{
										color: 'rgba(248, 248, 248, 0.95)',
										wordWrap: 'break-word',
										overflowWrap: 'break-word', // Ensures words break properly in all browsers
									}}
								>
									{getShortDescription(internship)}
								</p>

								<div className="mt-[12px] w-full flex justify-center">
									<button
										 onClick={() => GoDetail(internship?.id, internship?.photoUrl)}
										className="w-full sm:w-[180px] lg:w-[240px] py-[8px] px-[24px] rounded-[12px] text-white font-500"
										style={{
											background: 'rgba(40, 40, 40, 0.70)',
											boxShadow:
												'0px 1px 2px rgba(3, 7, 18, 0.40), 0px 0px 0px 1px rgba(3, 7, 18, 0.80)',
										}}
									>
										{t('apply')}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* <Pagination
        current={currentPage}
        total={internships.length}
        pageSize={itemsPerPage}
		hideOnSinglePage={true}
        onChange={handlePageChange}
        className="mt-6"
      /> */}
			</div>

			<div
				className="flex flex-col xl:flex-row items-center max-sm:p-6  xl:items-start max-w-full xl:w-[1400px] rounded-[80px] xl:pl-[60px] p-0 mt-20 xl:mt-[80px] pt-[60px] mx-auto"
				style={{
					border: '1px solid rgba(255, 255, 255, 0.40)',
					background:
						'linear-gradient(124deg, rgba(248, 248, 248, 0.03) 0%, rgba(248, 248, 248, 0.00) 46.5%), linear-gradient(180deg, rgba(248, 248, 248, 0.02) 0%)',
				}}
			>
				<div className="w-full xl:w-[468px] xl:mr-[130px] text-center xl:text-left">
					<h4 className="text-white text-[22px] sm:text-[24px] md:text-[30px] lg:text-[36px] opacity-80 font-bold">
						{t('contact_us')}
					</h4>
					<p
						className="mb-[34px] w-full sm:w-[300px] md:w-[468px] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] mt-2 opacity-80"
						style={{ color: 'rgba(255, 255, 255, 0.80)' }}
					>
						{t('we_are_here_to_help')}
					</p>
					<Input
						className="w-full max-w-[468px] h-[54px] mt-[40px] border-none rounded-[12px] text-white"
						style={{
							background:
								'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(248, 248, 248, 0.00) 54.17%), rgba(248, 248, 248, 0.02)',
							boxShadow: '2px 4px 16px rgba(248, 248, 248, 0.06) inset',
							backdropFilter: 'blur(50px)',
						}}
						placeholder={t('full_name')}
						name="userName"
						value={data.userName}
						onChange={handleChange}
					/>
					<div className="flex flex-col sm:flex-row mt-4 mb-4 space-y-4 sm:space-y-0 sm:space-x-3">
						<Input
							className="w-full max-w-[228px] h-[54px] border-none rounded-[12px] text-white"
							style={{
								background:
									'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(248, 248, 248, 0.00) 54.17%), rgba(248, 248, 248, 0.02)',
								boxShadow: '2px 4px 16px rgba(248, 248, 248, 0.06) inset',
								backdropFilter: 'blur(50px)',
							}}
							placeholder={t('title')}
							name="title"
							value={data.title}
							onChange={handleChange}
						/>
						<StyledInput
							className="w-full max-w-[228px] h-[54px] border-none rounded-[12px] text-white"
							style={{
								background:
									'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(248, 248, 248, 0.00) 54.17%), rgba(248, 248, 248, 0.02)',
								boxShadow: '2px 4px 16px rgba(248, 248, 248, 0.06) inset',
								backdropFilter: 'blur(50px)',
							}}
							placeholder={t('email')}
							type="email"
							name="userEmail"
							value={data.userEmail}
							onChange={handleChange}
						/>
					</div>
					<Input
						className="w-full max-w-[468px] h-[54px] border-none rounded-[12px] text-white"
						style={{
							background:
								'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(248, 248, 248, 0.00) 54.17%), rgba(248, 248, 248, 0.02)',
							boxShadow: '2px 4px 16px rgba(248, 248, 248, 0.06) inset',
							backdropFilter: 'blur(50px)',
						}}
						placeholder={t('message')}
						name="comment"
						value={data.comment}
						onChange={handleChange}
					/>
					<button
						className="mt-6 w-full xl:w-[468px] py-3 font-ProDisplayLight font-400 rounded-[12px] text-[#F8F8F8]"
						style={{
							background: 'rgba(40, 40, 40, 0.70)',
							boxShadow:
								'0px 1px 2px rgba(3, 7, 18, 0.40), 0px 0px 0px 1px rgba(3, 7, 18, 0.80), 0px 0.75px rgba(255, 255, 255, 0.20) inset',
						}}
						onClick={handleSubmit}
					>
						{t('send')}
					</button>
				</div>
				<div className=" hidden xl:block overflow-hidden">
					<img
						className="w-[743px] h-[743px]"
						style={{ borderBottomRightRadius: '80px' }}
						src={Earth}
						alt="Earth"
					/>
				</div>
			</div>
		</div>
	);
};

export default Card;
{/* <div
				className="max-w-[1400px] max-sm:w-[320px] px-[10px] sm:px-[20px] md:px-[40px] lg:px-[60px] py-[10px] sm:py-[20px] md:py-[40px] lg:py-[60px] rounded-[15px] sm:rounded-[30px] md:rounded-[60px] lg:rounded-[80px] mt-[15px] sm:mt-[30px] md:mt-[60px] lg:mt-[90px]"
				style={{
					border: '1px solid rgba(255, 255, 255, 0.40)',
					background:
						'linear-gradient(124deg, rgba(248, 248, 248, 0.03) 0%, rgba(248, 248, 248, 0.00) 46.5%), linear-gradient(180deg, rgba(248, 248, 248, 0.02) 0%)',
				}}
			>
				<h4 className="text-white font-ProDisplay text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] opacity-80 font-700">
					Internship500
				</h4>

				<div className="flex flex-col sm:flex-row items-center justify-between mb-[8px] sm:mb-[16px] md:mb-[24px] lg:mb-[32px]">
					<p
						className="w-full sm:w-[300px] md:w-[454px] opacity-80 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] mt-[4px] sm:mt-[6px] md:mt-[8px] lg:mt-[12px]"
						style={{ color: 'rgba(255, 255, 255, 0.80)' }}
					>
						Lorem Ipsum has been the industry's standard dummy text ever since
						the 1500s
					</p>
					<p
						className="opacity-80 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] mt-[4px] sm:mt-[6px] md:mt-[8px] lg:mt-[12px]"
						style={{ color: 'rgba(255, 255, 255, 0.80)' }}
					>
						View more
					</p>
				</div>

				<Carousel
					responsive={responsive}
					showDots={false}
					arrows={false}
					ref={carouselRef}
				>
					{cardsData.map((card, index) => (
						<div
							key={index}
							className="rounded-[8px] sm:rounded-[12px] md:rounded-[14px] lg:rounded-[16px] w-[240px] sm:w-[280px] md:w-[340px] lg:w-[400px] mr-[6px] sm:mr-[12px] md:mr-[18px] lg:mr-[24px]"
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
								src={card.image}
							/>
							<span
								className="mb-[2px] sm:mb-[4px] md:mb-[6px] lg:mb-[8px] font-ProDisplay text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-500 px-[4px] sm:px-[8px] md:px-[12px] lg:px-[16px]"
								style={{ color: 'rgba(248, 248, 248, 0.95)' }}
							>
								{card.title}
							</span>
							<p
								className="w-[200px] sm:w-[240px] md:w-[300px] lg:w-[367px] font-ProDisplay text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-500 px-[4px] sm:px-[8px] md:px-[12px] lg:px-[16px]"
								style={{ color: 'rgba(248, 248, 248, 0.70)' }}
							>
								{card.description}
							</p>
							<div className="py-[6px] sm:py-[12px] md:py-[18px] lg:py-[24px] px-[4px] sm:px-[8px] md:px-[12px] lg:px-[16px] flex items-center">
								<button
									className="py-[4px] sm:py-[6px] md:py-[8px] lg:py-[10px] px-[20px] sm:px-[36px] md:px-[46px] lg:px-[56px] font-ProDisplayLight font-400 mr-[4px] sm:mr-[8px] md:mr-[10px] lg:mr-[12px]"
									style={{
										borderRadius: '12px',
										color: '#F8F8F8',
										background: 'rgba(40, 40, 40, 0.70)',
										boxShadow:
											'0px 1px 2px rgba(3, 7, 18, 0.40), 0px 0px 0px 1px rgba(3, 7, 18, 0.80), 0px 0.75px rgba(255, 255, 255, 0.20) inset',
									}}
								>
									Apply
								</button>
								<button
									className="py-[4px] sm:py-[6px] md:py-[8px] lg:py-[10px] px-[20px] sm:px-[36px] md:px-[40px] lg:px-[46px] text-white font-ProDisplayLight font-400"
									style={{
										borderRadius: '12px',
										border: '1px solid rgba(255, 255, 255, 0.10)',
										background:
											'linear-gradient(180deg, rgba(3, 7, 18, 0.00) 0%, rgba(3, 7, 18, 0.03) 100%), rgba(245, 245, 245, 0.10)',
										boxShadow:
											'0px 1px 2px rgba(3, 7, 18, 0.12), 0px 0px 0px 1px rgba(3, 7, 18, 0.08)',
									}}
								>
									Save later
								</button>
							</div>
						</div>
					))}
				</Carousel>
				<div className="flex items-center justify-end mt-[8px] sm:mt-[12px] md:mt-[24px] lg:mt-[32px] cursor-pointer">
					<img
						className="mr-[4px] sm:mr-[6px] md:mr-[12px] lg:mr-[16px]"
						src={Left}
						onClick={goToPrev	}
					/>
					<img src={Right} onClick={goToNext} />
				</div>
			</div>

			<div
				className="max-w-[1400px] max-sm:w-[320px] px-[10px] sm:px-[20px] md:px-[40px] lg:px-[60px] py-[10px] sm:py-[20px] md:py-[40px] lg:py-[60px] rounded-[15px] sm:rounded-[30px] md:rounded-[60px] lg:rounded-[80px] mt-[15px] sm:mt-[30px] md:mt-[60px] lg:mt-[90px]"
				style={{
					border: '1px solid rgba(255, 255, 255, 0.40)',
					background:
						'linear-gradient(124deg, rgba(248, 248, 248, 0.03) 0%, rgba(248, 248, 248, 0.00) 46.5%), linear-gradient(180deg, rgba(248, 248, 248, 0.02) 0%)',
				}}
			>
				<h4 className="text-white font-ProDisplay text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] opacity-80 font-700">
					Internship500
				</h4>

				<div className="flex flex-col sm:flex-row items-center justify-between mb-[8px] sm:mb-[16px] md:mb-[24px] lg:mb-[32px]">
					<p
						className="w-full sm:w-[300px] md:w-[454px] opacity-80 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] mt-[4px] sm:mt-[6px] md:mt-[8px] lg:mt-[12px]"
						style={{ color: 'rgba(255, 255, 255, 0.80)' }}
					>
						Lorem Ipsum has been the industry's standard dummy text ever since
						the 1500s
					</p>
					<p
						className="opacity-80 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] mt-[4px] sm:mt-[6px] md:mt-[8px] lg:mt-[12px]"
						style={{ color: 'rgba(255, 255, 255, 0.80)' }}
					>
						View more
					</p>
				</div>

				<Carousel
					responsive={responsive}
					showDots={false}
					arrows={false}
					ref={carouselRef3}
				>
					{cardsData3.map((card, index) => (
						<div
							key={index}
							className="rounded-[8px] sm:rounded-[12px] md:rounded-[14px] lg:rounded-[16px] w-[240px] sm:w-[280px] md:w-[340px] lg:w-[400px] mr-[6px] sm:mr-[12px] md:mr-[18px] lg:mr-[24px]"
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
								src={card.image}
							/>
							<span
								className="mb-[2px] sm:mb-[4px] md:mb-[6px] lg:mb-[8px] font-ProDisplay text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-500 px-[4px] sm:px-[8px] md:px-[12px] lg:px-[16px]"
								style={{ color: 'rgba(248, 248, 248, 0.95)' }}
							>
								{card.title}
							</span>
							<p
								className="w-[200px] sm:w-[240px] md:w-[300px] lg:w-[367px] font-ProDisplay text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-500 px-[4px] sm:px-[8px] md:px-[12px] lg:px-[16px]"
								style={{ color: 'rgba(248, 248, 248, 0.70)' }}
							>
								{card.description}
							</p>
							<div className="py-[6px] sm:py-[12px] md:py-[18px] lg:py-[24px] px-[4px] sm:px-[8px] md:px-[12px] lg:px-[16px] flex items-center">
								<button
									className="py-[4px] sm:py-[6px] md:py-[8px] lg:py-[10px] px-[20px] sm:px-[36px] md:px-[46px] lg:px-[56px] font-ProDisplayLight font-400 mr-[4px] sm:mr-[8px] md:mr-[10px] lg:mr-[12px]"
									style={{
										borderRadius: '12px',
										color: '#F8F8F8',
										background: 'rgba(40, 40, 40, 0.70)',
										boxShadow:
											'0px 1px 2px rgba(3, 7, 18, 0.40), 0px 0px 0px 1px rgba(3, 7, 18, 0.80), 0px 0.75px rgba(255, 255, 255, 0.20) inset',
									}}
								>
									Apply
								</button>
								<button
									className="py-[4px] sm:py-[6px] md:py-[8px] lg:py-[10px] px-[20px] sm:px-[36px] md:px-[40px] lg:px-[46px] text-white font-ProDisplayLight font-400"
									style={{
										borderRadius: '12px',
										border: '1px solid rgba(255, 255, 255, 0.10)',
										background:
											'linear-gradient(180deg, rgba(3, 7, 18, 0.00) 0%, rgba(3, 7, 18, 0.03) 100%), rgba(245, 245, 245, 0.10)',
										boxShadow:
											'0px 1px 2px rgba(3, 7, 18, 0.12), 0px 0px 0px 1px rgba(3, 7, 18, 0.08)',
									}}
								>
									Save later
								</button>
							</div>
						</div>
					))}
				</Carousel>
				<div className="flex items-center justify-end mt-[8px] sm:mt-[12px] md:mt-[24px] lg:mt-[32px] cursor-pointer">
					<img
						className="mr-[4px] sm:mr-[6px] md:mr-[12px] lg:mr-[16px]"
						src={Left}
						onClick={goToPrev3}
					/>
					<img src={Right} onClick={goToNext3} />
				</div>
			</div>

			<div
				className="max-w-[1400px] max-sm:w-[320px] py-[73px] px-[82px] rounded-[80px] mt-[80px]"
				style={{
					border: 'var(--unit-0, 1px) solid rgba(255, 255, 255, 0.40)',
					background:
						' radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(248, 248, 248, 0.00) 54.17%), rgba(248, 248, 248, 0.02)',
					boxShadow: ' 2px 4px 16px 0px rgba(248, 248, 248, 0.06) inset',
					backdropFilter: 'blur(50px)',
				}}
			>
				<div>
					<div className="flex flex-col items-center mb-[53px] px-4">
						<h4 className="text-white font-ProDisplayBold text-[36px] opacity-80 font-700 text-center">
							Yangiliklar
						</h4>
						<p
							className="w-full max-w-[454px] opacity-80 text-[18px] mt-[12px] text-center"
							style={{ color: 'rgba(255, 255, 255, 0.80)' }}
						>
							Create, manage, and conquer your to-do lists with ease
						</p>
					</div>

					<Carousel ref={carouselRef4} responsive={responsive} arrows={false}>
						<div className="w-full max-w-[384px] mx-auto">
							<img
								className="w-full rounded-[16px]"
								src={Card6}
								alt="Card Image"
							/>
							<div className="flex items-center justify-between mt-[24px] mb-[12px]">
								<span
									className="text-[16px] font-700"
									style={{ color: 'rgba(248, 248, 248, 0.70)' }}
								>
									Sep 24.2024
								</span>
								<button
									className="rounded-[1000px] text-white text-[14px] px-[8px] py-[4px]"
									style={{
										border: '1px solid rgba(255, 220, 209, 0.10)',
										background: 'rgba(255, 253, 252, 0.10)',
										boxShadow:
											'0px -1px 1px 0px rgba(0, 0, 0, 0.10) inset, 0px 2px 4px 0px rgba(0, 0, 0, 0.09)',
									}}
								>
									Design
								</button>
							</div>
							<p
								className="text-[20px] font-ProDisplay"
								style={{ color: 'rgba(248, 248, 248, 0.95)' }}
							>
								The Latest E-commerce Website Trends or Boosting Leads for
								FinTech Websites
							</p>
						</div>

						<div className="w-full max-w-[384px] mx-auto">
							<img
								className="w-full rounded-[16px]"
								src={Card6}
								alt="Card Image"
							/>
							<div className="flex items-center justify-between mt-[24px] mb-[12px]">
								<span
									className="text-[16px] font-700"
									style={{ color: 'rgba(248, 248, 248, 0.70)' }}
								>
									Sep 24.2024
								</span>
								<button
									className="rounded-[1000px] text-white text-[14px] px-[8px] py-[4px]"
									style={{
										border: '1px solid rgba(255, 220, 209, 0.10)',
										background: 'rgba(255, 253, 252, 0.10)',
										boxShadow:
											'0px -1px 1px 0px rgba(0, 0, 0, 0.10) inset, 0px 2px 4px 0px rgba(0, 0, 0, 0.09)',
									}}
								>
									Design
								</button>
							</div>
							<p
								className="text-[20px] font-ProDisplay"
								style={{ color: 'rgba(248, 248, 248, 0.95)' }}
							>
								The Latest E-commerce Website Trends or Boosting Leads for
								FinTech Websites
							</p>
						</div>
						<div className="w-full max-w-[384px] mx-auto">
							<img
								className="w-full rounded-[16px]"
								src={Card6}
								alt="Card Image"
							/>
							<div className="flex items-center justify-between mt-[24px] mb-[12px]">
								<span
									className="text-[16px] font-700"
									style={{ color: 'rgba(248, 248, 248, 0.70)' }}
								>
									Sep 24.2024
								</span>
								<button
									className="rounded-[1000px] text-white text-[14px] px-[8px] py-[4px]"
									style={{
										border: '1px solid rgba(255, 220, 209, 0.10)',
										background: 'rgba(255, 253, 252, 0.10)',
										boxShadow:
											'0px -1px 1px 0px rgba(0, 0, 0, 0.10) inset, 0px 2px 4px 0px rgba(0, 0, 0, 0.09)',
									}}
								>
									Design
								</button>
							</div>
							<p
								className="text-[20px] font-ProDisplay"
								style={{ color: 'rgba(248, 248, 248, 0.95)' }}
							>
								The Latest E-commerce Website Trends or Boosting Leads for
								FinTech Websites
							</p>
						</div>
						<div className="w-full max-w-[384px] mx-auto">
							<img
								className="w-full rounded-[16px]"
								src={Card6}
								alt="Card Image"
							/>
							<div className="flex items-center justify-between mt-[24px] mb-[12px]">
								<span
									className="text-[16px] font-700"
									style={{ color: 'rgba(248, 248, 248, 0.70)' }}
								>
									Sep 24.2024
								</span>
								<button
									className="rounded-[1000px] text-white text-[14px] px-[8px] py-[4px]"
									style={{
										border: '1px solid rgba(255, 220, 209, 0.10)',
										background: 'rgba(255, 253, 252, 0.10)',
										boxShadow:
											'0px -1px 1px 0px rgba(0, 0, 0, 0.10) inset, 0px 2px 4px 0px rgba(0, 0, 0, 0.09)',
									}}
								>
									Design
								</button>
							</div>
							<p
								className="text-[20px] font-ProDisplay"
								style={{ color: 'rgba(248, 248, 248, 0.95)' }}
							>
								The Latest E-commerce Website Trends or Boosting Leads for
								FinTech Websites
							</p>
						</div>
					</Carousel>
				</div>
				<div className="flex items-center justify-center mt-[53px] cursor-pointer">
					<img className="mr-[16px]" src={Left} onClick={goToPrev4} />
					<img className="cursor-pointer" src={Right} onClick={goToNext4} />
				</div>
			</div> */}
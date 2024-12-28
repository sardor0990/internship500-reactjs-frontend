import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../../Footer';
import { Button, Input, Modal, Select, Upload, message } from 'antd';
import girlImage from '../../../../assets/img/girl3-modified.png';
import request from '@/services/api';
import { uploadFile } from '@/services/fileUpload';
import { useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
// import {ReactMarkdown} from 'react-markdown'
import { marked } from 'marked';
export default function Detail() {
	const { t } = useTranslation();

	const location = useLocation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { id } = useParams();

	const { data } = useSelector((state) => state.generelReducer);
    const { photoUrl } = location.state || {};
	const [data_new, setData_New] = useState({
		title: '',
		titleUz: '',
		titleRu: '',
		redirectUrl: '',
		tags: '',
		shortDescription: '',
		fullDescription: '',
		shortDescriptionUz: '',
		fullDescriptionUz: '',
		shortDescriptionRu: '',
		fullDescriptionRu: '',
		photoUrl: '',
		createdAt: '',
	});
  
	useEffect(() => {
		// Fetch data by ID or endpoint
		const fetchData = async () => {
			try {
				const response = await request.get(`admin/internships/${id}`);

				// Adjust the path based on the logged structure
				if (response.data && response.data.data) {
					setData_New(response.data.data);
					console.log("rr",data_new)
				} else {
					console.log('Data not found in the response.');
				}
			} catch (error) {
				console.error('Error fetching data:', error);
				console.log('Failed to fetch data. Please try again later.');
			}
		};

		fetchData();

		if (data) {
			setApplicationData({
				firstName: data?.data?.firstName || '',
				lastName: data?.data?.lastName || '',
				phone: data?.data?.phone || '',
			});
		}
	}, [id]);

	// Helper function to format the date
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return `${t('published')} ${date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		})}`;
	};

	const showModal = () => {
		setIsModalOpen(true);
		
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedFile(null);	
		// setApplicationData('');
		setApplicationData((prevData) => ({
			...prevData,
			phoneNumber: null,
			season: null,
		}));
		setFileList([]);
	};

	const [selectedFile, setSelectedFile] = useState(null);
	const [fileList, setFileList] = useState([]);
	const [applicationData, setApplicationData] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: null,
		season:null
	});

	const props = {
		fileList,
		beforeUpload: (file) => {
			setSelectedFile(file);
			setFileList([file]);
			return false;
		},
		onRemove: () => {
			setSelectedFile(null);
			setFileList([]);
		},
		onChange(info) {
			if (info.file.status === 'done') {
				setSelectedFile(info.file.originFileObj);
			}
		},
	};

	const handleFileChange = (event) => {};

	const handleApply = async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			message.error('Please sign in first.');
			return;
		}
          // Validation
    if (!applicationData.phoneNumber) {
        message.info('Phone number is required.');
        return;
    }
    if (!applicationData.season) {
        message.info('Season is required.');
        return;
    }

		if (!selectedFile) {
			alert('enter file');
			return;
		}

		try {
			const responseFile = await uploadFile(selectedFile);

			if (responseFile) {
				const userDataAll = {
					firstName: applicationData.firstName,
					lastName: applicationData.lastName,
					phone: applicationData.phoneNumber,
					photoUrl: responseFile.fileUrl,
					internshipId: id,
				};

				const userData = {
					userClient: userDataAll,
					internshipId: id,
				};

				const data = {
					internshipId: id,
					cvUrl: responseFile.fileUrl,
					userClient: { phone: applicationData.phoneNumber },
					status: "SUBMITTED",
					sessionId:applicationData.season
					
				};

				const response = await request.post('/account/applications', { data });
                  
				if (response) {
					message.success('Application submitted successfully');
					setSelectedFile(null);
					// setApplicationData('');
					setFileList([]);
					handleCancel(true);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	//  const uploadProps = {
	//   onChange: handleFileChange,
	//   showUploadList: false, // Optionally hide the upload list
	// };

	// 	const uploadFile2 = async (file) => {
	// 		if (file) {
	// 			try {

	// 				const axiosInstance = axios.create({
	// 					headers: {
	// 						Authorization: `Bearer ${token}`,
	// 						'Content-Type': 'multipart/form-data',
	// 					},
	// 				});

	// 				const response = await uploadFile.post('/base/file/upload', {
	// 					file: file,
	// 				});
	// 				return response?.data?.data?.photoUrl;
	// 			} catch (error) {
	// 				message.error(error?.response?.data?.resultMsg || 'File upload error');
	// 				return null;
	// 			}
	// 		}
	// 	};

	// 	// Function to submit application with user data and uploaded file
	// 	const submitApplication = async (file, userClient) => {
	// 		try {
	// 			// Step 1: Upload file to get photoUrl
	// 			const photoUrl = await uploadFile2(file);
	// 			if (!photoUrl) {
	// 				throw new Error('Failed to get photoUrl');
	// 			}

	// 			// Step 2: Call the second API with user data and photoUrl
	// 			const response = await request.post('api/account/applications', {
	// 				data: {
	// 					userClient: {
	// 						...userClient,
	// 						photoUrl,
	// 					},
	// 				},
	// 			});

	// 			message.success('Application submitted successfully');
	// 			return response.data;
	// 		} catch (error) {
	// 			message.error(
	// 				error?.response?.data?.resultMsg || 'Application submission error',
	// 			);
	// 			return null;
	// 		}
	// 	};

	return (
		<div>
			<Navbar />
			<div className="flex flex-col items-center px-4 md:px-8 lg:px-12">
				<p className="text-white text-base mb-3 mt-24 md:text-lg lg:text-xl">
					{formatDate(data_new.createdAt)}
				</p>
				<h4
					className="w-full text-center sm:w-[600px] md:w-[700px] lg:w-[800px] text-white text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold"
					style={{ fontFamily: 'Inter', wordBreak: 'break-word' }}
				>
					{data_new.title}
				</h4>

				<p className="text-center w-full sm:w-[600px] md:w-[700px] lg:w-[800px]  text-white mt-3 text-base sm:text-sm md:text-lg lg:text-xl" style={{ fontFamily: 'Inter', wordBreak: 'break-word' }}>

					{data_new.shortDescription}
				</p>


				<div className="flex gap-1">
					{data_new.tags
						? data_new.tags.split(',').map((tag, tagIndex) => (
								<span
									key={tagIndex}
									className=" text-center rounded-full text-white text-[19px] mt-10 py-1 px-4"
									style={{
										border: '1px solid rgba(255, 220, 209, 0.10)',
										background: 'rgba(255, 253, 252, 0.10)',
									}}
								>
									{tag.trim()}
								</span>
						  ))
						: ''}
				</div>

				<img
					className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[1364px] h-auto mt-16 rounded-2xl"
					src={data_new.photoUrl || photoUrl}
					alt="UX presentation"
				/>

				<div className="mt-20 flex flex-col md:flex-row md:space-x-8  ">
					<div
						className="w-full md:w-[700px] h-auto p-8 bg-opacity-50 rounded-2xl backdrop-blur-lg mb-10 md:mb-0 xl:w-[1024px] "
						style={{
							borderRadius: '32px',
							border: '1px solid rgba(255, 255, 255, 0.05)',
							background:
								'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(248, 248, 248, 0.00) 54.17%), linear-gradient(0deg, rgba(248, 248, 248, 0.02) 0%, rgba(248, 248, 248, 0.02) 100%)',
						}}
					>
						<p className=" text-lg md:text-[20px] font-light text-opacity-95 text-white">
							{t("detail_description")}
						</p>
						<p
							className="mt-6 text-base md:text-lg text-opacity-70 text-white"
							style={{
								wordWrap: 'break-word', // Ensures text wraps to the next line
								wordBreak: 'break-word', // Breaks long words if necessary
								whiteSpace: 'normal', // Ensures normal line breaks and prevents single-line overflow
							}}
							dangerouslySetInnerHTML={{ __html: marked(data_new.fullDescription) }}
						></p>


						{/* <div className="mt-8">
							<span className="text-xl md:text-[28px] font-light text-white text-opacity-95">
								Artificial Intelligence (AI)
							</span>
							<p className="mt-6 text-base md:text-lg text-opacity-70 text-white">
								Artificial Intelligence (AI) has permeated virtually every
								aspect of our lives, and healthcare is no exception. The
								integration of AI in healthcare...
							</p>
						</div>

						<div className="mt-8">
							<span className="text-xl md:text-[28px] font-light text-white text-opacity-95">
								Predictive Analytics and Disease Prevention
							</span>
							<p className="mt-6 text-base md:text-lg text-opacity-70 text-white">
								One of the most prominent applications of AI in healthcare is in
								diagnostic imaging. AI algorithms have demonstrated remarkable
								proficiency...
							</p>
						</div> */}
					</div>

					<div
						className="flex flex-col justify-between h-[252px] w-full max-w-xs p-6 rounded-2xl border border-white border-opacity-10 bg-opacity-5 mb-10 md:mb-0"
						style={{
							background: 'rgba(255, 255, 255, 0.05)',
						}}
					>
						<div className="mb-6">
							<p className="text-sm text-white text-opacity-80">
								{t('company')}
							</p>
							<span className="text-lg text-white">ITIC</span>
						</div>
						<div className="mb-6">
							<p className="text-sm text-white text-opacity-80">
								{t('category')}
							</p>
							<div className='flex gap-1'>
							{data_new.tags
								? data_new.tags.split(',').map((tag, tagIndex) => (
										<span key={tagIndex} className="text-lg text-white">
											{tag.trim() + ','}
										</span>
								  ))
								: ''}
								</div>
						</div>
						<button
							onClick={showModal}
							className="w-full py-2 mt-4 text-white font-light rounded-lg bg-opacity-70 hover:bg-opacity-80"
							style={{
								background: 'rgba(40, 40, 40, 0.70)',
								boxShadow:
									'0px 1px 2px rgba(3, 7, 18, 0.40), 0px 0px 0px 1px rgba(3, 7, 18, 0.80), inset 0px 0.75px 0px rgba(255, 255, 255, 0.20)',
							}}
						>
							{t('apply')}
						</button>
					</div>
				</div>
			</div>

			<Modal
  footer={false}
  title={t("apply to Internship")}
  open={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}

  className="max-w-[90%] sm:max-w-[600px] mx-auto" // Responsive width
>
  <div className="space-y-6"> {/* Group form elements with consistent spacing */}
    {/* Resume Upload */}
    <div>
      <p className="font-ProDisplay text-[16px] mb-2">{t("Resume")}</p>
      <Upload type="file" {...props}>
        <Button icon={<UploadOutlined />}>{t("Click to Upload")}</Button>
      </Upload>
    </div>

    {/* First Name */}
    <div>
      <p className="font-ProDisplay text-[16px] mb-2">{t("firstname")}</p>
      <Input
        className="w-full h-[48px] rounded-[12px] px-4 border border-gray-300"
        type="text"
        value={applicationData.firstName}
      />
    </div>

    {/* Last Name */}
    <div>
      <p className="font-ProDisplay text-[16px] mb-2">{t("lastname")}</p>
      <Input
        className="w-full h-[48px] rounded-[12px] px-4 border border-gray-300"
        type="text"
        value={applicationData.lastName}
      />
    </div>

    {/* Phone Number */}
    <div>
      <p className="font-ProDisplay text-[16px] mb-2">{t("phonenumber")}</p>
      <Input
        className="w-full h-[48px] rounded-[12px] px-4 border border-gray-300"
        type="number"
        value={applicationData.phoneNumber}
        onChange={(e) =>
          setApplicationData({
            ...applicationData,
            phoneNumber: e.target.value,
          })
        }
      />
    </div>

    {/* Season */}
    <div>
      <p className="font-ProDisplay text-[16px] mb-2">{t("Season")}</p>
      <Select
        value={applicationData.season}
        className="w-full h-[48px] rounded-[12px] border border-gray-300"
        onChange={(value) =>
          setApplicationData({
            ...applicationData,
            season: value,
          })
        }
      >
        <Select.Option value="1">{t("Winter")}</Select.Option>
        <Select.Option value="2">{t("Summer")}</Select.Option>
        <Select.Option value="3">{t("Spring")}</Select.Option>
      </Select>
    </div>

    {/* Action Buttons */}
	<div className="mt-[24px]">
					<button
						onClick={handleCancel}
						className="mb-[10px] py-[10px] px-[93px] border-none outline-none font-ProDisplayLight font-400 mr-[12px]"
						style={{
							borderRadius: '12px',
							color: '#000000',
							background: '#fff',
							border: '1px solid #D0D5DD',
						}}
					>
						{t("cancel")}
					</button>
					<button
						onClick={handleApply}
						className="py-[10px] px-[93px] border-none outline-none font-ProDisplayLight font-400"
						style={{
							borderRadius: '12px',
							color: '#F8F8F8',
							background: '#324ECF',
							boxShadow:
								'0px 1px 2px 0px rgba(3, 7, 18, 0.40), 0px 0px 0px 1px rgba(3, 7, 18, 0.80), 0px 0.75px 0px 0px rgba(255, 255, 255, 0.20) inset',
						}}
					>
						{t('apply')}
					</button>
				</div>
  </div>
</Modal>

			<Footer />
		</div>
	);
}

import axios from 'axios';
import { message } from 'antd';
export const uploadFile = async (file) => {
	if (file) {
		try {
			const token = localStorage.getItem('token');
			const axiosInstance = axios.create({
				baseURL: process.env.REACT_APP_BASE_URL,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			});

			const response = await axiosInstance.post('base/file/upload', {
				file: file,
				transactionTime: '2023-08-14T15:43:01.8152087',
			});
			return response?.data?.data;
		} catch (error) {
			message.error(error?.response?.data?.resultMsg || 'Xatolik');
			return error?.response?.data?.resultMsg;
		}
	}
};

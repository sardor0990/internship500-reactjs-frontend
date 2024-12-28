import { message } from 'antd';
import request from './index';

const create = async (url, data) => {
	try {
		const response = await request.post(url, { data });
		return response.data;
	} catch (error) {
		console.error('Error creating resource:', error);
		message.error(error?.response?.data?.resultMsg || 'Xatolik');
		throw error;
	}
};

const read = async (url) => {
	try {
		const response = await request.get(url);
		return response.data;
	} catch (error) {
		console.error('Error reading resource:', error);
		message.error(error?.response?.data?.resultMsg || 'Xatolik');
		throw error;
	}
};

const update = async (url, data) => {
	try {
		const response = await request.put(url, { data });
		return response.data;
	} catch (error) {
		console.error('Error updating resource:', error);
		message.error(error?.response?.data?.resultMsg || 'Xatolik');
		throw error;
	}
};

const delete_Api = async (url) => {
	const token = localStorage.getItem('token'); 
    console.log("Token being sent:", token); // Debug: Check token value
    console.log("URL for deletion:", url);
	console.log(url,"fffff")
	try {
		const response = await request.delete(url);
		return response.data;
	} catch (error) {
		console.error('Error deleting resource:', error);
		message.error(error?.response?.data?.resultMsg || 'Xatolik');
		throw error;
	}
};

export { create, read, update, delete_Api };

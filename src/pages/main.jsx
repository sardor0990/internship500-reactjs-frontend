import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Main = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['todos'],
		queryFn: async () => {
			const response = await axios.get('https://catfact.ninja/fact');
			return response.data;
		},
	});
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	return (
		<div className="w-full  min-h-screen bg-slate-600 p-[20px] flex justify-center items-center text-[20px] text-[#fff] font-bold">
			{data.fact}
		</div>
	);
};

export default Main;

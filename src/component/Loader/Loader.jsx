import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

export const Loader = ({ size }) => {
	const { pathname } = useLocation();
	return (
		<div
			className={`w-full h-screen flex items-center justify-center bg-[${
				pathname.includes('admin') && '#000'
			}] bg-opacity-[${pathname.includes('admin') && '10'}]`}
		>
			<Spin
				indicator={
					<LoadingOutlined
						style={{
							fontSize: size || 62,
							color: '#9ec8fc',
						}}
						spin
					/>
				}
			/>
		</div>
	);
};

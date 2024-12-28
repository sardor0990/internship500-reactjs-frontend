import { useTranslation } from 'react-i18next';
import Call from '../../../assets/icons/call.svg';

const Footer = () => {

	const {t} = useTranslation();

	return (
		<div className=" px-4 sm:px-[40px] md:px-[100px] lg:px-[178px] mt-[80px]">
			<div
				className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 md:px-[80px] py-10 sm:py-[70px] mt-[90px]"
				style={{
					border: '1px solid rgba(255, 255, 255, 0.40)',
					background: 'rgba(255, 255, 255, 0.05)',
					backdropFilter: 'blur(12.5px)',
					borderTopLeftRadius: '80px',
					borderTopRightRadius: '80px',
				}}
			>
				<p className="text-white font-ProDisplay text-[14px] sm:text-[16px] font-400 mb-4 sm:mb-0">
					{t("all_rights")}
				</p>
				<div className="flex items-center">
					<img src={Call} alt="Call Icon" className="mr-2" />
					<p className="text-white font-ProDisplay text-[14px] sm:text-[16px] font-400">
						+998712384358
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;

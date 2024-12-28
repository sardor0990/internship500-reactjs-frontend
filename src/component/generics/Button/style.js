import { Button as AntButton } from 'antd';
import styled from 'styled-components';

const getHeight = ({ size }) => {
	switch (size) {
		case 'large':
			return '44px';
		case 'medium':
			return '32px';
		case 'small':
			return '24px';
		default:
			return '44px';
	}
};
export const Button = styled(AntButton)`
	position: ${({ position }) => position && position};
	top: ${({ top }) => top && top};
	right: ${({ right }) => right && right};
	z-index: ${({ zIndex }) => zIndex && zIndex};
	background-color: ${({ bgcolor }) => bgcolor || '#1893FF'};
	color: ${({ color, hovercolor }) => color || hovercolor || '#fff'};
	border-color: ${({ bgcolor, bordercolor }) => {
		if (
			(bgcolor === '#ffffff' ||
				bgcolor === '#fff' ||
				bgcolor === 'transparent' ||
				bgcolor === 'white') &&
			bordercolor === undefined
		) {
			return 'whitesmoke';
		} else {
			return bordercolor || 'transparent';
		}
	}};
	border-radius: ${({ radius }) => radius || '2px'};
	width: ${({ width }) => width || '100%'};
	height: ${({ height, size }) => height || (size && getHeight(size))};
	font-family: var(--appPrimaryFont);
	font-style: normal;
	font-weight: ${({ weight }) => weight || 600};
	font-size: ${({ fontSize }) => fontSize || '16px'};
	line-height: ${({ lineHeight }) => lineHeight || 'normal'};  
	cursor: ${({ loading }) => (loading ? 'wait' : 'pointer')};
	display: flex;
	grid-gap: ${({ gap }) => gap && gap};
	margin-left: ${({ marginleft }) => marginleft};
	justify-content: ${({ justifyContent }) => justifyContent || 'center'};
	align-items: center;
	margin-right: ${({ marginright }) => marginright};
	margin: ${({ margin }) => margin};
	align-self: ${({ alignself }) => alignself};
	&:hover {
		/* background-color: ${({ bgcolor, bghovercolor }) =>
			bghovercolor || bgcolor || '#1893FF'};
		color: ${({ color, hovercolor }) => hovercolor || color || '#fff'};
		border-color: ${({ bgcolor, bordercolor }) => {
			if (
				(bgcolor === '#ffffff' ||
					bgcolor === '#fff' ||
					bgcolor === 'transparent' ||
					bgcolor === 'white') &&
				bordercolor === undefined
			) {
				return 'whitesmoke';
			} else {
				return bordercolor || 'transparent';
			}
		}};
		border-radius: ${({ radius }) => radius || '2px'};

		opacity: 0.8;
		.title {
			color: var(--appIconHoverColor);
		} */
		/* .Title1  */
	}
	&:hover .icon {
		path {
			fill: var(--appIconHoverColor);
		}
	}
	.icon {
		path {
			fill: ${({ openFilter }) => openFilter && 'var(--appIconHoverColor)'};
		}
	}
	:active {
		/* background-color: ${({ bgcolor }) => bgcolor || '#1893FF'};
		color: ${({ color }) => color || '#fff'};
		border-color: ${({ bgcolor, bordercolor }) => {
			if (
				(bgcolor === '#ffffff' ||
					bgcolor === '#fff' ||
					bgcolor === 'transparent' ||
					bgcolor === 'white') &&
				bordercolor === undefined
			) {
				return 'whitesmoke';
			} else {
				return bordercolor || 'transparent';
			}
		}};
		border-radius: ${({ radius }) => radius || '2px'};
		opacity: 1; */
	}
	:focus {
		/* background-color: ${({ bgcolor }) => bgcolor || '#1893FF'};
		color: ${({ color }) => color || '#fff'};
		border-color: ${({ bgcolor, bordercolor }) => {
			if (
				(bgcolor === '#ffffff' ||
					bgcolor === '#fff' ||
					bgcolor === 'transparent' ||
					bgcolor === 'white') &&
				bordercolor === undefined
			) {
				return 'whitesmoke';
			} else {
				return bordercolor || 'transparent';
			}
		}};
		border-radius: ${({ radius }) => radius || '2px'}; */
	}
	.ant-btn[disabled],
	.ant-btn[disabled]:hover,
	.ant-btn[disabled]:focus,
	.ant-btn[disabled]:active {
		color: rgba(0, 0, 0, 0.25);
		border-color: #d9d9d9;
		background-color: ${({ bgcolor }) => bgcolor || '#1893FF'};
		text-shadow: none;
		box-shadow: none;
	}
	position: ${({ component }) => component === 'load' && 'absolute'};
	right: ${({ component }) => component === 'load' && '0px'};
	top: ${({ component }) => component === 'load' && '8px'};
	z-index: ${({ component }) => component === 'load' && 9999};
	padding: ${({ padding }) => padding};
`;

import styled from 'styled-components';
import { Input } from 'antd';
export const GenericInput = styled.div`
	width: ${({ width }) => width || '100%'};
	min-width: ${(props) => props.minwidth};
	margin: ${({ margin }) => margin};
	height: fit-content;
	display: flex;
	/* align-items: ${({ textPosition }) => textPosition || 'center'}; */
	align-items: left;
	flex-direction: column;

	.ant-input[disabled] {
		color: rgba(0, 0, 0, 0.8);
		color: ${({ copied }) => (copied ? '#fff' : 'rgba(0, 0, 0, 0.8)')};
		background-color: ${({ copied }) =>
			copied ? 'rgba(0,0,0,0.7)' : '#f5f5f5'};
		border-color: #d9d9d9;
		box-shadow: none;
		cursor: not-allowed;
		opacity: 1;
		transition: all 0.2s ease;
	}

	/* #vin-error {
    border: ${({ vinerror }) => {
		return vinerror ? '1px solid #FF0000' : '1px solid #C4C4C4';
	}}!important;
  }
  #truck-error {
    border: ${({ truckerror }) => {
		return truckerror ? '1px solid #FF0000' : '1px solid #C4C4C4';
	}} !important;
  } */
`;

export const Label = styled.p`
	text-align: left;
	font-family: ${({ fontfamily }) =>
		fontfamily ? fontfamily : 'var(--appPrimaryFont)'};
	margin: ${({ margin }) => margin || '0 0 4px 0'};
	font-style: normal;
	font-weight: ${({ fontwieght }) => (fontwieght ? fontwieght : 600)};
	font-size: ${({ fontSize }) => (fontSize ? fontSize : '12px')};
	line-height: ${({ lineheight }) => (lineheight ? lineheight : '16px')};
	text-transform: ${({ texttransform }) =>
		texttransform ? texttransform : 'uppercase'};
	color: ${({ color }) => (color ? color : '#5c6470')};
`;

export const Box = styled.div`
	width: ${({ width }) => width || '100%'};
	height: fit-content;
	position: relative;
	align-items: center;
	text-align: center;
	margin: ${({ boxMargin }) => boxMargin || '0 0 0 0'};
`;

Box.IconLeft = styled.img`
	width: 16.93px;
	height: 16.93px;
	position: absolute;
	left: 10px;
	top: 50%;
	transform: translateY(-50%);
	opacity: 0.32;
	cursor: pointer;
`;

Box.IconRight = styled.img`
	width: 16.93px;
	height: 16.93px;
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	opacity: 0.32;
	cursor: pointer;
`;

export const AntInput = styled(Input)`
	width: ${({ width }) => width || '100%'};
	position: relative;
	/* max-width: ${({ maxWidth }) => maxWidth}; */
	height: ${({ height }) => height || '32px'};
	background: ${({ bgcolor }) => bgcolor || '#FFFFFF'};
	color: ${({ color }) => color || '#D8D9DD'};
	border-width: ${({ bwidth }) => bwidth || '1px'};
	border-color: ${({ bcolor, bordercolor }) =>
		bordercolor || bcolor || '#D8D9DD'};
	border-style: ${({ bstyle }) => (bstyle ? bstyle : 'solid')};
	border-radius: ${({ radius }) => radius || '2px'};
	font-size: var(--appTableFontSize);
	appearance: none;
	outline: none;
	padding-left: ${({ align, icon }) =>
		icon ? (align === 'left' ? '30px' : '7px') : '7px'};
	padding-right: ${({ align, icon }) =>
		icon ? (align === 'right' ? '7px' : '30px') : '7px'};
	box-sizing: border-box;
	::placeholder {
		color: ${({ plcolor }) => plcolor || '#bfbfbf'};
		/* opacity: 0.7; */
	}
	border: ${(props) => props.border || '1px solid #c4c4c4'};
	border-bottom: ${(props) => props.bbottom};
	padding: ${(props) => props.bbottom && 0};
	padding: ${(props) => props.padding};
	min-width: ${({ minwidth }) => minwidth && minwidth};
	:disabled {
		cursor: not-allowed;
	}

	/* #vin-error {
    border: ${({ vinerror }) => {
		return vinerror ? '1px solid #FF0000' : '1px solid #C4C4C4';
	}}!important;
  }
  #truck-error {
    border: ${({ truckerror }) => {
		return truckerror ? '1px solid #FF0000' : '1px solid #C4C4C4';
	}} !important;
  } */

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

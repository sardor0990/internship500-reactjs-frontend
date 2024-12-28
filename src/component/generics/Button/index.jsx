import React from 'react';
import { Button } from './style';
const GenericButton = ({
	marginleft,
	marginright,
	children,
	bordercolor,
	margin,
	disabled,
	component,
	padding,
	gap,
	radius,
	width,
	height,
	bgcolor,
	bghovercolor,
	hovercolor,
	position,
	zIndex,
	justifyContent,
	icon,
	openFilter,
	loading,
	...props
}) => {
	return (
		<Button
			{...props}
			zIndex={zIndex}
			loading={loading}
			position={position}
			disabled={disabled}
			hovercolor={hovercolor}
			bghovercolor={bghovercolor}
			bgcolor={bgcolor}
			justifyContent={justifyContent}
			gap={gap}
			padding={padding}
			radius={radius}
			width={width}
			height={height}
			component={component}
			icon={icon}
			margin={margin}
			bordercolor={bordercolor}
			marginright={marginright}
			marginleft={marginleft}
			openFilter={openFilter}
			style={{
				'--antd-wave-shadow-color':
					props.bgcolor === '#ffffff' ||
					props.bgcolor === '#fff' ||
					props.bgcolor === 'transparent' ||
					props.bgcolor === 'white'
						? props.color
						: props.bgcolor,
			}}
		>
			{children}
		</Button>
	);
};

export default GenericButton;

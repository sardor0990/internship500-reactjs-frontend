import React from 'react';
import { GenericInput, Label, Box, AntInput } from './style';
// import { RedStars } from '@generics';

const GenericInputComponent = ({
	isrequired,
	width,
	align,
	icon,
	label,
	bgcolor,
	plcolor,
	color,
	bcolor,
	bwidth,
	radius,
	disabled,
	type,
	minwidth,
	placeholder,
	labelmargin,
	boxWidth,
	boxMargin,
	size,
	height,
	fontSize,
	editable,
	margin,
	maxWidth,
	lineheight,
	defaultValue,
	bordercolor,
	bstyle,
	border,
	error,
	texttransform,
	fontfamily,
	fontweight,
	vinerror,
	truckerror,
	errormessage,
	suffix,
	prefix,
	copied,
	...props
}) => {
	return (
		<GenericInput
			copied={copied}
			width={width}
			margin={labelmargin}
			truckerror={truckerror}
			vinerror={vinerror}
		>
			{label && label !== '' ? (
				<div style={{ display: 'flex' }}>
					<Label
						width={width}
						color={color}
						fontSize={fontSize}
						styles={{ size }}
						margin={margin}
						lineheight={lineheight}
						texttransform={texttransform}
						fontfamily={fontfamily}
						fontweight={fontweight}
					>
						{label}
						{/* {isrequired ? <RedStars /> : null} */}
					</Label>
					{errormessage && (
						<p
							style={{
								marginBottom: 0,
								color: 'red',
								lineHeight: lineheight,
								fontSize: '12px',
								marginLeft: '5px',
							}}
						>
							{errormessage?.replace('{', '')?.replace('}', '')}
						</p>
					)}
				</div>
			) : null}
			<Box width={boxWidth ? boxWidth : width} boxMargin={boxMargin}>
				{!icon ? (
					''
				) : align === 'left' ? (
					<Box.IconLeft src={icon} color={color} />
				) : (
					<Box.IconRight src={icon} color={color} />
				)}
				<AntInput
					type={type}
					vinerror={vinerror}
					truckerror={truckerror}
					height={height}
					align={align}
					bgcolor={bgcolor}
					border={border}
					bordercolor={bordercolor}
					color={color}
					suffix={suffix}
					prefix={prefix}
					bcolor={bcolor}
					editable={editable}
					maxWidth={maxWidth}
					bwidth={bwidth}
					plcolor={plcolor}
					radius={radius}
					disabled={disabled && true}
					icon={icon}
					minwidth={minwidth}
					placeholder={placeholder}
					styles={{ size }}
					bstyle={bstyle}
					defaultValue={defaultValue}
					{...props}
				/>
				{error && <span style={{ color: 'red' }}>{error}</span>}
			</Box>
		</GenericInput>
	);
};

export default React.memo(GenericInputComponent);

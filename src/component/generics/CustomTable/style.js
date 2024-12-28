import styled from 'styled-components';

export const Wrapper = styled.div`
	/* width: 99%;
	display: flex;
	flex-direction: column; */
`;
Wrapper.Header = styled.div`
	width: 100%;
	min-height: 40px;
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.1);

	display: flex;
	align-items: center;
	margin: 0 20px 0 0;
	padding: 0 15px;
`;
Wrapper.HeaderTitle = styled.p`
	color: #fff;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px;
	opacity: 0.6;
`;

Wrapper.Column = styled.div`
	width: ${({ width }) => width && width};
	display: flex;
	flex: ${({ width, flex }) => (flex ? flex : !width ? '1' : undefined)};
	align-items: center;
	box-sizing: border-box;
	justify-content: ${({ last }) => last && 'center'};
	overflow: ${({ hidden }) => !hidden && 'hidden'};
	text-overflow: ellipsis;
	padding: 15px 0;
`;

Wrapper.ColumnTrunCate = styled.div`
	width: 90%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #fff;
`;

Wrapper.Row = styled.div`
	/* width: 100%; */
	display: flex;
	align-items: center;
	border-bottom: 1px solid #e1e1e1;
	background: rgba(255, 255, 255, 0.1);

	min-height: 76px;
	padding: 0 10px;
	&:hover {
	}
	cursor: ${({ click }) => click && 'pointer'};
`;
Wrapper.Img = styled.div`
	width: 339.331px;
	height: 231.489px;
	border-radius: 18.593px;
	box-shadow: 0px 3.7187px 50.2024px 0px rgba(19, 22, 29, 0.11);
	background-position: center;
`;
Wrapper.Center = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 52px;
	font-style: normal;
	font-weight: 500;
	line-height: 56px;
	gap: 50px;
	padding: 60px;
`;

import React from 'react';
import { Wrapper } from './style';
const Row = ({ v, data, id }) => {
	const { cellRenderer: CellRenderer, flex, width, field, hidden } = v;
	return (
		<Wrapper.Column width={width} flex={flex} hidden={hidden}>
			{CellRenderer ? (
				<CellRenderer data={data} id={id} />
			) : (
				<Wrapper.ColumnTrunCate>{data?.[field]}</Wrapper.ColumnTrunCate>
			)}
			{/* asd */}
		</Wrapper.Column>
	);
};

export default Row;

import { createSlice } from '@reduxjs/toolkit';

let initialState = {
	data: {},
	secondData: {},
};

const generelSlice = createSlice({
	name: 'generel',
	initialState,
	reducers: {
		changeState: (state, action) => {
			state[action.payload.name] = action.payload.value;
		},
	},
});

export const { changeState } = generelSlice.actions;

export default generelSlice.reducer;

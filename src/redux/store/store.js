import { configureStore, combineReducers } from '@reduxjs/toolkit';
import generelReducer from '../slices/generelSlice';

const reducers = combineReducers({
	generelReducer,
});

export default configureStore({
	reducer: reducers,
});

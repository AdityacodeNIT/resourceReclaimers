import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../../features/todo/todoSlice.jsx'; // import the reducer from the slice
export const store=configureStore({
    reducer:todoReducer
});
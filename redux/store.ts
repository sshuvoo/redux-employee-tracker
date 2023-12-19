import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './features/employeeSlice';

const store = configureStore({
   reducer: {
      employee: employeeSlice,
   },
});

export default store;

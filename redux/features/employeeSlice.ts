import { createSlice } from '@reduxjs/toolkit';

const employeeList = JSON.parse(localStorage.getItem('employeeList') || '[]');

const initialState = {
   employeeList,
   newEmployee: {},
};

const employeeSlice = createSlice({
   name: 'employee',
   initialState,
   reducers: {
      draftEmployee: (state, { payload }) => {
         state.newEmployee = { ...state.newEmployee, ...payload };
      },
      clearDraftEmployee: (state) => {
         state.newEmployee = {};
      },
      saveEmployee: (state, { payload }) => {
         state.employeeList.push({
            ...payload,
            id:
               state.employeeList?.length >= 1
                  ? state.employeeList[state.employeeList.length - 1].id + 1
                  : 1,
         });
         localStorage.setItem(
            'employeeList',
            JSON.stringify(state.employeeList)
         );
      },
      deleteEmployee: (state, { payload }) => {
         state.employeeList = state.employeeList.filter(
            (employee: any) => employee.id !== payload
         );
         localStorage.setItem(
            'employeeList',
            JSON.stringify(state.employeeList)
         );
      },
   },
});

export const {
   draftEmployee,
   saveEmployee,
   clearDraftEmployee,
   deleteEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;

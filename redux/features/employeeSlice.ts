import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
   employeeList: any;
   newEmployee: any;
   isLoading: boolean;
}

const initialState: InitialState = {
   employeeList: [],
   newEmployee: {},
   isLoading: true,
};

const employeeSlice = createSlice({
   name: 'employee',
   initialState,
   reducers: {
      draftEmployee: (state, { payload }) => {
         state.newEmployee = { ...state.newEmployee, ...payload };
      },
      loadEmployee: (state, { payload }) => {
         state.employeeList = payload;
         state.isLoading = false;
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
   loadEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;

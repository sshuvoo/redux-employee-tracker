'use client';
import EmployeeCard from '@/components/EmployeeCard';
import JobHolderCard from '@/components/JobHolderCard';
import { loadEmployee } from '@/redux/features/employeeSlice';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './page.module.css';

export default function Home() {
   const { employeeList, isLoading } = useSelector(
      (state: any) => state.employee
   );
   const dispatch = useDispatch();

   useEffect(() => {
      const localemployeeList = localStorage.getItem('employeeList');
      if (localemployeeList)
         dispatch(loadEmployee(JSON.parse(localemployeeList)));
      else dispatch(loadEmployee([]));
   }, [dispatch]);

   return (
      <section>
         <div className="max-w-4xl mx-auto bg-white rounded-lg mt-4 md:mt-14 shadow">
            <div className="flex justify-end p-10">
               <Link href={'/add-employee/basic-info'}>
                  <Button classNames={{ root: classes.root }} variant="filled">
                     <svg
                        className="fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="14"
                        viewBox="0 0 448 512"
                     >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                     </svg>
                     <span className="ml-2">Add Employee</span>
                  </Button>
               </Link>
            </div>
            {employeeList?.length >= 1 && (
               <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {employeeList.map((employee: any) => {
                     if (employee.profession === 'Student')
                        return (
                           <EmployeeCard key={employee.id} info={employee} />
                        );
                     else if (employee.profession === 'Job Holder')
                        return (
                           <JobHolderCard key={employee.id} info={employee} />
                        );
                  })}
               </div>
            )}
            {employeeList?.length <= 0 && (
               <div className="p-8">
                  <p className="text-center text-lg sm:text-xl md:text-2xl font-semibold">
                     {isLoading
                        ? 'Loading...'
                        : 'No Employee Found! Please Add First'}
                  </p>
               </div>
            )}
         </div>
      </section>
   );
}

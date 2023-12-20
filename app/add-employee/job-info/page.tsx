'use client';
import { Input, Button } from '@mantine/core';
import Link from 'next/link';
import classes from './page.module.css';
import SectionHeader from '@/components/SectionHeader';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
   clearDraftEmployee,
   saveEmployee,
} from '@/redux/features/employeeSlice';
import { notifications } from '@mantine/notifications';

export default function Page() {
   const { newEmployee } = useSelector((state: any) => state.employee);
   const dispatch = useDispatch();
   const router = useRouter();
   const [company, setCompany] = useState<string>('');
   const [designation, setDesignation] = useState<string>('');
   const [experience, setExperience] = useState<string>('');

   const [companyErr, setCompanyErr] = useState<boolean>(false);
   const [designationErr, setDesignationErr] = useState<boolean>(false);
   const [experienceErr, setExperienceErr] = useState<boolean>(false);

   const sumitHandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (company) setCompanyErr(false);
      else setCompanyErr(true);
      if (designation) setDesignationErr(false);
      else setDesignationErr(true);
      if (experience) setExperienceErr(false);
      else setExperienceErr(true);
      if (company && designation && experience && newEmployee?.firstName) {
         dispatch(
            saveEmployee({
               ...newEmployee,
               company,
               designation,
               experience,
            })
         );
         dispatch(clearDraftEmployee());
         router.push('/');
         notifications.show({
            title: 'Add Request',
            message: 'Employee added succefully 🤥',
         });
      }
   };

   useEffect(() => {
      if (!newEmployee.firstName) router.push('/');
   }, [newEmployee, router]);

   return (
      <section>
         <div className="max-w-4xl mx-auto bg-white rounded-lg mt-14 shadow p-10">
            <SectionHeader title="Job Information" />
            <form
               onSubmit={sumitHandler}
               className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-6"
            >
               <div className="col-span-full">
                  <label className="font-medium block mb-2">Company Name</label>
                  <Input
                     error={companyErr}
                     value={company}
                     onChange={(event) => setCompany(event.currentTarget.value)}
                     placeholder="Enter Your Company Name"
                  />
               </div>
               <div>
                  <label className="font-medium block mb-2">Designation</label>
                  <Input
                     error={designationErr}
                     value={designation}
                     onChange={(event) =>
                        setDesignation(event.currentTarget.value)
                     }
                     placeholder="Enter Designation"
                  />
               </div>
               <div>
                  <label className="font-medium block mb-2">
                     Experience (Year)
                  </label>
                  <Input
                     error={experienceErr}
                     value={experience}
                     onChange={(event) =>
                        setExperience(event.currentTarget.value)
                     }
                     placeholder="Enter Experience (Year)"
                  />
               </div>
               <div className="flex justify-between col-span-full">
                  <Link href={'/add-employee/basic-info'}>
                     <Button
                        variant="danger"
                        classNames={{ root: classes.root }}
                     >
                        <svg
                           className="fill-white"
                           xmlns="http://www.w3.org/2000/svg"
                           height="16"
                           width="16"
                           viewBox="0 0 512 512"
                        >
                           <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                        </svg>
                        <span className="ml-2">Back</span>
                     </Button>
                  </Link>
                  <Button
                     classNames={{ root: classes.next }}
                     type="submit"
                     variant="filled"
                  >
                     <span className="mr-2">Submit</span>
                     <svg
                        className="fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                        viewBox="0 0 512 512"
                     >
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
                     </svg>
                  </Button>
               </div>
            </form>
         </div>
      </section>
   );
}

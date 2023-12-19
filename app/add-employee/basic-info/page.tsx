'use client';
import { Input, NativeSelect, Button } from '@mantine/core';
import Link from 'next/link';
import classes from './page.module.css';
import SectionHeader from '@/components/SectionHeader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { draftEmployee } from '@/redux/features/employeeSlice';
import { useRouter } from 'next/navigation';

export default function Page() {
   const { newEmployee } = useSelector((state: any) => state.employee);
   const dispatch = useDispatch();
   const router = useRouter();
   const [firstName, setFirstName] = useState<string>('');
   const [lastName, setLastName] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [phone, setPhone] = useState<string>('');
   const [stack, setStack] = useState<string>('');
   const [profession, setProfession] = useState<string>('');

   const [firstNameErr, setFirstNameErr] = useState<boolean>(false);
   const [lastNameErr, setLastNameErr] = useState<boolean>(false);
   const [emailErr, setEmailErr] = useState<boolean>(false);
   const [phoneErr, setPhoneErr] = useState<boolean>(false);

   const nextStepHandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (firstName) setFirstNameErr(false);
      else setFirstNameErr(true);
      if (lastName) setLastNameErr(false);
      else setLastNameErr(true);
      if (email) setEmailErr(false);
      else setEmailErr(true);
      if (phone) setPhoneErr(false);
      else setPhoneErr(true);
      if (firstName && lastName && email && phone) {
         dispatch(
            draftEmployee({
               firstName,
               lastName,
               email,
               phone,
               stack,
               profession,
            })
         );
         if (profession === 'Student')
            router.push('/add-employee/student-info');
         else if (profession === 'Job Holder')
            router.push('/add-employee/job-info');
      }
   };

   useEffect(() => {
      if (newEmployee) {
         setFirstName(newEmployee?.firstName || '');
         setLastName(newEmployee?.lastName || '');
         setEmail(newEmployee?.email || '');
         setPhone(newEmployee?.phone || '');
         setStack(newEmployee?.stack || 'Frontend');
         setProfession(newEmployee?.profession || 'Student');
      }
   }, [newEmployee]);

   return (
      <section>
         <div className="max-w-4xl mx-auto bg-white rounded-lg mt-14 shadow p-10">
            <SectionHeader title="Basic Information" />
            <form
               onSubmit={nextStepHandler}
               className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-6"
            >
               <div>
                  <label className="font-medium block mb-2">First Name</label>
                  <Input
                     error={firstNameErr}
                     placeholder="Enter Your First Name"
                     value={firstName}
                     onChange={(event) =>
                        setFirstName(event.currentTarget.value)
                     }
                  />
               </div>
               <div>
                  <label className="font-medium block mb-2">Last Name</label>
                  <Input
                     error={lastNameErr}
                     placeholder="Enter Your Last Name"
                     value={lastName}
                     onChange={(event) =>
                        setLastName(event.currentTarget.value)
                     }
                  />
               </div>
               <div>
                  <label className="font-medium block mb-2">E-mail</label>
                  <Input
                     error={emailErr}
                     placeholder="Enter Your E-mail"
                     value={email}
                     onChange={(event) => setEmail(event.currentTarget.value)}
                  />
               </div>
               <div>
                  <label className="font-medium block mb-2">Phone</label>
                  <Input
                     error={phoneErr}
                     placeholder="Enter Your Phone"
                     value={phone}
                     onChange={(event) => setPhone(event.currentTarget.value)}
                  />
               </div>
               <div>
                  <label className="font-medium block mb-2">Select Stack</label>
                  <NativeSelect
                     value={stack}
                     onChange={(event) => setStack(event.currentTarget.value)}
                     data={['Frontend', 'Backend', 'Full Stack']}
                  />
               </div>
               <div>
                  <label className="font-medium block mb-2">
                     Select Profession
                  </label>
                  <NativeSelect
                     value={profession}
                     onChange={(event) =>
                        setProfession(event.currentTarget.value)
                     }
                     data={['Student', 'Job Holder']}
                  />
               </div>
               <div className="flex justify-between col-span-full">
                  <Link href={'/'}>
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
                  <Button type="submit" variant="filled">
                     <span className="mr-2">Next</span>
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

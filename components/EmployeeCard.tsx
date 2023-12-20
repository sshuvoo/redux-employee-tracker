import { deleteEmployee } from '@/redux/features/employeeSlice';
import { Avatar } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { notifications } from '@mantine/notifications';

export default function EmployeeCard({ info }: { info: any }) {
   const dispatch = useDispatch();

   const {
      firstName,
      lastName,
      stack,
      email,
      institute,
      degree,
      depertment,
      id,
   } = info;

   return (
      <div className="shadow p-4 border rounded-md">
         <div className="grid grid-cols-[56px,auto,20px] gap-4">
            <div>
               <Avatar size="lg" alt="no image here" />
            </div>
            <div>
               <h1 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h1>
               <h2>{`${stack} Developer`}</h2>
            </div>
            <div className="flex justify-end">
               <svg
                  onClick={() => {
                     dispatch(deleteEmployee(id));
                     notifications.show({
                        title: 'Delete',
                        message: `${firstName} ${lastName} removed succefully 🤥`,
                     });
                  }}
                  className="fill-rose-500 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
               >
                  <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
               </svg>
            </div>
         </div>
         <div className="mt-4">
            <div className="flex justify-between bg-slate-800/5 px-2 py-1 rounded-md">
               <h2 className="font-medium">E-mail</h2>
               <h2>{email}</h2>
            </div>
            <div className="flex justify-between px-2 py-1 rounded-md">
               <h2 className="font-medium">Institute</h2>
               <h2>{institute}</h2>
            </div>
            <div className="flex justify-between bg-slate-800/5 px-2 py-1 rounded-md">
               <h2 className="font-medium">Degree</h2>
               <h2>{degree}</h2>
            </div>
            <div className="flex justify-between px-2 py-1 rounded-md">
               <h2 className="font-medium">Dept.</h2>
               <h2>{depertment}</h2>
            </div>
         </div>
      </div>
   );
}

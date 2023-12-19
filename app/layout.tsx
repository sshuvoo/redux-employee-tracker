import type { Metadata } from 'next';
import './globals.css';
import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import ReduxProvider from '@/redux/ReduxProvider';

export const metadata: Metadata = {
   title: 'Employee Management',
   description: 'Employee Management App',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <ReduxProvider>
         <html lang="en">
            <head>
               <ColorSchemeScript />
            </head>
            <body className="bg-gray-200">
               <MantineProvider>{children}</MantineProvider>
            </body>
         </html>
      </ReduxProvider>
   );
}

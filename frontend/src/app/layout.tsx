import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import ReduxProvider from '@core/providers/ReduxProvider';
import QueryProvider from '@core/providers/QueryProvider';
import MuiProvider from '@core/providers/MuiProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Product Ratings & Review Analytics Dashboard',
  description: 'Analytics dashboard for product ratings and reviews',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <QueryProvider>
            <MuiProvider>
              {children}
              <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
              />
            </MuiProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

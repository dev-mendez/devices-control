import './globals.css'
// import { Inter } from 'next/font/google'
import { Navbar } from '@/components/common/Navbar'
// const inter = Inter({ subsets: ['latin'] })
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'MORES-S CONTROL',
  description: 'Control Master-devices and peripherals from a single place, fast and eficeintly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body /**className={inter.className} */>
        <Navbar />
        <main className="min-h-screen items-center p-2 md:p-24">
          {children}
        </main >
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
      </body>
    </html>
  )
}
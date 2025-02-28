import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crime Report',
  description: 'Report crimes to law enforcements',
}

export default function RootLayout({
  children,
}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='relative min-h-screen bg-black selection:bg-sky-500 '>
          <div className="fixed inset-0 -z-10 min-h-screen ">
            <div className='absolute inset-0 h-full bg-[radial-gradient(circle_ar_center,rgba(56,189,248,0.03), transparent_50%)]'/>
            <div className='absolute inset-0 h-full bg-[radial-gradient(circle_ar_center,rgba(14,165,233,0.07), transparent_70%)]'/>
          </div>



          {/* navbar */}

        <Navbar/>
          <main className='pt-16 '>{children}</main>
        </div>
      </body>
    </html>
  )
}
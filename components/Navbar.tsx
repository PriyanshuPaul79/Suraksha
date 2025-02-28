'use client'
import Link from 'next/link'
import { useState } from 'react'
import MobileMenu from './MobileMenu'
import { MenuIcon } from 'lucide-react'
import Justice from './Justice'
import { Cctv } from 'lucide-react';

export default function Navbar() {
    // for checking if the mobile menu is open or not 
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <nav className='fixed top-0 left-0 w-full border-b border-white bg-black/60 backdrop-blur-xl z-50 '>
                <div className='mx-auto max-w-7xl px-6 '>
                    <div className='flex h-16 items-center justify-between'>
                        {/* for logo */}
                        <div className='flex items-center space-x-3'>
                            <Link href="/" className='flex items-center space-x-3 '>
                                <div className='h-9 w-9 bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center rounded-4xl'>
                                   <Cctv/>
                                </div>
                                <span className='text-lg font-semibold text-white'>CrimeLink</span>
                            </Link>
                        </div>


                        <div className='hidden md:flex items-center space-x-6'>

                            <Link href={'/submit-report'} className='text-sm text-zinc-400 hover:text-white transition-colors '>
                                Submit Report
                            </Link>

                            <Link href={'/track-report'} className='text-sm text-zinc-400 hover:text-white transition-colors '>
                                Track Report
                            </Link>

                            <Link href={'/how-it-work'} className='text-sm text-zinc-400 hover:text-white transition-colors '>
                                How it Works
                            </Link>

                            <Link href={'/resources'} className='text-sm text-zinc-400 hover:text-white transition-colors '>
                                Resources
                            </Link>
                        </div>


                        <div className='flex items-center space-x-4'>
                            <Link href='/contact' className='hidden md:block text-sm text-zinc-400  hover:text-white transition-colors'>Contacts</Link>



                            <button className='ml-5 sm:ml-auto group flex h-9 items-center gap-2 rounded-full bg-red-500/10 pl-4 pr-5 font-light
                             text-sm text-red-500 ring-1 ring-inset ring-red-500/20 transition-all hover:bg-red-500/20'>
                                <span className='h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse' /> Emergency: 100
                            </button>




                            {/* mobile menu  */}

                            <button className='md:hidden p-2 text-zinc-400 hover:text-white' onClick={() => {
                                setIsOpen(true)

                            }}>
                                <MenuIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}
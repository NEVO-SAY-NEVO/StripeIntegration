"use client"

import React, { useEffect } from 'react'
import {PiStudentFill} from 'react-icons/pi'
import {PiGearBold} from 'react-icons/pi'
import Link from 'next/link'
import {useUserService} from '_services';

export default function Header2() {

  const userService = useUserService();

  const currentPage = userService.currentPage;
  console.log('currentPage in header2 =>', currentPage);

  return (
        <div className='flex flex-col min-[768px]:w-1/5 max-[768px]: w-[80px] bg-[#FEFEFE] min-h-[100vh]'>
            <div className='text-[18px] font-bold mx-auto py-7 mb-7'>
                <Link href={'/'}>
                    <p className='flex flex-row text-[18px] font-bold text-black'>
                        <span className='text-[#023E89]'>Swift&nbsp;</span>
                        <span className='max-[768px]:hidden min-[768px]:block'>Study</span>
                    </p>
                </Link>
            </div>
            {/* <SignIn /> */}
            <Link href={'/secure/home'}>
                <div className={`flex flex-row gap-5 ml-4 mb-6 pr-4 ${currentPage == 'home' ? 'border-r-4 border-r-[#023E89]' : ''}`}>
                    <PiStudentFill color='#023E89'
                        size={'38px'}/>
                    <p className='text-[18px] font-bold text-black max-[768px]:hidden min-[768px]:block'>
                        Home
                    </p>
                </div>
            </Link>
            <Link href={'/secure/tableAccount'}>
                <div className={`flex flex-row gap-5 ml-4 mb-6 pr-4 ${currentPage == 'tableAccount' ? 'border-r-4 border-r-[#023E89]' : ''}`}>
                    <PiGearBold color='#023E89'
                        size={'38px'}/>
                    <p className='text-[18px] font-bold text-black max-[768px]:hidden min-[768px]:block'>
                        Account
                    </p>
                </div>
            </Link>
        </div>
  )
}

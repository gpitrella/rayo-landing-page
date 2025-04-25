'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { FiBell } from 'react-icons/fi'
import { IoIosArrowDown } from 'react-icons/io'
import { PiCalendarBlank } from 'react-icons/pi'
import { RiHomeLine } from 'react-icons/ri'
import { HiMiniArrowLeft } from 'react-icons/hi2'
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5'
import { useRouter, usePathname } from 'next/navigation'
import '@/app/styles/navbar.css'
import { Logout } from '../app/services/auth.service'
import { useAppDispatch } from '../app/store/store'
import { reset } from '../app/store/auth/authSlice'


function DesktopNav(props: any) {

    const pathname = usePathname()
    const router = useRouter();
    const dispatch= useAppDispatch();

    const handleLogoutClick = (event: React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault(); 
        dispatch(reset()); 
        props.closeDropDown(event); 
        Logout();
        // router.push('/')                     
    };      

 
  return (
    <div className='drop-down bg-[white] w-[300px] h-[300px] rounded-[12px] absolute top-20 right-0 shadow-sm p-6 flex flex-col justify-start dark:bg-card dark:border-zinc-800'>
        <div className='mb-6 flex justify-between items-center'>
            <h3 className='font-semibold text-lg'>{props.user?.firstName} {props.user?.lastName}</h3>
        </div>
        <div>
                <ul>
                <li>
                    <Link className={`${pathname === '/' ? 'active' : ''}`} href='/' onClick={(event) => { props.closeDropDown(event); router.push('/'); }}>
                    <div id='link'>
                        <RiHomeLine className="text-[1.4rem] dark:text-white" />
                        <span className='dark:text-white'>Home</span>
                    </div>
                    </Link>
                </li>
                <li>
                    <Link className={`${pathname === '/home' ? 'active' : ''}`} href='/home' onClick={(event) => { props.closeDropDown(event); router.push('/home'); }}>
                    <div id='link'>
                        <PiCalendarBlank className="text-[1.4rem] dark:text-white" />
                        <span className='dark:text-white'>Lavados Reservados</span>
                    </div>
                    </Link>
                </li>
                <li><Link className={`${pathname === '/settings/profile' ? 'active' : ''}`} href='/settings/profile' onClick={(event) => props.closeDropDown(event)}>
                    <div id='link'>
                        <IoSettingsOutline className="text-[1.4rem] dark:text-white"/>
                        <span className='dark:text-white'>Settings</span>
                    </div>
                    </Link>
                </li>
                <li onClick={handleLogoutClick}>
                    <div id='link'>
                        <IoLogOutOutline className="text-[1.6rem] dark:text-white" />
                        <span className='dark:text-white'>Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default DesktopNav;
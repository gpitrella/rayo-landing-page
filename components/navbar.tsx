'use client'

import React, { useEffect, useState } from 'react'
import '../app/styles/navbar.css'
import { usePathname } from 'next/navigation'
import { FiBell } from 'react-icons/fi'
import { IoIosArrowDown } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import MobileNav from './mobileNav'
import DesktopNav from './desktopNav'
import { User } from '../app/models/user.model'
import { RootState } from '../app/store/store'

function Navbar() {

    const { user } = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const[dropDown, setDropDown] = useState<boolean>(false);
    const[width, setWidth] = useState<number>(0);
    const[shortUsername, setShortUsername] = useState<string>('')

    useEffect(()=> {
        if(user != null){
            const User = user as User
            const shortName = User.firstName.charAt(0) + User.lastName.charAt(0)
            setShortUsername(shortName.toUpperCase());
        }

    },[user])

    useEffect(()=>{
        function checkWindowWidth() {
            const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            setWidth(windowWidth)
        }

        checkWindowWidth()

        window.addEventListener('resize', checkWindowWidth);
        return () => {
            window.removeEventListener('click', checkWindowWidth);
        };
    })

    function closeDropDown(){
        setDropDown(false)
    }



    return (
            <div className='bg-[white] sticky top-0 left-0 w-screen h-[100px] sm:px-5 lg:px-20 py-8 flex justify-between items-center'>
                <div className="logo-div">
                    <span onClick={()=> router.push('/home')} className='font-bold sm:text-[1.7rem] lg:text-[2.4rem] text-lightblue cursor-pointer '>Appdule</span>
                </div>
                <div className='flex justify-start items-center sm:mr-0 lg:mr-4'>
                    <div className='notification sm:mr-0 lg:mr-3 rounded-[50%] bg-lightgrey w-12 h-12 flex justify-center items-center'>
                        <FiBell />
                    </div>
                    <div onClick={()=> setDropDown(!dropDown)} className='flex justify-start items-center hover:bg-darkSecondary rounded-[7px] cursor-pointer py-2 px-4 transition-all ease-in-out'>
                        <div className='notification mr-4 rounded-[50%] bg-lightgrey w-12 h-12 flex justify-center items-center'>
                            <span className='font-medium'>{shortUsername}</span>
                        </div>
                        <div className='flex justify-start items-center'>
                            <span className='mr-2 sm:invisible sm:hidden lg:block lg:visible'>{user?.firstName} {user?.lastName}</span>
                            <IoIosArrowDown />
                        </div>
                    </div>
                </div>

                {dropDown && (width < 720) && <MobileNav user={user} closeDropDown={closeDropDown} />}
                {dropDown && (width > 720) && <DesktopNav user={user} setDropDwon={setDropDown} />  }
                             
            </div>
    )
}

export default Navbar
"use client";
import { ChevronsDown, Menu } from "lucide-react";
import { PiCalendarBlank } from 'react-icons/pi'
import { RiHomeLine } from 'react-icons/ri'
import { HiMiniArrowLeft } from 'react-icons/hi2'
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5'
import { useRouter, usePathname } from 'next/navigation'
import '@/app/styles/navbar.css'
import { Logout } from '../../app/services/auth.service'
import { useAppDispatch } from '../../app/store/store'
import { reset } from '../../app/store/auth/authSlice'
import { checkUserLoggedIn } from '../../app/services/auth.service'
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { ToggleTheme } from "./toogle-theme";
import { useTheme } from "next-themes";
import { FiBell } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { useSelector } from 'react-redux';
import MobileNav from '../../components/mobileNav';
import DesktopNav from '../../components/desktopNav';
import { User } from '../../app/models/user.model';
import { RootState } from '../../app/store/store';
import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: "/#whoweare",
    label: "¿Quienes somos?",
  },
  {
    href: "/washer",
    label: "Lavar",
  },
  {
    href: "/#process",
    label: "Servicio",
  },
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "/#faq",
    label: "Consultas",
  },
];

const featureList: FeatureProps[] = [
  {
    title: "Misión",
    description: 'Simplificar la vida de las personas, mediante una plataforma para el mantenimiento del vehículo de manera eficiente, cómoda y ecológica. Revolucionando la forma en que las personas cuidan su vehículo.',
  },
  {
    title: "Visión",
    description:
      "Ser la plataforma de cuidado del vehículo mas grande y confiable del mundo, operando en todas las ciudades y ofreciendo una amplia gama de servicios de mantenimiento automotor.",
  }
];

export const Navbar: React.FC = () => {
  const pathname = usePathname()
  const dispatch= useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);  
  const { theme, setTheme } = useTheme(); 
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const[dropDown, setDropDown] = useState<boolean>(false);
  const[width, setWidth] = useState<number>(0);
  const[shortUsername, setShortUsername] = useState<string>('');
  const isAuthenticated = checkUserLoggedIn();
  
      useEffect(()=> {
          setShortUsername('')
          if(user != null){
              const User = user as User              
              const shortName = User.firstName.charAt(0) + User.lastName.charAt(0)
              setShortUsername(shortName.toUpperCase());
              setDropDown(false);              
          }          
          setDropDown(false);
      },[])
      
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
  
      function closeDropDown(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setDropDown(false);
      }

   return (
     <header className="h-[68px] shadow-inner bg-opacity-50 w-[90%] md:w-[85%] lg:w-[85%] lg:max-w-screen-xl sm:px-8 top-5 mx-auto sticky border border-secondary z-[1000] rounded-xl flex justify-between items-center py-0 px-6 bg-card">
       <Link
         href="/"
         className="font-black text-2xl flex items-center italic"
         >
         <Image
           width={35}
           height={35}
           src={theme === 'light' ? '/LogoRayoBlack.png' : '/LogoRayoWhite.png'}
           alt={theme === 'light' ? "Logo Rayo Black" : "Logo Rayo White"}
           className="relative inset-0 ml-auto object-cover object-center"
         /> 
       </Link>
       {/* <!-- Mobile --> */}
       <div className="flex items-center lg:hidden z-[1000]">
         <Sheet open={isOpen} onOpenChange={setIsOpen}>
            { !isAuthenticated && width < 720 ? 
            <Button onClick={()=> router.push('/auth/login')} className='justify-start text-base mr-3'>
              Login
            </Button> : null}
            { isAuthenticated && width < 720 ? 
              <div className='flex justify-start items-center sm:mr-0 lg:mr-4'>
                    <div className='notification mr-2 rounded-[50%] bg-lightgrey w-auto h-12 flex justify-center items-center'>
                        <span className='font-medium'>{shortUsername}</span>                            
                    </div>
              </div>    
            : null}  
           <SheetTrigger asChild>
             <div>            
               <Menu
                 onClick={() => setIsOpen(!isOpen)}
                 className="cursor-pointer lg:hidden z-[1000]"
               />
             </div>
           </SheetTrigger>

           <SheetContent
             side="left"
             className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary z-[1000]"
           >
             <div>
             { isAuthenticated ? <>
               <SheetHeader className="mb-4 ml-4">
                 <SheetTitle className="flex items-center">                                                         
                      <h3 className='font-semibold text-lg'>{user?.firstName} {user?.lastName}</h3>            
                 </SheetTitle>
               </SheetHeader> 

               <Separator className="mb-2" />
               <div className="flex flex-col gap-2">
                   <Button
                       key='home'
                       onClick={() => setIsOpen(false)}
                       asChild
                       variant="ghost"
                       className="justify-start text-base">
                     <Link
                       className={`${pathname === '/home' ? 'active' : ''}`}
                       href='/home'
                       >
                       <div id='link'>
                           <PiCalendarBlank className="text-[1.4rem] dark:text-white" />
                           <span className='dark:text-white'>Lavados Reservados</span>
                       </div>
                     </Link>
                   </Button>
                   <Button
                       key='profile'
                       onClick={() => setIsOpen(false)}
                       asChild
                       variant="ghost"
                       className="justify-start text-base">
                       <Link
                         className={`${pathname === '/settings/profile' ? 'active' : ''}`}
                         href='/settings/profile'
                         >
                         <div id='link'>
                             <IoSettingsOutline className="text-[1.4rem] dark:text-white"/>
                             <span className='dark:text-white'>Settings</span>
                         </div>
                       </Link>
                     </Button>
                     <Button
                       key='profile'
                       // onClick={() => setIsOpen(false)}
                       asChild
                       variant="ghost"
                       className="justify-start text-base">
                       <span onClick={()=>{
                           setDropDown(false);
                           Logout();                          
                           dispatch(reset())
                           router.push('/')                                
                       }}>
                           <div id='link'>
                               <IoLogOutOutline className="text-[1.6rem] dark:text-white" />
                               <span className='dark:text-white'>Logout</span>
                           </div>
                           
                       </span>
                     </Button>
                 </div>
                 <Separator className="mb-2 mt-2" />
                 </> : null}
               
               <div className="flex flex-col gap-2">
                 <Button
                     key='home'
                     onClick={() => setIsOpen(false)}
                     asChild
                     variant="ghost"
                     className="justify-start text-base"
                   >
                     <Link href="/">Home</Link>
                   </Button>
                 {routeList.map(({ href, label }) => (
                   <Button
                     key={href}
                     onClick={() => setIsOpen(false)}
                     asChild
                     variant="ghost"
                     className="justify-start text-base"
                   >
                     <Link href={href} >{label}</Link>
                   </Button>
                 ))}
               </div>
             </div>

             <SheetFooter className="flex-col sm:flex-col justify-start items-start">
               <Separator className="mb-2" />
               <ToggleTheme />
             </SheetFooter>
           </SheetContent>
         </Sheet>
       </div>
       {/* <!-- Desktop --> */}
       <NavigationMenu className="hidden lg:block mx-auto">
         <NavigationMenuList>

           <NavigationMenuItem>
             {routeList.map(({ href, label }) => (
               <NavigationMenuLink key={href} asChild>
                 <Link href={href} className="text-base px-2" >
                   {label}
                 </Link>
               </NavigationMenuLink>
             ))}
           </NavigationMenuItem>

           <NavigationMenuItem>
             <NavigationMenuTrigger className="bg-card text-base">
               Misión
             </NavigationMenuTrigger>
             <NavigationMenuContent>
               <div className="grid w-[650px] grid-cols-2 gap-5 p-4">
                 <Image
                   src={theme === 'light' ? '/LogoNegativo.png' : '/LogoPositivo.png'}
                   alt={theme === 'light' ? "Logo Rayo Black" : "Logo Rayo White"}
                   className="h-full w-full rounded-md object-cover p-14"
                   width={150}
                   height={150}
                 />
                 <ul className="flex flex-col gap-2">
                   {featureList.map(({ title, description }) => (
                     <li
                       key={title}
                       className="rounded-md p-3 text-sm hover:bg-muted h-auto"
                     >
                       <p className="mb-1 font-semibold leading-none text-foreground">
                         {title}
                       </p>
                       <p className="text-muted-foreground">
                         {description}
                       </p>
                     </li>
                   ))}
                 </ul>
               </div>
             </NavigationMenuContent>
           </NavigationMenuItem>

         </NavigationMenuList>
       </NavigationMenu>
       <div className="hidden lg:flex items-center">         

         { !isAuthenticated ? 
           <Button onClick={()=> router.push('/auth/login')} className='justify-start text-base'>
             Login
           </Button> 
           : <>
               <div className='flex justify-start items-center sm:mr-0 lg:mr-4'>
                 <button onClick={()=> setDropDown(!dropDown)} className='flex justify-start items-center hover:bg-darkSecondary rounded-[7px] cursor-pointer px-4 transition-all ease-in-out'>
                     <div className='notification mr-4 rounded-[50%] bg-lightgrey w-12 h-12 flex justify-center items-center'>
                         <span className='font-medium'>{shortUsername}</span>
                     </div>
                     <div className='flex justify-start items-center'>
                         <span className='mr-2 w-max sm:invisible sm:hidden lg:block lg:visible '>{user?.firstName} {user?.lastName}</span>
                         <IoIosArrowDown />
                     </div>
                 </button>
               </div>            
               {/* {dropDown && (width > 720) && <MobileNav user={user} closeDropDown={closeDropDown} />  } */}
               {dropDown && (width > 720) && <DesktopNav user={user} closeDropDown={closeDropDown} />  }
             </>
           }
         <ToggleTheme />
              
       </div>
     </header>
   );
};
'use client'

import * as React from 'react'
import { BiCalendarPlus } from 'react-icons/bi'
import Table from '@/components/table'
// import CreateAppointment from '../../../components/createAppointment'
import { getUpcomingAppointment } from '@/app/services/appointment.service'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store/store'
import routeGuard from '@/app/guard/routeGuard'
// import SnackBar from '@/components/snackBar'
import { fetchUser } from '@/app/store/user/userSlice'
// import { createAppointmentEffect } from '@/app/store/appointment/appointmentActions'
// import Navbar from '@/components/navbar'
import { BsFillCalendarMinusFill } from 'react-icons/bs'
// import toast from 'react-hot-toast'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { checkUserLoggedIn } from "@/app/services/auth.service";

function Page() {

  const { user } = useSelector((state: RootState) => state.user);
  // const { error, isLoading } = useSelector((state: RootState) => state.appointments);
  const { uid } = useSelector((state: RootState) => state.auth);
  // const [createAppointmentBtn, setCreateAppointmentBtn] = React.useState<boolean>(false)
  const [data, setData] = React.useState<any>([])
  // const [appointments, setAppointments] = React.useState<string>('')
  const [fetchData, setFetchData] = React.useState<boolean>(false); // Controla cuándo se busca data
  const [userLoaded, setUserLoaded] = React.useState<boolean>(false); // Controla si el user está cargado
  const dispatch = useAppDispatch();
  const router = useRouter();


  React.useEffect(() => {
    // Fetch del usuario primero
    if (!user && uid) {
      dispatch(fetchUser(uid)).then(() => setUserLoaded(true));
    }
  }, [dispatch, uid, user]);

    // Chequea que este logeado.
      React.useEffect(() => {
          const isAuthenticated = checkUserLoggedIn();
          if (!isAuthenticated) {
              router.push('/auth/login');
          }
      }, [router]); // Evitar actualizaciones no controladas del router

  React.useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      if (uid) { 
        const res = await getUpcomingAppointment(uid);
        // const totalAppointment = await getAllAppointment(user.email);
  
        setData(res);
        // setAppointments(totalAppointment.length);
        setFetchData(false);
      }
    };
  
    // Ejecuta fetchUpcomingAppointments solo si el usuario está completamente cargado.
    if (uid) {
      fetchUpcomingAppointments();
    }
  }, [uid, fetchData]);
  
  React.useEffect(() => {

      if (uid){
        dispatch(fetchUser(uid)); // 
      }
    // }
  }, [dispatch, uid, user]);

  return (
    <>
      <div className='w-[85%] md:w-[85%] lg:w-[85%] lg:max-w-screen-xl sm:px-0 top-5 mx-auto z-40 py-0 px-0 mt-12'>
        {/* { createAppointmentBtn && <CreateAppointment showCreateAppt={showCreateAppointmentComponent} loading={isLoading} createAppt={handleCreateAppointment} /> } */}
        <div className="container mx-auto px-0 w-full mt-[20px]">        
            <Button className='w-auto group/arrow items-center justify-center transition-all ease-in-out ml-3 font-semibold md:text-base sm:text-sm gap-2'>
                <Link href='/reserva' >                                       
                    <span>Agendar Lavado</span>                  
                </Link>              
              <BiCalendarPlus className='md:text-[20px] sm:text-[15px] '/>
            </Button>
        </div>
        <div className="container mx-auto px-0 w-full mt-[20px]">
          <div className="text-left lg:text-left">
            <div className="col-span-full xl:col-span-7">        
              <h1 className='lg:text-2xl sm:text-lg font-medium mb-8 text-center'>Lavados Reservados</h1>

              <div className='appt-container'>
                {(data?.length === 0 ) && (
                  <div className='w-full bg-[white] px-8 py-16 mt-4 flex flex-col justify-center items-center dark:bg-[black]'>
                    <BsFillCalendarMinusFill className="text-[#858585] text-[4rem] " />
                    <p className='mt-3 sm:text-base md:text-xl text-[#858585] text-center leading-snug'>No cuentas con ningún lavado agendado</p>
                  </div>
                )}
                { data?.length > 0 && <Table setFetchData={setFetchData} data={data}/>}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default routeGuard(Page);
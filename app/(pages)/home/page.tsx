'use client'

import * as React from 'react'
import { BiCalendarPlus } from 'react-icons/bi'
import Table from '@/components/table'
import CreateAppointment from '../../../components/createAppointment'
import { getUpcomingAppointment } from '@/app/services/appointment.service'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store/store'
import routeGuard from '@/app/guard/routeGuard'
import SnackBar from '@/components/snackBar'
import { fetchUser } from '@/app/store/user/userSlice'
import { createAppointmentEffect } from '@/app/store/appointment/appointmentActions'
// import Navbar from '@/components/navbar'
import { BsFillCalendarMinusFill } from 'react-icons/bs'
import toast from 'react-hot-toast'
import { Button } from "@/components/ui/button";



function Page() {

  interface AppointmentRequest {
    user_id: string;
    title: string;
    date: string;
    time: string;
    description: string;
  }

  const { user } = useSelector((state: RootState) => state.user);
  const { error, isLoading } = useSelector((state: RootState) => state.appointments);
  const { uid } = useSelector((state: RootState) => state.auth);
  const [createAppointmentBtn, setCreateAppointmentBtn] = React.useState<boolean>(false)
  const [data, setData] = React.useState<any>([])
  const[fetchData, setFetchData] = React.useState<boolean>(true)
  const dispatch = useAppDispatch();
  const showCreateAppointmentComponent = () => {
    setCreateAppointmentBtn(!createAppointmentBtn)
  }


  const handleCreateAppointment = async(data: AppointmentRequest) => {
    try {
        await dispatch(createAppointmentEffect(data));  
        toast.success('Created successfully!')
        setFetchData(true)
        setCreateAppointmentBtn(false)
    } catch (error) {
        toast.error('Error creating appointment!')
    }
  }



  React.useEffect(()=>{

    const fetchUpcomingAppointments = async()=> {
      if(uid){
        const res = await getUpcomingAppointment()
        setData(res) 
        setFetchData(false);
      }
    }
    if(fetchData){
      fetchUpcomingAppointments();
    }
  },[fetchData, uid])

  React.useEffect(()=>{
    if(!user){
      if(uid){
        dispatch(fetchUser(uid))
      }
    }
  },[dispatch, uid, user])

  return (
    <>
      {/* <Navbar /> */}
      <div className='w-[85%] md:w-[85%] lg:w-[85%] lg:max-w-screen-xl sm:px-0 top-5 mx-auto z-40 py-0 px-0 mt-12'>
      { createAppointmentBtn && <CreateAppointment showCreateAppt={showCreateAppointmentComponent} loading={isLoading} createAppt={handleCreateAppointment} /> }
      <div className="container mx-auto px-0 w-full mt-[20px]">        
          <Button onClick={showCreateAppointmentComponent} className='w-auto font-bold group/arrow items-center justify-center transition-all ease-in-out'>
            <BiCalendarPlus className='md:text-[30px] sm:text-[20px] ' /><span className='ml-3 font-semibold md:text-base sm:text-sm'>Agendar Lavado</span>
          </Button>
      </div>
      <div className="container mx-auto px-0 w-full mt-[20px]">
        <div className="grid grid-cols-12 text-left lg:text-left">
          <div className="col-span-full rounded-xl border border-white bg-white/90 dark:bg-card dark:border-zinc-800 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">        
            <h1 className='lg:text-2xl sm:text-lg font-medium'>Lavados agendados</h1>

            <div className='appt-container'>
              {(data?.length === 0 ) && (
                <div className='w-full bg-[white] px-8 py-16 mt-4 flex flex-col justify-center items-center'>
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
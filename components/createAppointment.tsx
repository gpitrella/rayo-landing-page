'use client'

import React, { FormEvent, useEffect } from 'react'
import '@/app/styles/createAppointment.css'
import Datepicker from './datepicker'
import { MdOutlineCancel } from 'react-icons/md'
import { User } from '../app/models/user.model'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store/store'
import dayjs, { Dayjs } from 'dayjs';
import BtnLoader from './btnLoader';
import { Button } from "@/components/ui/button";

function CreateAppointment(props: any) {

    const { uid } = useSelector((state: RootState) => state.auth);
    const[modelo, setModelo] = React.useState<string | null>(null)
    const[color, setColor] = React.useState<string | null>(null)
    const[patente, setPatente] = React.useState<string | null>(null)
    const[time, setTime] = React.useState<string | null>(null)
    const[date, setDate] = React.useState<string | null>(null)
    const[description, setDescription] = React.useState<string>('')

    const getDateAndTime = (data: any) => {
        const dateFormatted = dayjs(data).format('ddd, MMMM D');
        const timeFormatted = dayjs(data).format('HH:mmA');
        setDate(dateFormatted);
        setTime(timeFormatted)  
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(date === null || time === null || modelo === null || color === null || patente === null) return;
        const request = {
            user_id: uid,
            modelo,
            color,
            patente,
            date,
            time,
            description
        }
        props.createAppt(request) 
    }

  return (
    <>
    <div className='fixed z-[1000] w-screen h-screen top-0 left-0 backdrop-brightness-50 bg-white/30 flex justify-center items-center'>
        <div className='rounded-[10px] bg-[white] sm:px-4 md:px-5 py-8 lg:w-[500px] sm:w-[90%] h-auto text-dark  '>
            <div className='w-full flex justify-between items-center mb-5'>
                <h1 className=' font-semibold sm:text-xl md:text-2xl'>Agendar Lavado</h1>
                <MdOutlineCancel onClick={props.showCreateAppt} className='sm:text-[1.4rem] md:text-[1.8rem] cursor-pointer opacity-70 ' />
            </div>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className="flex flex-col mb-3">
                    <label className="text-[0.9rem] font-medium mb-1 ">Marca y Modelo Vehículo</label>
                    <input onChange={(e)=> setModelo(e.target.value)} type="text" placeholder="Ej.: Toyota Etios, Ford K, ..." required/>
                </div>
                <div className="flex flex-row mb-3 gap-3">
                    <div className="flex flex-col">
                        <label className="text-[0.9rem] font-medium mb-1 ">Color del Vehículo</label>
                        <input onChange={(e)=> setColor(e.target.value)} type="text" placeholder="Ej.: Blanco, Negro ..." required/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[0.9rem] font-medium mb-1 ">Patente del Vehículo</label>
                        <input onChange={(e)=> setPatente(e.target.value)} type="text" placeholder="Ej.: AF876UP, GHR 654 ..." required/>
                    </div>
                </div>
                <div className="flex flex-col mt-3"> 
                    <label className="text-[0.9rem] font-medium mb-1 ">Date</label>
                    <Datepicker getDateAndTime={getDateAndTime} /> 
                </div>
                <div className="flex flex-col mt-3">
                    <label className="text-[0.9rem] font-medium mb-1 ">Información Adicional</label>
                    <textarea onChange={(e)=> setDescription(e.target.value)} className='text-area' placeholder='Datos adicionales para poder ubicar el vehículo si es necesario.' required></textarea>
                </div>
                <Button className='button w-auto font-bold group/arrow mt-4'>{ props.isLoading ? <BtnLoader /> : 'Book Appointment' }</Button>
            </form>
        </div>
    </div>  
    </>
  )
}

export default CreateAppointment
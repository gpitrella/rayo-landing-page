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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { PiPlaceholderFill } from 'react-icons/pi'

function CreateAppointment(props: any) {

    const { uid } = useSelector((state: RootState) => state.auth);
    const[modelo, setModelo] = React.useState<string | null>(null)
    const[color, setColor] = React.useState<string | null>(null)
    const[patente, setPatente] = React.useState<string | null>(null)
    const[telefono, setTelefono] = React.useState<string | null>(null)
    const[place, setPlace] = React.useState<string | null>(null)
    const[terms, setTerms] = React.useState<boolean | false>(false)
    const[time, setTime] = React.useState<string | null>(null)
    const[date, setDate] = React.useState<string | null>(null)
    const[description, setDescription] = React.useState<string>('')
    // const [selectedValue, setSelectedValue] = React.useState<string | undefined>();    

    const getDateAndTime = (data: any) => {
        const dateFormatted = dayjs(data).format('ddd, MMMM D');
        const timeFormatted = dayjs(data).format('HH:mmA');
        setDate(dateFormatted);
        setTime(timeFormatted)  
    }    


    const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(date === null || time === null || modelo === null || color === null || patente === null || telefono === null || place === null || terms === false) return;
        const request = {
            user_id: uid,
            modelo,
            color,
            patente,
            place,
            telefono,
            terms,
            date,
            time,
            description
        }
        props.createAppt(request) 
    }

  return (
    <>
    <div className='fixed z-[1000] w-screen h-screen top-0 left-0 backdrop-brightness-50 bg-white/30 flex justify-center items-center'>
        <div className='rounded-[10px] bg-[white] dark:bg-card sm:px-4 md:px-5 py-8 lg:w-[600px] sm:w-[90%] h-auto text-dark  '>
            <div className='w-full flex justify-between items-center mb-5'>
                <h1 className=' font-semibold sm:text-xl md:text-2xl'>Agendar Lavado</h1>
                <MdOutlineCancel onClick={props.showCreateAppt} className='sm:text-[1.4rem] md:text-[1.8rem] cursor-pointer opacity-70 ' />
            </div>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className="flex flex-col mb-3 w-[100%]">
                    <label className="text-[0.9rem] font-medium mb-1 dark:text-white">Marca y Modelo Vehículo *</label>
                    <input className="dark:text-black" onChange={(e)=> setModelo(e.target.value)} type="text" placeholder="Ej.: Toyota Etios, Ford K, ..." required/>
                </div>
                <div className="flex flex-row mb-3 gap-3">
                    <div className="flex flex-col w-[50%]">
                        <label className="text-[0.9rem] font-medium mb-1 dark:text-white">Color del Vehículo *</label>
                        <input className="dark:text-black w-[100%]" onChange={(e)=> setColor(e.target.value)} type="text" placeholder="Ej.: Blanco, Negro ..." required/>
                    </div>
                    <div className="flex flex-col w-[50%]">
                        <label className="text-[0.9rem] font-medium mb-1 dark:text-white">Patente del Vehículo *</label>
                        <input className="dark:text-black w-[100%]" onChange={(e)=> setPatente(e.target.value)} type="text" placeholder="Ej.: AF876UP, GHR 654 ..." required/>
                    </div>
                </div>
                <div className="flex flex-row mb-3 gap-3">
                    <div className="flex flex-col w-[50%]">
                        <label className="text-[0.9rem] font-medium mb-1 dark:text-white">Fecha y Hora *</label>
                        <Datepicker className="dark:text-black" getDateAndTime={getDateAndTime} /> 
                    </div>
                    <div className="flex flex-col w-[50%]">
                        <label className="text-[0.9rem] font-medium mb-1 dark:text-white">Número de telefono *</label>
                        <input className="dark:text-black" onChange={(e)=> setTelefono(e.target.value)} type="text" placeholder="Ej.: 11 5674 9832" required/>
                    </div>
                </div>
                 <div className="flex flex-col mt-3">
                     <label className="text-[0.9rem] font-medium mb-1 dark:text-white">Seleccionar Estacionamiento *</label>
                    <Select onValueChange={(value) => setPlace(value)}>
                        <SelectTrigger className="w-full z-[1100] h-[40px] border-[1px] border-[#b9b9b9] outline-none px-3 py-[23px] text-base rounded-md bg-gray-200 dark:text-white dark: bg-black">
                            <SelectValue placeholder="Seleccionar opción" className="text-gray-600"/>
                        </SelectTrigger>
                        <SelectContent className="z-[1100]">
                            <SelectItem value="Olazabal Park - (Av. Olazábal 1360, Belgrano)">Olazabal Park - (Av. Olazábal 1360, Belgrano)</SelectItem>                            
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col mt-3">
                    <label className="text-[0.9rem] font-medium mb-1 dark:text-white">Información Adicional</label>
                    <textarea onChange={(e)=> setDescription(e.target.value)} className='text-area' placeholder='Datos adicionales para poder ubicar el vehículo si es necesario.'></textarea>
                </div>
                
                <div className="flex items-center mt-3">
                    <input type="checkbox" id="terms" onChange={(e)=> setTerms(e.target.checked)} required className="w-4 h-4 mr-2 accent-blue-600" />
                    <label htmlFor="terms" className="text-[0.9rem] font-medium dark:text-white">
                        Acepto los <a href="/terms" className="text-blue-500 underline">Términos y Condiciones</a>
                    </label>
                </div>

                <Button className='button w-auto font-bold group/arrow mt-4'>{ props.isLoading ? <BtnLoader /> : 'Book Appointment' }</Button>
            </form>
        </div>
    </div>  
    </>
  )
}

export default CreateAppointment
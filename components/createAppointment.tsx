'use client'

import React, { FormEvent, useEffect } from 'react'
import '@/app/styles/createAppointment.css'
import Datepicker from './datepicker'
import { MdOutlineCancel } from 'react-icons/md'
import { User } from '../app/models/user.model'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store/store'
import dayjs, { Dayjs } from 'dayjs';
import "dayjs/locale/es";
import BtnLoader from './btnLoader';
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
// import { PiPlaceholderFill } from 'react-icons/pi'




function CreateAppointment(props: any) {
    const { loading, status } = useSelector((state: RootState) => state.auth);
    const { uid } = useSelector((state: RootState) => state.auth);
    const { user } = useSelector((state: RootState) => state.user);
    const[modelo, setModelo] = React.useState<string | null>(null)
    const[color, setColor] = React.useState<string | null>(null)
    const[patente, setPatente] = React.useState<string | null>(null)
    const[phone, setPhone] = React.useState<string | null>(null)
    const[place, setPlace] = React.useState<string | null>(null)
    const[terms, setTerms] = React.useState<boolean | false>(false)
    const[time, setTime] = React.useState<string | null>(null)
    const[date, setDate] = React.useState<string | null>(null)
    const[description, setDescription] = React.useState<string>('')
    const [error, setError] = React.useState<string>("");  
    dayjs.locale("es");
    
    const getDateAndTime = (data: any) => {
        const dateFormattedPre = dayjs(data).format("dddd, D [de] MMMM");
        // Capitaliza la primera letra del día
        const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
        const dateFormatted = capitalize(dateFormattedPre);
        const timeFormatted = dayjs(data).format('HH:mmA');
        setDate(dateFormatted);
        setTime(timeFormatted)  
    }      
    
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log('user: ', user)
        if(date === null || time === null || modelo === null || color === null || patente === null || phone === null || place === null || terms === false) return;
        const request = {
            user_id: uid,
            modelo,
            color,
            patente,
            place,
            phone,
            terms,
            date,
            time,
            description
        }
        props.createAppt(request);   

        const emailPayload = {
            email: user.email,
            subject: `Reserva Lavado: ${modelo || "Sin modelo"}, ${color || "Sin color"}, ${patente || "Sin patente"}`,
            message: { text: "Detalles del cliente:" }, // Cambia a un objeto para evitar errores
          };
          
          try {
            const response = await fetch("/api/sendEmail", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(emailPayload),
            });
      
            const result = await response.json();
            console.log("Respuesta del servidor:", result);
          } catch (error) {
            console.error("Error enviando solicitud:", error);
          }

          // try {
          //   const response = await fetch("/api/sendwhatsapp", {
          //     method: "POST",              
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify({ phone }),
          //   });
      
          //   if (!response.ok) {
          //     throw new Error("Failed to send message");
          //   }
      
          //   const data = await response.json();
          //   console.log("Success:", data);
          // } catch (error) {
          //   console.error("Error sending WhatsApp message:", error);
          // }
      
        
      
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
                              <input 
                                  className="dark:text-black w-[100%]" 
                                  onChange={(e) => {
                                      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/; // Solo letras, espacios y caracteres en español
                                      if (regex.test(e.target.value)) {
                                        setColor(e.target.value); // Actualiza solo si pasa el regex
                                        setError('');
                                      } else { setError('Solo se permiten letras en el campo COLOR.') }
                                    }}                          
                                  type="text" 
                                  placeholder="Ej.: Blanco, Negro ..." required/>
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
                              <input 
                                  className="dark:text-black"  
                                  onChange={(e) => {
                                      const regex = /^[0-9]*$/; // Solo letras, espacios y caracteres en español
                                      if (regex.test(e.target.value)) {
                                        setPhone(e.target.value); // Actualiza solo si pasa el regex
                                        setError('');
                                      } else { setError('Solo se permiten números en el campo TELEFONO.') }
                                    }}                              
                                  type="text" 
                                  placeholder="Ej.: 11 5674 9832" required/>
                          </div>
                      </div>
                       <div className="flex flex-col mt-3">
                           <label className="text-[0.9rem] font-medium mb-1 dark:text-white">Seleccionar Estacionamiento *</label>
                          <Select onValueChange={(value) => setPlace(value)}>
                              <SelectTrigger className="w-full z-[1100] h-[40px] border-[1px] border-[#b9b9b9] outline-none px-3 py-[23px] text-base rounded-md bg-gray-200 dark:text-white dark:bg-black">
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
                      {/* Mensaje de error común */}
                      {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
                      <div className="flex items-center mt-3">
                          <input type="checkbox" id="terms" onChange={(e)=> setTerms(e.target.checked)} required className="w-4 h-4 mr-2 accent-blue-600" />
                          <label htmlFor="terms" className="text-[0.9rem] font-medium dark:text-white">
                              Acepto los <a href="/terms" className="text-blue-500 underline">Términos y Condiciones</a> del servicio de lavado RAYO.
                          </label>
                      </div>
                    <Button
                        className={loading ? 'button-disabled w-full font-bold group/arrow mt-5' : 'button w-full font-bold group/arrow mt-5'}
                        disabled={loading}
                    >
                        {loading ? <BtnLoader /> : 'Agendar Lavado'}
                        {!loading && <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />}
                    </Button>       
                      {/* <Button className='button w-auto font-bold group/arrow mt-4'>{ props.isLoading ? <BtnLoader /> : 'Book Appointment' }</Button> */}
                  </form>
              </div>
          </div>
      </>
  );
}

export default CreateAppointment
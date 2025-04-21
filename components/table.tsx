import { MdDeleteOutline, MdClear } from 'react-icons/md'
import { AppointmentModel } from '../app/models/appointment.model';
import { DocumentData } from 'firebase/firestore';
import ConfirmDialogueBox from './confirmDeleteDialogue';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import SnackBar from '@/components/snackBar'



const Table: React.FC<DocumentData> = (props): JSX.Element  => {

    const {data, setFetchData} = props;
    // const [openSnackBar, setOpenSnackBar] = useState<boolean>(false)
    const [confirmDelete, setConfirmDelete] =  useState<boolean>(false)
    const [appointmentID, setAppointmentID] =  useState<string>('')
    const closeDialogue = () =>{
        setFetchData(true)
        setConfirmDelete(false)
    }
    const icon = "Sparkle"
    return ( 
        <>
        <div className="grid lg:grid-cols-4 gap-4 w-full">
          {data.map((appt: AppointmentModel, index: number) => (
            <Card
              key={index}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"              
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                  <div className="action">
                    <span onClick={() =>{ 
                        setConfirmDelete(true)
                        setAppointmentID(appt.appointment_id) 
                        }} 
                        className=" text-lightblue cursor-pointer text-[1.5rem]"
                        >
                            <MdDeleteOutline color="#ED3E3E"/>
                        </span>
                   </div>
                </div>

                <CardTitle>Lavado Reservado</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground flex flex-col"> 
                 <span> Modelo: {appt.modelo} </span>                
                 <span> Color: {appt.color} </span>
                 <span> Patente: {appt.patente} </span>                 
                 <span> Fecha/Hora: {appt.date} - {appt.time} </span>
                 <span> Lugar: {appt.place} </span>
                 <span> Estado: {appt.status} </span>
                 <span> Descripción: {appt.description} </span>
                 <span> ID Lavado: {appt.appointment_id} </span>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="w-full mt-4 bg-[#ffffff] rounded-[7px]">
            {confirmDelete && <ConfirmDialogueBox closeDialogue={closeDialogue} id={appointmentID} />}
        </div>

        </>
     );
}
 
export default Table;
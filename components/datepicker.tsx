'use client';

import * as React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { addDays, setHours, setMinutes } from 'date-fns';



function Datepicker(props: any) {

    const [date, setDate] = React.useState<any>('');
    return(

        <DatePicker
        selected={date} 
        onChange={(data) =>{
            setDate(data)
            props.getDateAndTime(data)
        }}
        minDate={new Date()} 
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        minTime={setHours(setMinutes(new Date(), 0), 8)}
        maxTime={setHours(setMinutes(new Date(), 30), 22)}
        excludeDates={[]}
        timeCaption="time"
        maxDate={addDays(new Date(), 5)}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Por favor seleccione una fecha y hora"
        className="dark:text-black"
        />
    );
}

export default Datepicker
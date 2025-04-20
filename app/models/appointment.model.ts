export interface AppointmentModel {
    user_id: string,
    appointment_id: string,
    modelo: string,
    patente: string,
    color: string,
    telefono: string,
    place: string,
    terms: boolean,
    date: string,
    time: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    status: 'ACTIVE' | 'PENDING' | 'COMPLETED'
}


export interface AppointmentRequest {
    user_id: string,
    modelo: string,
    patente: string,
    color: string,
    telefono: string,
    place: string,
    terms: boolean,
    date: string,
    time: string,
    description: string,
}

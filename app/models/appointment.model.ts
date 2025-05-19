export interface AppointmentModel {
  user_id: string;
  appointment_id: string;
  email:string;
  modelo: string;
  patente: string;
  tipo_vehiculo: string; 
  color: string;
  phone: string;
  location: { 
    lat: number;
    lng: number;
    address: string;
    street: string;
    number: string;
    city: string;
  };
  terms: boolean;
  date: string;
  time: string;
  description: string;
  createdAt: string; 
  updatedAt: string;
  status: 'ACTIVE' | 'PENDING' | 'CANCELED';
}


export interface AppointmentRequest {
  user_id: string;
  email: string
  modelo: string;
  patente: string;
  tipo_vehiculo: string; 
  color: string;
  phone: string;
  location: { 
    lat: number;
    lng: number;
    address: string;
    street: string;
    number: string;
    city: string;
  };
  terms: boolean;
  date: string;
  time: string;
  description: string;
  createdAt: string; 
  status: 'ACTIVE' | 'PENDING' | 'CANCELED';
}

export interface AppointmentModel {
  user_id: string;
  appointment_id: string;
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
  created_at: string; 
  updatedAt: string;
  status: string;
}


export interface AppointmentRequest {
  user_id: string;
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
  created_at: string; 
  status: string;
}

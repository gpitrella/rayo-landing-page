export interface User {
    email: string | null,
    firstName: string,
    lastName: string,
    user_id: string,
    updatedAt: string,
    createdAt: string
}

export interface Washer {
  email: string | null;
  firstName: string;
  lastName: string;
  washer_id: string;
  updatedAt: string;
  createdAt: string;
  statusWasher: string;
  doc: {
    telefono: string;
    documento: File | null;
    numberID: string;
    monotributo: File | null;
    mayorEdad: boolean;
    terminos: boolean;
  };
  cap: boolean;
  review: { rating: number; comment: string }[];
}

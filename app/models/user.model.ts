export interface User {
    email: string | null,
    firstName: string,
    lastName: string,
    user_id: string,
    updatedAt: string,
    createdAt: string
}

export interface Washer {
    email: string | null,
    firstName: string,
    lastName: string,
    washer_id: string,
    updatedAt: string,
    createdAt: string,
    statusWasher: string,
}
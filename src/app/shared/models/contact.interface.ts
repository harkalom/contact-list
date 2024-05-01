export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    birthDate?: Date;
    email?: string;
    address?: string;
}
import { Address } from "./address";

export interface RegisterDto {

    firstName: string;
    lastName: string;
    email: string;
    dob: Date;
    veteranStatus: boolean;
    phone: string;
    password: string;
    address: Address;
}
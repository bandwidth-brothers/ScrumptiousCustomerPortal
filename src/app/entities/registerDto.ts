import { Address } from "./address";

export interface RegisterDto {

    firstName: string;
    lastName: string;
    email: string;
    dob: Date;
    veteranaryStatus: boolean;
    phone: string;
    password: string;
    address: Address;
}
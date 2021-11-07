import { Address } from './address';

/*
    UUIDs aren't strictly strings. However, since an ID's main purpose in the frontend
    is to identify the user for things like viewing their profile, and it's not meant
    to be user-mutable, creating a custom TS type for operating on them seems unnecessary.
*/

export interface Customer {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    loyaltyPoints: number;
    phone: string;
    dob: Date;
    veteranStatus: boolean;
    address: Address;
}
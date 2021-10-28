import { Time } from '@angular/common';
import { Address } from './address'

export interface Restaurant {
    id?: number,
    isActive: boolean,
    address: Address,
    cuisines: [],
    name: string,
    owner: object,
    picture: string,
    priceCategory: string,
    rating: number,

    // either string or any, wont work otherwise
    openingTime: string,
    closingTime: string
}
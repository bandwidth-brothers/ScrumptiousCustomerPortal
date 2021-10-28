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
    rating: number
}
import { Address } from './Address'

export interface Restaurant {
    id?: number,
    isActive: boolean,
    address: Address,
    cuisines: [],
    name: string,
    owner: object,
    priceCategory: string,
    rating: number
}
import { Restaurant } from './Restaurant'

export interface MenuItem {
    id?: number,
    name: string,
    price: object,
    isAvailable: boolean,
    rating: number,
    restaurant: Restaurant
}
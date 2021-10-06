import { Restaurant } from './restaurant'

export interface MenuItem {
    id: number,
    name: string,
    price: object,
    isAvailable: boolean,
    restaurant: Restaurant
}
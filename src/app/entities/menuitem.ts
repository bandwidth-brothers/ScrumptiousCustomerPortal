import { Restaurant } from './restaurant'

export interface Menuitem {
    id: number,
    name: string,
    description: string,
    picture: string,
    discount: number,
    price: number,
    isAvailable: boolean,
    restaurant: Restaurant,
}
import { Restaurant } from './restaurant'

export interface Menuitem {
    id: number,
    name: string,
    description: string,
    discount: number,
    price: object,
    isAvailable: boolean,
    restaurant: Restaurant,

}
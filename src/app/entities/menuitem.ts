import { Restaurant } from './restaurant'

export interface Menuitem {
    id: number,
    name: string,
    price: object,
    isAvailable: boolean,
    restaurant: Restaurant,

}
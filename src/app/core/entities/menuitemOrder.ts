import { Menuitem } from "./menuitem";
import { Order } from "./order";
import { Restaurant } from "./restaurant";

export interface MenuitemOrder {
    menuitem: Menuitem,
    order: Order,
    quantity: number,
}
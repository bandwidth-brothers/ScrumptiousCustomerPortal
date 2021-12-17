import { Customer } from "./customer";
import { MenuitemOrder } from "./menuitemOrder";
import { Restaurant } from "./restaurant"

export interface Order {
    id: number;
    customer: Customer;
    restaurant: Restaurant;
    confirmationCode: string;
    requestedDeliveryTime: Date;
    orderDiscount: number;
    submitedAt: Date;
    preparationStatus: string;
    menuitemOrders: MenuitemOrder[];
    // delivery: Delivery;
}
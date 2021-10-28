import { MenuitemOrder } from "./menuitemOrder";
import { UpdateMenuitemOrder } from './updateMenuitemOrder';

export interface UpdateOrderDto {
    id: number;
    customerId?: string;
    restaurantId?: number;
    confirmationCode?: string;
    requestedDeliveryTime?: any;
    orderDiscount?: number;
    submittedAt?: any;
    preparationStatus?: string;
    menuitems?: UpdateMenuitemOrder[];
}
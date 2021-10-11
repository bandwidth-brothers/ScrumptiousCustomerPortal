import { MenuitemOrder } from "./menuitemOrder";

export interface UpdateOrderDto {
    id: number;
    customerId?: string;
    restaurantId?: number;
    confirmationCode?: string;
    requestedDeliveryTime?: any;
    orderDiscount?: number;
    submittedAt?: any;
    preparationStatus?: string;
    menuitemOrders?: MenuitemOrder[];
}
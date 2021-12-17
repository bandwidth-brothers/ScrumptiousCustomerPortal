
export interface OrderMessageDto {
    customerName?: string;
    customerPhoneNumber?: string,
    restaurantName?: string;
    restaurantAddress?: string,
    confirmationCode?: string;
    preparationStatus?: string;
    requestedDeliveryTime: any;
}
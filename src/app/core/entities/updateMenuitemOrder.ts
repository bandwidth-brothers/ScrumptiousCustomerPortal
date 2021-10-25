import { MenuitemOrder } from "./menuitemOrder"

export interface UpdateMenuitemOrder {
    menuitemId: number,
    quantity: number,
}

export const MenuitemToUpdateMenuitemOrder = (menuitemOrder: MenuitemOrder) => {
    const mapped: UpdateMenuitemOrder = {
        menuitemId: menuitemOrder.menuitem.id,
        quantity: menuitemOrder.quantity
    }

    return mapped;
}
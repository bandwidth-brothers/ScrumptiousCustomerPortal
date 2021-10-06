import { MenuItem } from "src/app/entities/menu-item";
import { RESTAURANTS } from 'src/app/shared/mocks/mock-restaurants'

export const MENU_ITEMS: MenuItem[] = [
    {
        "id": 1001,
        "name": "Fried Cheese Balls",
        "price": {},
        "isAvailable": true,
        "restaurant": RESTAURANTS[0]
    },
    {
        "id": 1002,
        "name": "Fries",
        "price": {},
        "isAvailable": true,
        "restaurant": RESTAURANTS[0]
    },
    {
        "id": 1003,
        "name": "Fries",
        "price": {},
        "isAvailable": true,
        "restaurant": RESTAURANTS[1]
    },
    {
        "id": 1004,
        "name": "Strawberry Smoothie",
        "price": {},
        "isAvailable": true,
        "restaurant": RESTAURANTS[1]
    },
    {
        "id": 1005,
        "name": "Mango Smoothie",
        "price": {},
        "isAvailable": true,
        "restaurant": RESTAURANTS[1]
    },
    {
        "id": 1006,
        "name": "Lobster",
        "price": {},
        "isAvailable": true,
        "restaurant": RESTAURANTS[2]
    },
]
import { Restaurant } from "src/app/core/entities/restaurant";
import { ADDRESSES } from 'src/app/shared/mocks/mock-addresses'

export const RESTAURANTS: Restaurant[] = [
    {
        "id": 1001,
        "isActive": true,
        "address": ADDRESSES[0],
        "cuisines": [],
        "name": "Burger King",
        "owner": {},
        "picture": "",
        "priceCategory": '$',
        "rating": 3,
        "openingTime": "5:00",
        "closingTime": "12:00"
    },
    {
        "id": 1002,
        "isActive": true,
        "address": ADDRESSES[1],
        "cuisines": [],
        "name": "Smoothie Palace",
        "owner": {},
        "picture": "",
        "priceCategory": '$',
        "rating": 3.5,
        "openingTime": "5:00",
        "closingTime": "12:00"
    },
    {
        "id": 1001,
        "isActive": true,
        "address": ADDRESSES[2],
        "cuisines": [],
        "name": "Red Lobster",
        "owner": {},
        "picture": "",
        "priceCategory": '$$$',
        "rating": 4.1,
        "openingTime": "5:00",
        "closingTime": "12:00"
    },
]
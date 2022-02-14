import { Time } from '@angular/common';
import { Address } from './address'
import { Restaurant } from './restaurant';

export interface Page {
    content: Restaurant[],
    pageable: Object,
    last: boolean,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number,
    sort: Object,
    first: boolean,
    numberOfElements: number,
    empty: boolean
}
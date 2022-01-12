import { Restaurant } from "./restaurant";

export interface CustomerDashBoardTto{
    restaurant: Restaurant;
    totalOrders: number;
    rewardPoints: number;
}
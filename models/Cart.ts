import { CartEntry } from "./CartEntry";
import { User } from "./User";

export interface Cart {
    id: number,
    user: User,
    cartEntries: CartEntry[],
    totalPrice: number
}

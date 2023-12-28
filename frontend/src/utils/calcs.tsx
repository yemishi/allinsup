import { CartType } from "../types";

export const totalPrice = (cart: CartType[]) => cart.reduce((total, currentPrice) => {
    return total + ((currentPrice.promotion ? currentPrice.promotion : currentPrice.price) * currentPrice.amount)
}, 0)

export const totalAmount = (cart: CartType[]) => cart.reduce((total, currentItem) => {
    return total + currentItem.amount;
}, 0);
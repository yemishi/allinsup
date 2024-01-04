import { totalPrice, totalAmount } from "./calcs";
import { parseLocalCurrency, parseAlt, urlReplace, parseToNumber } from "./formatting";
import { waitingProduct } from "./isWaiting";
import { stickyVariant, productDetails, findInArray, } from "./helpers";
import { slideOptions, divList } from "./templates"
export {
    totalAmount, divList, slideOptions, productDetails, parseToNumber, urlReplace, stickyVariant, totalPrice, findInArray,
    parseLocalCurrency, waitingProduct, parseAlt
}
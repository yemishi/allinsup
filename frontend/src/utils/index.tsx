import { totalPrice, totalAmount } from "./calcs";
import { parseLocalCurrency, parseAlt, urlReplace, parseToNumber } from "./formatting";
import { waitingProduct } from "./isWaiting";
import { stickyVariant, productDetails, findInArray, reloadPage, blinkVariant } from "./helpers";
import { slideOptions, divList } from "./templates"
export {
    totalAmount, divList, slideOptions, productDetails, reloadPage, parseToNumber, blinkVariant, urlReplace, stickyVariant, totalPrice, findInArray,
    parseLocalCurrency, waitingProduct, parseAlt
}
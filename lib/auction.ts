export function chargePrice(price:number) {
    return Math.ceil(price * 0.05)
}

export function calDistributionPrice(price:number, userCount:number) {
    return Math.floor(price/(userCount-1))
}

export function calDifurcation(price:number, userCount:number) {
    return Math.ceil((price - Math.ceil(price * 0.05)) * ((userCount -1) / userCount))
}

export function calAdequatePrice(price:number, userCount:number) {
    return Math.ceil(calDifurcation(price, userCount) / 1.1)
}

export default {chargePrice, calDistributionPrice, calDifurcation, calAdequatePrice}
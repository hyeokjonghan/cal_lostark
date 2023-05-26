import { WithDropItem } from "@/types/secretMap"

export function chargePrice(price:number) {
    return Math.ceil(price * 0.05)
}

export function chargePriceTotal(dropList: WithDropItem[]) {
    let totalCharge = 0
    dropList.map(item => {
        totalCharge = totalCharge + chargePrice(item.now_price) * item.drop_count
    })
    return totalCharge
}

export function calDistributionPrice(price:number, userCount:number) {
    return Math.floor(price/(userCount-1))
}

export function calDifurcation(price:number, userCount:number, dropList: WithDropItem[]|null) {
    if(dropList) {
        return Math.floor((price - chargePriceTotal(dropList)) * ((userCount -1) / userCount))
    } else {
        return Math.floor((price - chargePrice(price)) * ((userCount -1) / userCount))
    }
    
}

export default {chargePrice, calDistributionPrice, calDifurcation, chargePriceTotal}
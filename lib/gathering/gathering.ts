import { LifeItemList } from "@/types/lifeItem";
import { ProduceItem } from "@/types/produceItem";
import { chargePrice } from "../auction";

export function itemTargetAmount(item: LifeItemList) {
    if(item.have_item_count !== undefined && item.target_item_count !== undefined) {
        if(item.target_item_count < item.have_item_count) {
            return 0
        } else {
            return (item.target_item_count - item.have_item_count) / item.with_market_price.bundle_count * item.with_market_price.now_price
        }
    } else {
        return 0
    }
}

export function getTotalItemRevenue(lifeItemList: LifeItemList[]) {
    let totalRevenue:number = 0
    lifeItemList.map((item) => {
        totalRevenue = totalRevenue + itemTargetAmount(item)
    })

    return totalRevenue
}

export function getUseLifePotionToGold(useLifePotion: number, goldCondition: number) {
    // 125 크리스탈 => 15000 생기
    const lifePotionExchangeGold = goldCondition * 1.25 / 15000
    return lifePotionExchangeGold * useLifePotion
}

export function getUseEssenceOfLeapToGold(useLifePotion: number, goldCondition: number) {
    // 10 크리스탈에 도약의 정수 하나
    return goldCondition / 10 * useLifePotion
}

export function buyCreateRevenue(item:ProduceItem, greatSuccess: number, feeReduction: number) {
    let totalSellPrice = 0

    // 판매 가격 * (아이템 제작 개수 * 영지 대성공 확률 계산)
    let greatSuccessRate = 1.05 + (5 * greatSuccess / 10000)
    totalSellPrice = item.now_price * (item.production_number * greatSuccessRate) - (chargePrice(item.now_price) * item.production_number * greatSuccessRate)

    totalSellPrice = totalSellPrice - calProduceTotalPrice(item, feeReduction)
    
    return totalSellPrice
}

export function calProduceTotalPrice(item: ProduceItem, feeReduction: number) {
    let buyPriceTotal = 0
    item.with_item_material.map(material => {
        buyPriceTotal = buyPriceTotal + (material.now_price / material.bundle_count) * material.cost
    })

    if(item.produce_price_type === '0') {
        buyPriceTotal = buyPriceTotal + Math.floor(item.produce_price * (1 - (feeReduction/100)))
    }

    return buyPriceTotal
}

export function matarialTotalPrice(item: ProduceItem) {
    let buyPriceTotal = 0
    item.with_item_material.map(material => {
        buyPriceTotal = buyPriceTotal + (material.now_price / material.bundle_count) * material.cost
    })
    console.log("matarialTotalPrice =>", buyPriceTotal)
    return buyPriceTotal
}

export default {itemTargetAmount, getTotalItemRevenue, getUseLifePotionToGold, getUseEssenceOfLeapToGold, buyCreateRevenue, calProduceTotalPrice, matarialTotalPrice}
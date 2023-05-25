export interface LifeItem {
    [key: string]: LifeItemList[]
}

export interface LifeItemList {
    item_code: number
    item_name: string
    item_grade: string
    item_icon: string
    created_at: string
    updated_at: string
    deleted_at: any
    category: number
    sub_category: number
    with_market_price: WithMarketPrice
    have_item_count?:number
    target_item_count?:number
}

export interface WithMarketPrice {
    item_code: number
    now_price: number
    now_avg_price: number
    bundle_count: number
    y_trade_count: number
}
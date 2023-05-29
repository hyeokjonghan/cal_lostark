export type ProduceItemList = ProduceItem[]

export interface ProduceItem {
  id: number
  item_code: string
  produce_item_name: string
  produce_type: string
  produce_cost: number
  production_number: number
  produce_price_type: string
  produce_price: number
  created_at: string
  updated_at: string
  produce_cost_time: string
  now_price: number
  now_avg_price: number
  bundle_count: number
  y_trade_count: number
  with_item_material: WithItemMaterial[]
  item_icon: string,
  item_grade: string,
  buy_create_revenu?:number
}

export interface WithItemMaterial {
  id: number
  item_code: string
  cost: number
  produce_type: string
  created_at: string
  updated_at: string
  deleted_at: any
  target_item_code: string
  now_price: number
  now_avg_price: number
  bundle_count: number
  y_trade_count: number
  item_name: string
  item_grade: string
  item_icon: string
  category: number
  sub_category: number
}

export type SecretMapList = SecretMap[]

export interface SecretMap {
  map_id: number
  map_type_name: string
  with_drop_item: WithDropItem[]
}

export interface WithDropItem {
  item_code: string
  item_name: string
  item_grade: string
  item_icon: string
  now_price: number
  map_id: number
  drop_count: number
}

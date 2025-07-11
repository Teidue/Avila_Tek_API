export interface OrderItemDto {
  productId: string
  quantity: number
}

export interface CreateOrderDto {
  items: OrderItemDto[]
}

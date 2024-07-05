// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table users {
  username string 
  id string [primary key]
  avatar_url string
  role number [ref: > roles.id, default: 1]
  token string
  growid string [null]
}

table roles {
  id number
  name string
}

table stores {
  store_id string [pk]
  user_id string [ref : - users.id]
  store_name string
  name string
  world_deposit string
  bot_deposit string
  last_update_bot date
  is_active boolean
  private_key string
}

table categorys {
  category_id string
  category_name string
}

table payment_methods {
  payment_id string
  payment_name string
}

table products {
  product_id string [pk]
  store_id string [ref: > stores.store_id]
  product_name string
  product_description string
  category_id string [ref: > categorys.category_id]
  payment_method string [ref: > payment_methods.payment_id, null]
  total_sold number [default: 0]
  image_url string
  price number
  is_active boolean
}

table types_stock {
  type_id number
  type_stock_name string
}

table stock_products {
  stock_id string
  product_id string [ref: > products.product_id]
  type_stock number [ref: > types_stock.type_id]
  data string
  file_url string [null]
  is_sold boolean
}

table user_items {
  user_item_id string [pk]
  user_id string [ref: > users.id]
  order_id string [ref: - order_items.order_id]
  stock_id string [ref: > stock_products.stock_id]
}

table orders {
  order_id string [pk]
  user_id string [ref: > users.id]
  store_id string [ref: > stores.store_id]
  product_id string [ref: > products.product_id]
  price number
  order_date date
  status string
}

table order_items {
  order_item_id string [pk]
  order_id string [ref: > orders.order_id]
  amount string
  total_price number
}

table transactions {
  transaction_id string
  order_id string [ref: - orders.order_id]
}


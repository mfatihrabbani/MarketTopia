# ORDERS API SPEC

## Create Orders API
Endpoint : `POST /orders`

Headers : 
- Authorization : Access Token

Request Body :
```json
{
    "store_id" : "10293847655643728",
    "product_id" : "0190191019101",
    "amount" : 100
}
```

Response Success Body :
```json
{
    "data" : {
        "order_id" : "111",
        "store_id" : "10293847655643728",
        "product_id" : "0190191019101",
        "amount" : 100,
        "total_price" : 100000,
        "status" : "UNPAID"
    }
}
```

Response Failed Body :
```json
{
    "errors" : {
        "message" : "Product not found",
    }
}
```

## Get All Orders By User API
Endpoint : `GET /orders`

Headers : 
- Authorization : Access Token

Response Success Body :
```json
{
    "data" : [
        {
            "order_id" : "1111",
            "store_id" : "10293847655643728",
            "product_id" : "0190191019101",
            "amount" : 100,
            "price" : 100000,
            "status" : "UNPAID"
        },
    ]
}
```

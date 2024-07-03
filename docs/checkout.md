# ORDERS API SPEC

## Create Orders API
Endpoint : `POST /checkouts`

Headers : 
- Authorization : Access Token

Request Body :
```json
{
    "order_id" : "10293847655643728"
}
```

Response Success Body :
```json
{
    "data" : {
        "status_checkout" : "success",
        "status_payment" : "success"
    }
}
```
```json
{
    "data" : {
        "status_checkout" : "failed",
        "status_payment" : "unpaid",
        "balance_left" : 1000
    }
}
```

Response Errors Body :
```json
{
    "error" : {
        "message" : "Orders not found"
    } 
}
```
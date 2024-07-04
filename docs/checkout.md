# ORDERS API SPEC

## Create Checkout API
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
        "status_checkout" : "SUCCESS",
        "status_payment" : "SUCCESS"
    }
}
```
Response Balnace Not Enough Body : 
```json
{
    "data" : {
        "status_checkout" : "FAILED_BALANCE_NOT_ENOUGH",
        "status_payment" : "UNPAID",
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
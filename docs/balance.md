# BALANCES API SPEC

## Add Balances API
Endpoint : `POST /balances`

Headers : 
- Authorization : Access Token
- Private-Key : Private Key Store

Request Body :
```json
{
    "payload_donation" : "Packet Donat"
}
```

Response Success Body :
```json
{
    "data" : {
        "username" : "username",
        "store_name" : "Nama Storenya",
        "balance" : 1000
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

## Add Balances User API
Endpoint : `GET /stores/:storeId/balance/me`

Headers : 
- Authorization : Access Token

Response Success Body :
```json
{
    "data" : {
        "user_id" : "1",
        "store_name" : "Nama Storenya",
        "balance" : 1000
    }
}
```

## Add Balances User By Id API
Endpoint : `GET /stores/:storeId/balance/users/:userId`

Headers : 
- Private-Key : Private Key Store

Response Success Body :
```json
{
    "data" : {
        "username" : "username",
        "store_name" : "Nama Storenya",
        "balance" : 1000
    }
}
```
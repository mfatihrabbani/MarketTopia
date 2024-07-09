# STOCK API SPEC

## Add Stock API
Endpoint : `POST /stocks`

Headers : 
- Authorization : Access Token
- Private-Key : Private Key Store

Request Body :
```json
{
    "product_id" : "Packet Donat",
    "type_id" : 1,
    "data" : "CID:1",
}
```

Response Success Body :
```json
{
    "data" : {
        "product_id" : "Packet Donat",
        "type_id" : 1,
        "data" : "CID:1",
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

## Add Bulk Stock API
Endpoint : `POST /stocks/bulk`

Headers : 
- Authorization : Access Token
- Private-Key : Private Key Store

Request Body :
```json
{
    "data" : [
        {
            "product_id" : "Packet Donat",
            "type_id" : 1,
            "data" : "CID:1",
        }
    ]
}
```

Response Success Body :
```json
{
    "data" : [
        {
            "product_id" : "Packet Donat",
            "type_id" : 1,
            "data" : "CID:1",
        }
    ]
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

## Update Stock API
Endpoint : `POST /stocks`

Headers : 
- Authorization : Access Token
- Private-Key : Private Key Store

Request Body :
```json
{
    "stock_id" : "stock_id",
    "data" : "CID:1",
}
```

Response Success Body :
```json
{
    "data" : {
        "stock_id" : "stock)id",
        "data" : "CID:1",
    }
}
```

Response Failed Body :
```json
{
    "errors" : {
        "message" : "Stock not found",
    }
}
```
# DEPOSIT SPEC API

## Update Deposit World API
Endpoint : `POST /deposits`

Headers : 
- Authorization : Access Token

Request Body :
```json
{
    "world_deposit" : "worlddepo1",
    "bot_deposit" : "NhasdhbHH" 
}
```

Response Success Body :
```json
{
    "data" : {
        "world_deposit" : "worlddepo1",
        "bot_deposit" : "NhasdhbHH",
        "last_update_bot" : "29878979798"
    }
}
```

Response Failed Body :
```json
{
    "errros" : {
        "message" : "User not have store"
    }
}
```

## Update Deposit Growid API
Endpoint : `POST /growid`

Headers : 
- Authorization : Access Token

Request Body :
```json
{
    "growid" : "akundepo1", 
}
```

Response Success Body :
```json
{
    "data" : {
        "growid" : "akundepo1"
    }
}
```
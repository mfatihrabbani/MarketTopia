# STORE API SPEC

## Create Store API

Endpoint : `POST /stores`

Headers : 
- Authorization : Access Token

Request Body : 

```json
{
    "store_name" : "MOCK STORE",
    "name" :  "mockstore_",
}
```

Response Success Body :
```json
{
    "data" : {
        "store_name" : "MOCK STORE",
        "name" :  "mockstore_",
    }
}
```

Response Error Body :
```json
{
    "errors" : {
        "messages" : "Name already used"
    }
}
```

## Update Store API

Endpoint : `PATCH /stores`

Headers : 
- Authorization : Access Token

Request Body : 

```json
{
    "store_name" : "MOCK STORE",
    "name" :  "mockstoreupdate_",
}
```

Response Success Body :
```json
{
    "data" : {
        "store_name" : "MOCK STORE",
        "name" :  "mockstoreupdate_",
    }
}
```

Response Error Body :
```json
{
    "errors" : {
        "messages" : "Invalid store name, please input another name"
    }
}
```

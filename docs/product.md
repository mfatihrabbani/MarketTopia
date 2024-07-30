# STORE API SPEC

## Create product API
Endpoint : `POST /products`

Headers : 
- Authorization : Access Token

Request Body : 

```json
{
    "product_name" : "CID 9 WL",
    "product_description" :  "Ini adalah cid untuk ngebot sangat kuat anti ban",
    "category <CATEGORY>" : "ACCOUNT",
    "payment_method <PAYMENT_METHOD>" : "WORLD_LOCK",
    "image_url" : "FILE",
    "price" : 10
}
```

Response Success Body :
```json
{
    "data" : {
        "product_name" : "CID 9 WL",
        "product_description" :  "Ini adalah cid untuk ngebot sangat kuat anti ban",
        "category <CATEGORY>" : "ACCOUNT",
        "payment_method <PAYMENT_METHOD>" : "WORLD_LOCK",
        "price" : 10,
        "total_sold" : 100
    }

}
```

Response Error Body :
```json
{
    "errors" : {
        "message" : "Category not found"
    }

}
```

## Edit product API
Endpoint : `PATCH /products`

Headers : 
- Authorization : Access Token

Request Body : 

```json
{
    "product_id" : "190191019109",
    "product_name" : "CID 9 WL",
    "product_description" :  "Ini adalah cid untuk ngebot sangat kuat anti ban",
    "category <CATEGORY>" : "ACCOUNT",
    "payment_method <PAYMENT_METHOD>" : "WORLD_LOCK",
    "image_url" : "FILE",
    "price" : 10
}
```

Response Success Body :
```json
{
    "data" : {
        "product_name" : "CID 9 WL",
        "product_description" :  "Ini adalah cid untuk ngebot sangat kuat anti ban",
        "category <CATEGORY>" : "ACCOUNT",
        "payment_method <PAYMENT_METHOD>" : "WORLD_LOCK",
        "price" : 10,
        "total_sold" : 100
    }
}
```

Response Error Body :
```json
{
    "errors" : {
        "message" : "Category not found"
    }
}
```


## Delete Product API
Endpoint : `DELETE /products`

Headers : 
- Authorization : Access Token

Request Body :
```json
{
    "product_id" : "190191019109"
}
```

Response Success Body :

```json
{
    "errors" : {
        "message" : "Product Not Found"
    }
}
```

## Get All Product API
Endpoint : `GET /products`

Headers : -

Query : 
- size : Size data
- news : If true sorted by update time
- most_sold : if true sorted by most sold

Response Success Body :
```json
{
    "data" : [
        {
            "product_name" : "CID 9 WL",
            "product_description" :  "Ini adalah cid untuk ngebot sangat kuat anti ban",
            "category <CATEGORY>" : "ACCOUNT",
            "payment_method <PAYMENT_METHOD>" : "WORLD_LOCK",
            "price" : 10,
            "total_sold" : 100,
            "total_stock" : 100000,
        },
        {
            "product_name" : "CID 2 9 WL",
            "product_description" :  "Ini adalah cid untuk ngebot sangat kuat anti ban",
            "category <CATEGORY>" : "ACCOUNT",
            "payment_method <PAYMENT_METHOD>" : "WORLD_LOCK",
            "price" : 10,
            "total_sold" : 100,
            "total_stock" : 100000,
        }
    ]
}
```

## Get All Product By Store API
Endpoint : `GET /stores/:storeId/products`

Headers : -

Response Success Body :
```json
{
    "data" : [
        {
            "product_name" : "CID 9 WL",
            "product_description" :  "Ini adalah cid untuk ngebot sangat kuat anti ban",
            "category <CATEGORY>" : "ACCOUNT",
            "payment_method <PAYMENT_METHOD>" : "WORLD_LOCK",
            "price" : 10,
            "total_sold" : 100,
            "total_stock" : 100000,
        },
        {
            "product_name" : "CID 2 9 WL",
            "product_description" :  "Ini adalah cid untuk ngebot sangat kuat anti ban",
            "category <CATEGORY>" : "ACCOUNT",
            "payment_method <PAYMENT_METHOD>" : "WORLD_LOCK",
            "price" : 10,
            "total_sold" : 100,
            "total_stock" : 100000,
        }
    ]
}
```

## Get Product API
Endpoint : `GET /products/:productId`

Headers : -

Response Success Body :
```json
{
    "data" : {
        "product_name" : "CID 9 WL",
        "product_description" :  "Ini adalah cid untuk ngebot sangat kuat anti ban",
        "category <CATEGORY>" : "ACCOUNT",
        "payment_method <PAYMENT_METHOD>" : "WORLD_LOCK",
        "price" : 10,
        "total_sold" : 100,
        "total_stock" : 100000,
    }

}
```

## Search Product API
Endpoint : `GET /products/search`

Headers : -

Query : 
- product_search (string) : search by name
- page (number) : current page

- size : Size data
- news : If true sorted by update time
- most_sold : if true sorted by most sold

Response Success Body :
```json
{
    "data" : {
        "product_name" : "CID 9 WL",
        "product_description" :  "Ini adalah cid untuk ngebot sangat kuat anti ban",
        "category <CATEGORY>" : "ACCOUNT",
        "payment_method <PAYMENT_METHOD>" : "WORLD_LOCK",
        "price" : 10,
        "total_sold" : 100,
        "total_stock" : 100000,
    },
    "page" : {
        "page" : 1,
        "total_page" : 10,
        "size_page" : 10, 
    }

}
```
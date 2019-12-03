
<details>

<summary>addPet</summary>

addPet
---
 **Example**

 ```js
 const  { data, error } = await mySdk.addPet({
  /** Pet modal, description-Pet object that needs to be added to the store,required-true */
})
```
**Responses**

          
> Error 4XX
```json
{
  "405": {
    "description": "Invalid input"
  }
}
```

######  [Pet](###Pet-modal) 
</details>

<details>

<summary>updatePet</summary>

updatePet
---
 **Example**

 ```js
 const  { data, error } = await mySdk.updatePet({
  /** Pet modal, description-Pet object that needs to be added to the store,required-true */
})
```
**Responses**

          
> Error 4XX
```json
{
  "400": {
    "description": "Invalid ID supplied"
  },
  "404": {
    "description": "Pet not found"
  },
  "405": {
    "description": "Validation exception"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal) 
</details>

<details>

<summary>findPetsByStatus</summary>

findPetsByStatus
---
 **Example**

 ```js
 const  { data, error } = await mySdk.findPetsByStatus({
  _params: {
   status:array, /** description-Status values that need to be considered for filter,required-true,items-{"type"-"string","enum"-["available","pending","sold"],"default"-"available"},collectionFormat-multi */ 
  }
})
```
**Responses**

          
> Success 2XX
```json
{
  "200": {
    "description": "successful operation",
    "schema": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Pet"
      }
    }
  }
}
```

> Error 4XX
```json
{
  "400": {
    "description": "Invalid status value"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal) 
</details>

<details>

<summary>findPetsByTags</summary>

findPetsByTags
---
 **Example**

 ```js
 const  { data, error } = await mySdk.findPetsByTags({
  _params: {
   tags:array, /** description-Tags to filter by,required-true,items-{"type"-"string"},collectionFormat-multi */ 
  }
})
```
**Responses**

          
> Success 2XX
```json
{
  "200": {
    "description": "successful operation",
    "schema": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Pet"
      }
    }
  }
}
```

> Error 4XX
```json
{
  "400": {
    "description": "Invalid tag value"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal) 
</details>

<details>

<summary>getPetById</summary>

getPetById
---
 **Example**

 ```js
 const  { data, error } = await mySdk.getPetById({
  _pathParams: {
   petId:integer, /** description-ID of pet to return,required-true,format-int64 */ 
  }
})
```
**Responses**

          
> Success 2XX
```json
{
  "200": {
    "description": "successful operation",
    "schema": {
      "$ref": "#/definitions/Pet"
    }
  }
}
```

> Error 4XX
```json
{
  "400": {
    "description": "Invalid ID supplied"
  },
  "404": {
    "description": "Pet not found"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal) 
</details>

<details>

<summary>updatePetWithForm</summary>

updatePetWithForm
---
 **Example**

 ```js
 const  { data, error } = await mySdk.updatePetWithForm({
 name:string, /** description-Updated name of the pet,required-false */
 status:string, /** description-Updated status of the pet,required-false */
  _pathParams: {
   petId:integer, /** description-ID of pet that needs to be updated,required-true,format-int64 */ 
  }
})
```
**Responses**

          
> Error 4XX
```json
{
  "405": {
    "description": "Invalid input"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal) 
</details>

<details>

<summary>deletePet</summary>

deletePet
---
 **Example**

 ```js
 const  { data, error } = await mySdk.deletePet({
  _pathParams: {
   petId:integer, /** description-Pet id to delete,required-true,format-int64 */ 
  }
})
```
**Responses**

          
> Error 4XX
```json
{
  "400": {
    "description": "Invalid ID supplied"
  },
  "404": {
    "description": "Pet not found"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal) 
</details>

<details>

<summary>uploadFile</summary>

uploadFile
---
 **Example**

 ```js
 const  { data, error } = await mySdk.uploadFile({
 additionalMetadata:string, /** description-Additional data to pass to server,required-false */
 file:file, /** description-file to upload,required-false */
  _pathParams: {
   petId:integer, /** description-ID of pet to update,required-true,format-int64 */ 
  }
})
```
**Responses**

          
> Success 2XX
```json
{
  "200": {
    "description": "successful operation",
    "schema": {
      "$ref": "#/definitions/ApiResponse"
    }
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal) 
</details>

<details>

<summary>getInventory</summary>

getInventory
---
 **Example**

 ```js
 const  { data, error } = await mySdk.getInventory({

})
```
**Responses**

          
> Success 2XX
```json
{
  "200": {
    "description": "successful operation",
    "schema": {
      "type": "object",
      "additionalProperties": {
        "type": "integer",
        "format": "int32"
      }
    }
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal)  [undefined](###undefined-modal) 
</details>

<details>

<summary>placeOrder</summary>

placeOrder
---
 **Example**

 ```js
 const  { data, error } = await mySdk.placeOrder({
  /** Order modal, description-order placed for purchasing the pet,required-true */
})
```
**Responses**

          
> Success 2XX
```json
{
  "200": {
    "description": "successful operation",
    "schema": {
      "$ref": "#/definitions/Order"
    }
  }
}
```

> Error 4XX
```json
{
  "400": {
    "description": "Invalid Order"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Order](###Order-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal)  [undefined](###undefined-modal)  [Order](###Order-modal) 
</details>

<details>

<summary>getOrderById</summary>

getOrderById
---
 **Example**

 ```js
 const  { data, error } = await mySdk.getOrderById({
  _pathParams: {
   orderId:integer, /** description-ID of pet that needs to be fetched,required-true,maximum-10,minimum-1,format-int64 */ 
  }
})
```
**Responses**

          
> Success 2XX
```json
{
  "200": {
    "description": "successful operation",
    "schema": {
      "$ref": "#/definitions/Order"
    }
  }
}
```

> Error 4XX
```json
{
  "400": {
    "description": "Invalid ID supplied"
  },
  "404": {
    "description": "Order not found"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Order](###Order-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal)  [undefined](###undefined-modal)  [Order](###Order-modal)  [Order](###Order-modal) 
</details>

<details>

<summary>deleteOrder</summary>

deleteOrder
---
 **Example**

 ```js
 const  { data, error } = await mySdk.deleteOrder({
  _pathParams: {
   orderId:integer, /** description-ID of the order that needs to be deleted,required-true,minimum-1,format-int64 */ 
  }
})
```
**Responses**

          
> Error 4XX
```json
{
  "400": {
    "description": "Invalid ID supplied"
  },
  "404": {
    "description": "Order not found"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Order](###Order-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal)  [undefined](###undefined-modal)  [Order](###Order-modal)  [Order](###Order-modal) 
</details>

<details>

<summary>createUser</summary>

createUser
---
 **Example**

 ```js
 const  { data, error } = await mySdk.createUser({
  /** User modal, description-Created user object,required-true */
})
```
**Responses**

          
> Default
```json
{
  "default": {
    "description": "successful operation"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Order](###Order-modal)  [User](###User-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal)  [undefined](###undefined-modal)  [Order](###Order-modal)  [Order](###Order-modal) 
</details>

<details>

<summary>createUsersWithArrayInput</summary>

createUsersWithArrayInput
---
 **Example**

 ```js
 const  { data, error } = await mySdk.createUsersWithArrayInput({
  /** User modal,type - array, description-List of user object,required-true */
})
```
**Responses**

          
> Default
```json
{
  "default": {
    "description": "successful operation"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Order](###Order-modal)  [User](###User-modal)  [User](###User-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal)  [undefined](###undefined-modal)  [Order](###Order-modal)  [Order](###Order-modal) 
</details>

<details>

<summary>createUsersWithListInput</summary>

createUsersWithListInput
---
 **Example**

 ```js
 const  { data, error } = await mySdk.createUsersWithListInput({
  /** User modal,type - array, description-List of user object,required-true */
})
```
**Responses**

          
> Default
```json
{
  "default": {
    "description": "successful operation"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Order](###Order-modal)  [User](###User-modal)  [User](###User-modal)  [User](###User-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal)  [undefined](###undefined-modal)  [Order](###Order-modal)  [Order](###Order-modal) 
</details>

<details>

<summary>loginUser</summary>

loginUser
---
 **Example**

 ```js
 const  { data, error } = await mySdk.loginUser({
  _params: {
   username:string, /** description-The user name for login,required-true */ 
   password:string, /** description-The password for login in clear text,required-true */ 
  }
})
```
**Responses**

          
> Success 2XX
```json
{
  "200": {
    "description": "successful operation",
    "schema": {
      "type": "string"
    },
    "headers": {
      "X-Rate-Limit": {
        "type": "integer",
        "format": "int32",
        "description": "calls per hour allowed by the user"
      },
      "X-Expires-After": {
        "type": "string",
        "format": "date-time",
        "description": "date in UTC when token expires"
      }
    }
  }
}
```

> Error 4XX
```json
{
  "400": {
    "description": "Invalid username/password supplied"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Order](###Order-modal)  [User](###User-modal)  [User](###User-modal)  [User](###User-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal)  [undefined](###undefined-modal)  [Order](###Order-modal)  [Order](###Order-modal)  [undefined](###undefined-modal) 
</details>

<details>

<summary>logoutUser</summary>

logoutUser
---
 **Example**

 ```js
 const  { data, error } = await mySdk.logoutUser({

})
```
**Responses**

          
> Default
```json
{
  "default": {
    "description": "successful operation"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Order](###Order-modal)  [User](###User-modal)  [User](###User-modal)  [User](###User-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal)  [undefined](###undefined-modal)  [Order](###Order-modal)  [Order](###Order-modal)  [undefined](###undefined-modal) 
</details>

<details>

<summary>getUserByName</summary>

getUserByName
---
 **Example**

 ```js
 const  { data, error } = await mySdk.getUserByName({
  _pathParams: {
   username:string, /** description-The name that needs to be fetched. Use user1 for testing. ,required-true */ 
  }
})
```
**Responses**

          
> Success 2XX
```json
{
  "200": {
    "description": "successful operation",
    "schema": {
      "$ref": "#/definitions/User"
    }
  }
}
```

> Error 4XX
```json
{
  "400": {
    "description": "Invalid username supplied"
  },
  "404": {
    "description": "User not found"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Order](###Order-modal)  [User](###User-modal)  [User](###User-modal)  [User](###User-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal)  [undefined](###undefined-modal)  [Order](###Order-modal)  [Order](###Order-modal)  [undefined](###undefined-modal)  [User](###User-modal) 
</details>

<details>

<summary>updateUser</summary>

updateUser
---
 **Example**

 ```js
 const  { data, error } = await mySdk.updateUser({
  /** User modal, description-Updated user object,required-true */  _pathParams: {
   username:string, /** description-name that need to be updated,required-true */ 
  }
})
```
**Responses**

          
> Error 4XX
```json
{
  "400": {
    "description": "Invalid user supplied"
  },
  "404": {
    "description": "User not found"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Order](###Order-modal)  [User](###User-modal)  [User](###User-modal)  [User](###User-modal)  [User](###User-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal)  [undefined](###undefined-modal)  [Order](###Order-modal)  [Order](###Order-modal)  [undefined](###undefined-modal)  [User](###User-modal) 
</details>

<details>

<summary>deleteUser</summary>

deleteUser
---
 **Example**

 ```js
 const  { data, error } = await mySdk.deleteUser({
  _pathParams: {
   username:string, /** description-The name that needs to be deleted,required-true */ 
  }
})
```
**Responses**

          
> Error 4XX
```json
{
  "400": {
    "description": "Invalid username supplied"
  },
  "404": {
    "description": "User not found"
  }
}
```

######  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Order](###Order-modal)  [User](###User-modal)  [User](###User-modal)  [User](###User-modal)  [User](###User-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [Pet](###Pet-modal)  [ApiResponse](###ApiResponse-modal)  [undefined](###undefined-modal)  [Order](###Order-modal)  [Order](###Order-modal)  [undefined](###undefined-modal)  [User](###User-modal) 
</details>

# Modal Definations

 ### Order-modal
 ```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "petId": {
      "type": "integer",
      "format": "int64"
    },
    "quantity": {
      "type": "integer",
      "format": "int32"
    },
    "shipDate": {
      "type": "string",
      "format": "date-time"
    },
    "status": {
      "type": "string",
      "description": "Order Status",
      "enum": [
        "placed",
        "approved",
        "delivered"
      ]
    },
    "complete": {
      "type": "boolean",
      "default": false
    }
  },
  "xml": {
    "name": "Order"
  }
}
```

 ### Category-modal
 ```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "name": {
      "type": "string"
    }
  },
  "xml": {
    "name": "Category"
  }
}
```

 ### User-modal
 ```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "username": {
      "type": "string"
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "password": {
      "type": "string"
    },
    "phone": {
      "type": "string"
    },
    "userStatus": {
      "type": "integer",
      "format": "int32",
      "description": "User Status"
    }
  },
  "xml": {
    "name": "User"
  }
}
```

 ### Tag-modal
 ```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "name": {
      "type": "string"
    }
  },
  "xml": {
    "name": "Tag"
  }
}
```

 ### Pet-modal
 ```json
{
  "type": "object",
  "required": [
    "name",
    "photoUrls"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "category": {
      "$ref": "#/definitions/Category"
    },
    "name": {
      "type": "string",
      "example": "doggie"
    },
    "photoUrls": {
      "type": "array",
      "xml": {
        "name": "photoUrl",
        "wrapped": true
      },
      "items": {
        "type": "string"
      }
    },
    "tags": {
      "type": "array",
      "xml": {
        "name": "tag",
        "wrapped": true
      },
      "items": {
        "$ref": "#/definitions/Tag"
      }
    },
    "status": {
      "type": "string",
      "description": "pet status in the store",
      "enum": [
        "available",
        "pending",
        "sold"
      ]
    }
  },
  "xml": {
    "name": "Pet"
  }
}
```

 ### ApiResponse-modal
 ```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "integer",
      "format": "int32"
    },
    "type": {
      "type": "string"
    },
    "message": {
      "type": "string"
    }
  }
}
```

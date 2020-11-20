# DOCUMENTATION
This documentation describes how this API works.
- There are still many TO-DOs. (Such as permissions and/or roles)
- Endpoints does not have security and can be accessed by any registered user at this point.
- This API is for educational purposes only and should not be used in production.

## REST API Endpoints

### User's Registration
- This endpoint has no special requirements.
- Creates a user.

___
> Request:

`POST /v1/users`

> Example body:

```
{
    "email": "example@mail.com",
    "password": "strongpassword123"
}
```

> Example successful response:

`HTTP 201 - Created` - if registration successed.
```
{
    "data": {
        "userId": "<mongodb-objectId>",
    }
}
```
> Example error response:

`HTTP 400 - Bad Request` - if something is wrong, for example, email missing:
```
{
    "error": {
        "message": "Email is required"
    }
}
```
___
### User's Authentication
- This endpoint has no special requirements.
- Authenticates the user and returns an `accessToken` for further usage.
- Some endpoints requires the `Authorization` header to be present with the `accessToken` returned by this endpoint, if not valid or expired, you will get a `HTTP 401 - Unauthorized` response.

___
> Request:

`POST /v1/users/login`

> Example body:

```
{
    "email": "example@mail.com",
    "password": "strongpassword123"
}
```

> Example successful response:

`HTTP 200 - OK` - if login successed
```
{
    "data": {
        "accessToken": "<jwt-token>",
    }
}
```
> Example error response:

- `HTTP 401 - Unauthorized`
    ```
    {
        "error": {
            "message": "Invalid email or password."
        }
    }
    ```
- `HTTP 400 - Bad Request` If something is wrong, for example: weak password.
___

### Retreive user(s) info
- This endpoint requires the `Authorization` header with a valid `accessToken`.
- Retreives info for a single user or bulk.

___
> Request:

`GET /v1/users` / `GET /v1/users/:id`

If `:id` is not specified, then a list of all users will be returned.

> Example successful response with `id`:

`HTTP 200 - OK` - if information retreived successfully.
```
{
    "data": {
        "_id": "<mongoDB-ObjectId>",
        "email": "example@mail.com",
        "password": "<encrypted-password>"
    }
}
```
> Example successful response without `id`:

`HTTP 200 - OK` - if there are users registered and information retreived successfully.
```
{
    "data": [{
      "_id": "<mongoDB-ObjectId>",
      "email": "example@mail.com",
      "password": "<encrypted-password>"
    },
    {
      "_id": "<mongoDB-ObjectId>",
      "email": "example@mail.com",
      "password": "<encrypted-password>"
    }]
}
```
> Example error response:

- `HTTP 404 - No Content` - if not users registered yet.
- `HTTP 401 - Unauthorized` If accessToken is not valid.
- `HTTP 403 - Forbidden` If accessToken is not present.

___

### Update or replace user(s) info
- This endpoint requires the `Authorization` header with a valid `accessToken`.
- Updates info for a single user or bulk.

___
> Request:

`PUT /v1/users` / `PUT /v1/users/:id`

If `:id` is not specified, then the replacement will be made to all users.

> Example successful response for both scenarios:

`HTTP 200 - OK` if update successed.
```
{
    "data": {
        "modified": [<mongoDB objectId>, <... objectId>]
    }
}
```
> Example error response:

- `HTTP 404 - No Content` If not users registered.
- `HTTP 400 - Bad Request` If invalid `body` is provided.
- `HTTP 401 - Unauthorized` If accessToken is not valid.
- `HTTP 403 - Forbidden` If accessToken is not present.
___

### DELETE user(s)
- This endpoint requires the `Authorization` header with a valid `accessToken`.
- Deletes a single user or all of them.

___
> Request:

`DELETE /v1/users` / `DELETE /v1/users/:id`

If `:id` is not specified, then the removal will be made to all users.

> Example successful response for both scenarios:

`HTTP 200 - OK` if removal successed.
> Example error response:

- `HTTP 404 - No Content` If not users registered, or removed.
- `HTTP 401 - Unauthorized` If accessToken is not valid.
- `HTTP 403 - Forbidden` If accessToken is not present.

___

### Token's public key
- This endpoint has no special requirements.
- Provides the public key certificate to verify JWT tokens.

___
> Request:

`GET /v1/certificate`
- Accepts url parameters:
    - `/plain` if present, certificate will be returned as plain text.

> Example successful response without `/plain` parameter:

`HTTP 200 - OK` if successed.
```
{
    "data": {
        "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs1/xLLWWkntmsYvVU8U7\nRJsdahZE6EAc1MlIZ2i6offQQjBNgxuqvStrWgwhSGOCxmZxD1sjTCMhiiiR39Yg\n836tbTWnbnmuJzGuA6AxbznihuggK+6rH/xk5jdBYIgYDEzSXTAx7kl7gyz9ZWGW\ndlf1YeNZeXmK4wX8SN93J3wU+WDLp4dXPRHFJr4em5z4aJIBRxi1ztQh1l+fZpYh\naq91Wy9UAoe8CqMD6tc1utnJ0BlBOlQtYvMshBbKhGYRLyHj0YyL/NdRSsDmGRU1\nYomhXaM+vEwCxD/d0tX6oB5V/12H1jDqWXZ/SGiGt+cLs9Ay7n8wAEF7z3LtH1XU\nWwIDAQAB\n-----END PUBLIC KEY-----\n"
    }
}
```
> Example successful response with `/plain` parameter:

`HTTP 200 - OK` if successed.
```
{
    "data": {
        "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs1/xLLWWkntmsYvVU8U7\nRJsdahZE6EAc1MlIZ2i6offQQjBNgxuqvStrWgwhSGOCxmZxD1sjTCMhiiiR39Yg\n836tbTWnbnmuJzGuA6AxbznihuggK+6rH/xk5jdBYIgYDEzSXTAx7kl7gyz9ZWGW\ndlf1YeNZeXmK4wX8SN93J3wU+WDLp4dXPRHFJr4em5z4aJIBRxi1ztQh1l+fZpYh\naq91Wy9UAoe8CqMD6tc1utnJ0BlBOlQtYvMshBbKhGYRLyHj0YyL/NdRSsDmGRU1\nYomhXaM+vEwCxD/d0tX6oB5V/12H1jDqWXZ/SGiGt+cLs9Ay7n8wAEF7z3LtH1XU\nWwIDAQAB\n-----END PUBLIC KEY-----\n"
    }
}
```

> Example error response:

- `HTTP 503 - Service unavailable` If certificate is not available.
- `HTTP 500 - Internal Server Error` If server could not retreive public certificate.


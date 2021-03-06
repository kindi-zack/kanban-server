# Kanban App

## Available endpoints
- `POST /register`
- `POST /login`
- `POST /tasks`
- `GET /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

## RESTful endpoints
### POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username": "<username to get insert into>",
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation errors>"
}
```

---
### POST /login

> Login

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<access_token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid Email/Password"
}
```

---
### POST /tasks

> Create new task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "category": "<category to get insert into>",
  "UserId": "<user id>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "category": "<posted category>",
  "UserId": <"user id">,
  "createdAt": "",
  "updatedAt": "",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation errors>"
}
```


---
### GET /tasks

> Get all tasks

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "title": "<title name>",
    "description": "<description name>",
    "category": "<category name>",
    "UserId": "<user id>",
    "createdAt": "",
    "updatedAt": "",
  },
  {
    "id": 2,
    "title": "<title name>",
    "description": "<description name>",
    "category": "<category name>",
    "UserId": "<user id>"
    "createdAt": "",
    "updatedAt": "",
  }
]
```



### DELETE /tasks/:id

> Delete task based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": 'Task Successfully delete.'
}
```
_Response (404 - Not Found)_
```
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Errors)_

---
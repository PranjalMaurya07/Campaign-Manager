
# Campaign Manager

Manage ad campaigns with login/signup, CRUD features, and JWT-based auth.
# Features

- User Auth – Signup, login, logout (JWT-based)
- Campaign CRUD – Add, view, update, delete, filter campaigns
- State Persistence – Login state via localStorage



  

# Technologies Used

### Frontend

- React, Axios, CSS

### Backend

- Node.js, Express.js 

### Database

- MySql

### Authentication

- JWT

### Deployment

- Render





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DB_HOST`

`DB_PORT`

`DB_USER`

`DB_PASSWORD`

`DB_NAME`

`JWT_SECRET_KEY`









# Test Credentials (For Live Demo)


- URL- https://campaign-manager-1-kwgg.onrender.com
- Email- test@example.com
- Password- 123456
# API Endpoints

### User Management

```http
  POST /api/auth/signup : Register a new user.
```
```http
  POST /api/auth/login : Login User.
```


### Campaign Management

```http
  POST /api/campaign : Add a new campaign.
```
```http
  GET /api/campaign : Get all campaigns.
```
```http
  PUT /api/campaign/:id : Update a campaign.
```
```http
  DELETE /api/campaign/:id : Delete a campaign.
```
# Contacts

- Name : Pranjal Kumar Maurya
- Email : pranjalmaurya003@gmail.com
- Github : https://github.com/PranjalMaurya07
- LinkedIn : https://www.linkedin.com/in/pranjalmaurya07/

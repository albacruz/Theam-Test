# Second phase of The Agile Monkeys recruiment process

## Steps to run this project:

1. Run `npm i` command
2. Setup environment variables inside `.env` file
3. Run project with `docker-compose up` command
4. Run tests with `npm run test` command (make sure that at least Bodybase is up with `docker-compose up postgresql` command)

### .env

| Key                   |
| --------------------- |
| CLOUDINARY_NAME       |
| CLOUDINARY_KEY        |
| CLOUDINARY_API_SECRET |
| TYPEORM_DATABASE      |
| TYPEORM_USERNAME      |

|TYPEORM_PASSWORD
|DATABASE_HOST|
|ACCESS_TOKEN|

## Tech Stack

- NodeJS + Express
- TypeScript
- TypeORM
- Jest + Supertest
- Docker
- PostgreSQL
- Cloudinary

### Infrastructure

- CI: GitHub Actions
- CD: CodeDeploy service AWS
- DB: RDS in AWS with PostgreSQL

## Endpoints Usage

### Create New Customer

- **URL**
  - /customers
- **Method**
  - `POST`
- **URL Params**
  - None
- **Body Params**
  - **Required**
    - `name=[string]`
    - `surname=[string]`
  - **Optional**
    - `photo=[file]`

### Get All Customers

- **URL**
  - /customers
- **Method**
  - `GET`
- **URL Params**
  - None
- **Body Params**
  - None

### Get Customer

- **URL**
  - /customers/:id
- **Method**
  - `GET`
- **URL Params**
  - `id=[integer]`
- **Body Params**
  - None

### Update Customer

- **URL**
  - /customers/:id
- **Method**
  - `PATCH`
- **URL Params**
  - `id=[integer]`
- **Body Params**
  - `name=[string]`
  - `surname=[string]`
  - `photo=[file]`

### Delete Customer

- **URL**
  - /customers/:id
- **Method**
  - `DELETE`
- **URL Params**
  - `id=[integer]`
- **Body Params**
  - None

### Create New User

- **URL**
  - /users
- **Method**
  - `POST`
- **URL Params**
  - None
- **Body Params**
  - **Required**
    - `username=[string]`
    - `password=[string]`
    - `role=[Role]`

### Get all users

- **URL**
  - /users
- **Method**
  - `GET`
- **URL Params**
  - None
- **Body Params**
  - None

### Get User

- **URL**
  - /users/:id
- **Method**
  - `GET`
- **URL Params**
  - `id=[integer]`
- **Body Params**
  - None

### Update User

- **URL**
  - /users/:id
- **Method**
  - `PATCH`
- **URL Params**
  - `id=[integer]`
- **Body Params**
  - `username=[string]`
  - `role=[Role]`

### Delete User

- **URL**
  - /users/:id
- **Method**
  - `DELETE`
- **URL Params**
  - `id=[integer]`
- **Body Params**
  - None

### Login

- **URL**
  - /auth/login
- **Method**
  - `POST`
- **URL Params**
  - None
- **Body Params**
  - **Required**
    - `username=[string]`
    - `password=[string]`

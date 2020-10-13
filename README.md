# Second phase of The Agile Monkeys recruiment process

## Steps to run this project:

1. Run `npm i` command
2. Create your own cloudinary account
3. Setup environment variables inside `.env` file
4. Run project with `docker-compose up` command
5. Run tests with `npm run test` command (make sure that at least database is up with `docker-compose up postgresql` command)

### .env

| Key                   |
| --------------------- |
| CLOUDINARY_NAME       |
| CLOUDINARY_KEY        |
| CLOUDINARY_API_SECRET |
| TYPEORM_DATABASE      |
| TYPEORM_USERNAME      |
| TYPEORM_PASSWORD      |
| DATABASE_HOST         |
| ACCESS_TOKEN          |

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
- CD: GitHub Actions to EC2
- DB: RDS in AWS with PostgreSQL

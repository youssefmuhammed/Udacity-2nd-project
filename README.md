# UDACITY STORE-FRONT API PROJECT


## packages 
* express
* pg
* node/typescript
* bodyparser
* bcrypt
* dotenv
* jasmine
* eslint
* prettier
* cors
* jsonwebtoken
* db-migrate
* nodemon
* supertest


## environment
---

###### CRETAE DATABASE developing 
###### CREATE DATABASE test 

---
#### create .env file and add to it 


* POSTGRES_HOST = 127.0.0.1 
* POSTGRES_DB = developing
* POSTGRES_DB_TEST = test
* POSTGRES_USER = postgres 
* POSTGRES_PASS = 0000
* POSTGRES_PORT = 5432
* ENV = dev
* BCRYPT_PASSWORD = add_this_string_for_hashing
* SALT_ROUNDS = 10 
* SECRET_TOKEN = BLABLABLA

### database.json file
 
` { `
 `"test": {`
        `"driver": "pg",`
        `"host": "127.0.0.1",`
        `"database": "test",`
        `"user": "[your username]",`
        `"password": "[your password]"`
    `},`
    `"dev":{`
        `"driver":"pg",`
        `"host":"127.0.0.1",`
        `"database":"developing",`
        `"user":"[your username]",`
        `"password":"[your password]"`
            `}`
    `}  `


#### End-Points 

```
for users 
GET http://localhost:3000/users            => for showing all users in the database
POST http://localhost:3000/user             => for creating a new entry to the database
GET http://localhost:3000/user/:id         => for looking for a specific entry with id 
DELETE http://localhost:3000/deleteUser/:id   => for deleteng specific entry
PUT http://localhost:3000/updateUser/:     => for updating a specific entry


for products 
GET http://localhost:3000/products            => for showing all products in the database
POST http://localhost:3000/product             => for creating a new entry to the database
GET http://localhost:3000/product/:id         => for looking for a specific entry with id 
DELETE http://localhost:3000/deleteproduct/:id   => for deleteng specific entry
PUT http://localhost:3000/updateproduct/:     => for updating a specific entry


for orders
GET http://localhost:3000/orders            => for showing all orders in the database
POST http://localhost:3000/order             => for creating a new entry to the database
GET http://localhost:3000/order/:id         => for looking for a specific entry with id 
DELETE http://localhost:3000/deleteorder/:id   => for deleteng specific entry
PUT http://localhost:3000/updateorder/:     => for updating a specific entry



### Endpoints

 Users
 * GET / Show 
 * POST / CreateUser
 * DELETE / deleteUser
 * PUT / updateUSer


 Products 
* GET / Show
* POST / CreateProduct
* DELETE / deleteProduct
* PUT / updateProduct 


 Orders
* GET / show
* POST / createOrder
* DELETE / deleteOrder
* PUT / updateOrder

### Database Tables

Users
- id         =>   SERIAL PRIMARY KEY
- firstName  =>   VARCHAR(300) 
- lastName   =>   VARCHAR(300) 
- userName   =>   VARCHAR(300) 
- password   =>   VARCHAR(300) 

Products
-  id        =>   SERIAL PRIMARY KEY
- name       =>   VARCHAR(300)
- price      =>   INTEGER



Orders
- id       =>   SERIAL PRIMARY KEY
- user_id  =>  INTEGER  REFERENCES users id


OrderProduct
- order_id    =>  INTEGER  REFERENCES  orders id  
- product_id  =>  INTEGER  REFERENCES products id
- quantity    =>  INTEGER 
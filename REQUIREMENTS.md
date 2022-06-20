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
- id
- firstName
- lastName
- userName
- password

Products
-  id
- name
- price



Orders
- id
- user_id


OrderProduct
- order_id
- product_id 
- quantity 


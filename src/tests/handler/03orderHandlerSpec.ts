import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { app } from '../../server';
import {order, orderID} from '../../models/orders'
import { user } from '../../models/users';
import { product } from '../../models/products';

const request = supertest(app);



describe ('order Handler' , ()=> {
    const newUser : user = {
        firstName: 'user5 ',
        lastName: 'user5',
        userName: 'user 5',
        password: '1234'
    }
    const newProduct : product = {
        name: 'product2',
        price: 30,
        id: 2
    }
    let token: string = '';
    beforeAll(async () => {
        const response = await request.post('/user').send (newUser)
        request.post('/product').send (newProduct)
        token = response.body
    });
    console.log(token)
it ('create order ' ,async () => {
    const newOrder : orderID = {
        user_id: 4,
        quantity: 50,
        id: 1
    }
    const response = await request.post('/order').send (newOrder).expect(200)

    
})
it ('dont show all orders without authonitication ' ,async () => {
    const response = await request.get('/orders').expect(401)
    
})
it ('show all orders with authonitication ' ,async () => {
    const response = await request.get('/orders').auth(token, { type: 'bearer' }).expect(200)
    
})
it ('update order' ,async () => {

   const updateOrder : orderID = {
    user_id: 4,
    quantity: 200,
    id : 5
}
const response = await request.put('/updateOrder/5').send(updateOrder).auth(token, { type: 'bearer' }).expect(200)
    
})
it ('delete order  ' ,async () => {
    
    const response = await request.delete('/deleteOrder/1').auth(token, { type: 'bearer' }).expect(200)
    
})



})


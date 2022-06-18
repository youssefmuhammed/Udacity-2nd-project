import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userHandler from './handlers/usersHandler';
import productHandler from './handlers/productsHandler';
import orderHandler from './handlers/ordersHandlers';
import path from 'path';

const app  = express();
const address = '0.0.0.0:3000';
const corsOptions = { origin : 'htt://someotherdomain.com',optionsSuccessStatus : 200 }


app.use(cors(corsOptions))

app.use(bodyParser.json())

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname + '/index.html'))
})

userHandler(app)
productHandler(app)
orderHandler(app)

app.listen(3000,function(){
    console.log(`start at ${address}`)
})



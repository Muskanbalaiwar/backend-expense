
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
app.use(cors())
const router=require('./routes/routeExpense')

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get(router)

app.post(router)

app.get(router)
app.delete(router)
app.listen(3001);
console.log('program start');
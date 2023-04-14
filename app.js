const express=require('express');
const cors = require("cors");
const app=express();
const userRouter=require('./Routers/userRouter')
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors({
    methods: ['GET', 'POST']
}));
app.use('/api/user',userRouter)

module.exports=app

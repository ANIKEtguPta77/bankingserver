require('dotenv/config');
const mongoose=require('mongoose');
const app=require('./app');

// mongoose.connect(process.env.MONGODB_URL_LOCAL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
   
// })
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://aniket:aniket@ac-ybdhgco-shard-00-00.fr0rpod.mongodb.net:27017,ac-ybdhgco-shard-00-01.fr0rpod.mongodb.net:27017,ac-ybdhgco-shard-00-02.fr0rpod.mongodb.net:27017/?ssl=true&replicaSet=atlas-5nc781-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser: true});




const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`App running on${port}`)
})

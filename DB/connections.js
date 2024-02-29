const mongoose=require('mongoose')

//get connection string from .dotenv file
const connectionString=process.env.DATABASE;

//connect mongodb
mongoose.connect(connectionString).then((res)=>{
    console.log('mongo db connected successfully');
}).catch((err)=>{
    console.log(`mongodb connect failed due to ${err}`);
})
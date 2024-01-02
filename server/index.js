import express from 'express'
import bodyParser  from 'body-parser'
import mongoose from 'mongoose'
import cors from  'cors'
import dotenv from "dotenv"
import postRoutes from './routes/posts.js'


const app=express();
dotenv.config()


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors());
app.use('/posts',postRoutes)
//const CONECTION_URL='mongodb+srv://sagargowda1329:TX0l0z4VDaF3frAP@cluster0.zyvuh9o.mongodb.net/?retryWrites=true&w=majority'
const PORT=process.env.PORT||5000;

mongoose.connect(process.env.CONECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log("Server running on port 50000")))
.catch((error)=>console.log(error.message))
 

//mongoose.set("useFindAndModify",false)
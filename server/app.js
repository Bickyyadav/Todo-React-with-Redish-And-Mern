import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/dbconnection.js";
import routeruser from "./routes/user.js";
import bodyParser from "body-parser";
import Todo from "./routes/todo.js";
import cors from "cors";
import {Redis} from "ioredis"
//cookie part
import cookieParser from "cookie-parser";
import axios from "axios";
//redis
const redisClient = new Redis();  

const app = express();
dotenv.config();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
//cookie part
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/posts",async(req,res)=>{
  try {
    const cachedData = await redisClient.get('posts');
    if(cachedData !==null){
      console.log("data from cached");
      
      return res.json(JSON.parse(cachedData));
    }else{
      console.log("log not from cached data");
      
      const {data}= await axios("https://jsonplaceholder.typicode.com/posts");
      await redisClient.set("posts",JSON.stringify(data));
      return res.json(data);
    }
    
  } catch (error) {
    console.log("🚀 ~ app.get ~ error:", error)
    
  }
})


app.use("/api/v1/user", routeruser);
app.use("/api/v1/todo", Todo);

app.listen(PORT, () => {
  console.log(`server is running in port number ${PORT}`);
});

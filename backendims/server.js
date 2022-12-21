import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
mongoose.set("strictQuery", true);
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute.js"
import errorHandler from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.PORT || 5050;

//appLevel middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

//routes middleware
app.use('/api/users',userRoute);


//routes
app.get('/',(req,res)=>{
    res.send("Home page");
})

//error middleware
app.use(errorHandler)

//database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
    app.listen(port, () => {
      console.log(`listining on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

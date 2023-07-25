import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import {userRouter} from './routes/users.js'
import { recipesRouter } from './routes/recipes.js'
import 'dotenv/config'

const app = express();
const mongopassword = process.env.MONGOPASS
console.log(mongopassword)
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter)
app.use("/recipes", recipesRouter)

mongoose.connect(`mongodb+srv://samarthbbbb:${mongopassword}@recipes.rqmqprr.mongodb.net/recipes?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})

app.listen(3001, ()=> console.log("SERVER STARTED"))

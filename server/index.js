import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotnev from 'dotenv';
import mongoose from 'mongoose';
import TweetRouter from './Routes/TweetRoute.js';

const app = express();
dotnev.config()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({limit:"50mb",extended:false}))
app.use('/tweeter',TweetRouter)

mongoose.connect(MONGO_URL, {useNewUrlParser:true,useUnifiedTopology:true})
        .then(() => app.listen(PORT,console.log(`Listening on PORT ${PORT}`)))
        .then(() => console.log("DB connected"))
        .catch((err)=>console.log(err))


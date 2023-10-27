import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./ models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();
//middleware for parsing request body
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// middleware for handaling cors policy
//option 1: allow all origins with default of cors(*)

  app.use(cors());


// option 2: allow custom origin
// app.use(
//     cors({
//         origin:'https://localhost:3000',   // frontend url
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['content-Type'],
//     })
// )

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('welcome to ne request')
});

app.use('/books',booksRoute)


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log(`App is connect to database`);
        app.listen(PORT, () => {
            console.log(`App is listening to port :${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });
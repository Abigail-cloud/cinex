import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./src/configDb/connect";
import cinemaRouter from "./src/routes/cinema.routes";

dotenv.config()

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT;


app.use('/cinema', cinemaRouter);

app.get('/api', (req, res) => {
    res.send('Hello Ticket Booking!');
  });
  


const startApp = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, ()=>{
    console.log(`Server is listening on port http://localhost:${port}` );
    
})
    } catch (error) {
        console.log(error);
        
    }
}

startApp();



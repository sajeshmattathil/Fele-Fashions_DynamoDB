import dotenv from "dotenv";
dotenv.config();
// import dbConnect from "./Config/dbconnect";
// dbConnect();
import express from "express";
const app = express();
import cors from "cors";
import productRouter from "./infrastructure/routers/productRouter";

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/product',productRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/UserRoute.js";
import BookRoute from "./routes/BookRoute.js";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(BookRoute);

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running...");
});
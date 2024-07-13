import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/UserRoute.js';
import BookRoute from './routes/BookRoute.js';
import BorrowedBooksRoute from './routes/BorrowedBooksRoute.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js'; 

dotenv.config();
const app = express();

const corsOptions = {
    origin: 'http://localhost:5000', 
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(BookRoute);
app.use(BorrowedBooksRoute);

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});
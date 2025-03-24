import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { connectMySQLClient, setupModels } from './src/helpers/db';
import authMiddleWare from './src/helpers/middlewares';
import { routesRegistration } from './src/index';
import { rateLimit } from 'express-rate-limit'

dotenv.config();

const initServer = async () => {
    console.log(process.env.DATABASE_URL,'-------DATABASE_URL------')
    try {
        const app = express();
        const port = process.env.PORT || 3000;

        // Middleware
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(morgan('tiny'));
        app.use(authMiddleWare);

        // Set EJS as the template engine
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, './src/views'));

        // Initialize Database
        await connectMySQLClient();
        await setupModels()

        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
            standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
            message: "Too many attempts. Please try again later.",
        })

        // Apply the rate limiting middleware to all requests.
        app.use(limiter)

        // Routes
        let router = express.Router();
        await routesRegistration(router);
        app.use(cors(), router);

        // Default Route
        app.get("/", (req, res) => res.render('login', { error: '', success: '' }));

        // Start server
        app.listen(port, () => console.log(`Server running on: ${port}`));

        return app;
    } catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
};

// Start the application
(async () => {
    process.setMaxListeners(0);
    await initServer();
})();

// Handle unhandled rejections
process.on('unhandledRejection', error => {
    console.error('Unhandled Rejection:', error);
});

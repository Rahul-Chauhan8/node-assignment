import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { connectMySQLClient, setupModels } from './src/helpers/db';
import authMiddleWare from './src/helpers/middlewares';
import { authRoutes } from './src/Auth/index'
import { userRoutes } from './src/Users/index'

dotenv.config();

const initServer = async () => {
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


        // Routes
        let router = express.Router();
        await authRoutes(router)
        await userRoutes(router)
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

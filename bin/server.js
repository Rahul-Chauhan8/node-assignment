
import express from 'express';
import bodyParser from 'body-parser';
import DB from '../src/helpers/db';
import Routes from '../src/index';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger'
const path = require('path');
import cors from 'cors';
const session = require('express-session');
const cookieParser = require('cookie-parser');
import authMiddleWare from '../src/helpers/middlewares';
const morgan = require("morgan");

export default class Server {
    constructor() {
        this.app = null;
        this.db = null;
    }

    async initServer() {
        try {

            this.app = await express();
            this.app.use(bodyParser.json());
            this.app.use(
                bodyParser.urlencoded({
                    extended: true
                }),
            );
            this.app.use(cookieParser());
            this.app.use(morgan("tiny"));
            this.app.use(
                cors({
                    exposedHeaders: [
                        'date',
                        'content-type',
                        'content-length',
                        'connection',
                        'server',
                        'x-powered-by',
                        'access-content-allow-origin',
                        'authorization',
                        'x-final-url',
                    ],
                    allowedHeaders: ['content-type', 'accept', 'authorization'],
                })
            )

            this.app.use(authMiddleWare);
            // Set EJS as the template engine
            this.app.set('view engine', 'ejs');
            this.app.set('views', path.join(__dirname, '../src/views'));

            this.db = new DB();
            await this.db.init();
            // await this.healthCheckRoute();
            this.app.get("/", async (req, res) => {
                try {
                    console.log("enter here");
                    return res.render('login', { error: '',success:'' });
                } catch (error) {
                    res.status(500).send("An error occurred");
                }
            });
            await this.healthyDB();
            await this.configureRoutes(this.db);
            this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
            return this.app
        } catch (err) {
            throw err;
        }
    }

    async healthyDB() {
        try {
            if (await this.db.checkConnection()) {
                this.app.get('/health', (req, res) => {
                    res.json({
                        msg: "DB Connection Successfull",
                    });
                });
                return;
            }
            throw new Error('Error connecting to DB')
        } catch (err) {
            throw err;
        }
    }

    async configureRoutes(db) {
        this.router = express.Router();
        const routes = new Routes(this.router, db);
        await routes.routesRegistration();
        // this.app.use(this.router);
        this.app.use(cors(), this.router);
    }

}

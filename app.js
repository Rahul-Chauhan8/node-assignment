require('dotenv').config();
import http from 'http';
import Server from './bin/server'

class Application {
    constructor() {
        this.app = "";
        this.bind = "";
        this.port = "";
        this.server = "";
        this.serverObj = "";
    }

    async initApp() {
        this.port = process.env.PORT;
        this.serverObj = new Server();
        this.app = await this.serverObj.initServer();
        this.app.set('port', this.port);
        this.app.listen(this.port, () => {
            console.log(`Server running on: ${this.port}`)
        })
        // await this.initAppServer();
    }
}

const app = new Application();

(async () => {
    process.setMaxListeners(0);
    await app.initApp();
})();

// The unhandledRejection listener
process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error);
});
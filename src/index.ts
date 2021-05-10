import * as Koa from "koa";
import {pool} from "./config/DaoConfig"
import * as mount from "koa-mount";
import {staticFileMiddleWare} from "./config/StaticFileConfig";
import router from "./router";
import bodyParser = require("koa-bodyparser");

const app = new Koa();


app.use(bodyParser());
app.use(router.routes());
app.use(mount("/static/",staticFileMiddleWare));



const server = app.listen(9000,() => {
    console.clear();
    console.log('start at http://localhost:9000');
});

function cleanup() {
    server.close(err => {
        console.log('server shutdown now');
        pool.end();
        console.log('database shutdown')
    });

    setTimeout( function () {
        console.error("Could not close connections in time, forcing shut down");
        process.exit(1);
    }, 30 * 1000);
}


process.on('SIGINT',cleanup);
process.on('beforeExit',cleanup)






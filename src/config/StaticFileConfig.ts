import * as serve from "koa-static";

export const staticFileMiddleWare = serve(`${process.cwd()}/public/`);

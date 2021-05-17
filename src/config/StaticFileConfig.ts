import * as serve from "koa-static";

export const staticFileDir = `${process.cwd()}/public/`
export const staticFileMiddleWare = serve(staticFileDir);

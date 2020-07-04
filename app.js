const Koa = require("koa")

const app = new Koa()

const router = require("./router/router")
const static = require("koa-static")
const path = require("path")
const views = require("koa-views")
const koaBody = require("koa-body")

const https = require("https")
const fs = require("fs")

var options = {
    key: fs.readFileSync('./ssl/server/server-key.pem'),
    cert: fs.readFileSync('./ssl/server/server-cert.pem')
}

// 打印日志
app.use(async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url} ..........`)
    await next()
})

// 针对于文件上传的时候，可以解析多个字段
app.use(koaBody({multipart:true}))

// 注册静态文件的库到中间件
app.use(static(path.join(__dirname, "static")))

// 注册模板引擎的库到中间件
app.use(views(path.join(__dirname, "views"), {extension:"ejs", map:{html:"ejs"}}))

// 注册处理URL映射中间件
app.use(router.routes())

console.log("正在监听3000端口")
https.createServer(options, app.callback()).listen(3000);

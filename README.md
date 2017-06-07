# waka-website

我的网站

基于node v7.6.0 以上

# 使用的技术以及用它来解决了什么问题

### 前端

- nunjucks 有些页面需要SEO，选择它来渲染html
- scss css预编译，扩展css
- gulp 用来自动编译scss
- react 编写后台时使用，后台不用SEO
- typescript 编写react时使用，抱着学习的目的

### 后端

- node v7.6+ JS省去切换语言成本; v7.6+默认支持 async/await，简化异步操作，一步到位
- koa 同样是因为 async/await

### 数据库

- mysql 数据库 1.为什么不用mongooDB? 因为关系型数据库查询关联更方便 2.为什么不使用ORM框架? 因为我想强化一下自己的SQL

# 目录结构

- admin 后台程序目录
- dist 打包输出目录
- fitness 健身数据目录
- helpBrother 帮老弟搞数据分析的目录
- middlewares 中间件目录
- node-study 学习node目录
- routers 路由目录
- secret 放置不能公开的文件目录，比如mysql用户密码等等
- static 静态资源目录
- test 测试文件目录
- typescript-study 学习ts目录
- utils 工具文件目录
- views HTML目录
- websocket 学习websocket目录

# 依赖库

### 依赖

- bluebird 第三方Promise库，加强原生Promise功能，且性能更快
- cheerio 爬虫HTML解析
- koa Node框架
- koa-bodyparser 解析post的body
- koa-mount 将中间件挂载到特定url下
- koa-router koa路由
- koa-static koa静态资源
- marked 解析markdown
- mime 处理 MIME 类型的库
- mysql 连接mysql的驱动
- mz 将node更新至ES6+语法的库
- nunjucks nunjucks模板引擎
- request 简化网络请求
- request-promise 网络请求默认变为promise，方便async/await使用
- tracer console.log加强
- uuid 生成UUID https://github.com/kelektiv/node-uuid
- ws websocket实现库

### 开发依赖

- gulp 自动化构建工具
- gulp-sass 编译sass

# waka-website

我的网站

基于node v7.6.0 以上

# 使用的技术以及用它来解决了什么问题

### 前端

##### 首页、详情页、登录页

- nunjucks 需要SEO的页面，选择它来渲染html
- sass css预处理
- gulp 用来自动编译scss

##### admin 后台管理页

- react 编写后台时使用，后台不用SEO
- sass 用sass配合css-module写样式
- redux 状态管理
- react-router 路由
- redux-saga 异步action
- typescript 编写react时使用，抱着学习的目的
- fetch 使用 fetch 获取网络数据

### 后端

- node v7.6+ JS省去切换语言成本; v7.6+默认支持 async/await，简化异步操作，一步到位
- koa 同样是因为 async/await

### 数据库

- mysql 数据库 1.为什么不用mongooDB? 因为关系型数据库查询关联更方便 2.为什么不使用ORM框架? 因为我想强化一下自己的SQL

# 目录结构

- admin 后台程序目录
- dist 打包输出目录
- es6-plus-study 6+学习目录
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

- antd ant-design 
- bluebird 第三方Promise库，加强原生Promise功能，且性能更快
- busboy 用来解析出请求中文件流
- cheerio 爬虫HTML解析
- ejs 模板引擎
- highlightjs 代码语法高亮，用来让 markdown 更好看
- kcors koa CORS 跨域
- koa Node框架
- koa-bodyparser 解析post的body
- koa-ejs koa ejs中间件
- koa-mount 将中间件挂载到特定url下
- koa-router koa路由
- koa-static koa静态资源
- lodash 工具库
- marked 解析markdown
- material-ui MaterialUI 酷炫的设计语言
- mime 处理 MIME 类型的库
- moment 处理时间日期格式
- mysql 连接mysql的驱动
- mz 将node更新至ES6+语法的库
- prop-types React单另的PropTypes模块
- react React
- react-dom React-DOM
- react-redux React Redux 提供 Provider 和 connect 方法
- react-router-dom react-router React前端路由 web端，不是native端
- react-tap-event-plugin React处理移动设备onClick延时300ms使用的库，提供onTouchTap替代onClick
- redux Redux库
- redux-saga redux 异步action库
- request 简化网络请求
- request-promise 网络请求默认变为promise，方便async/await使用
- tracer console.log加强
- uuid 生成UUID https://github.com/kelektiv/node-uuid
- ws websocket实现库

### 开发依赖

- babel-core Babel报错说需要这玩意
- babel-loader Babel的loader
- babel-plugin-import 按需加载antd组件
- babel-preset-es2015 babel es2015语法支持
- babel-preset-react React JSX语法支持
- babel-preset-stage-0 es提案stage-0支持
- chalk 彩色终端
- css-loader css解析器
- gulp 自动化构建工具
- gulp-sass 编译sass
- html-webpack-plugin HtmlWebpackPlugin简化了HTML文件的创建，以便为您的webpack包提供服务。 这对于在文件名中包含每次会随着变异会发生变化的哈希的webpack bundle尤其有用。 您可以让插件为您生成一个HTML文件，使用lodash模板提供您自己的模板，或使用您自己的loader。
- less less-loader需要
- less-loader 解析less，因为antd使用了less
- node-sass sass-loader的前置依赖
- sass-loader 解析.scss文件
- source-map-loader 使用TypeScript输出的sourcemap文件来告诉webpack何时生成 自己的sourcemaps
- style-loader 样式解析器
- webpack webpack模块加载器
- webpack-dashboard webpack-dev-server仪表盘 让你看起来像NASA工作
- webpack-dev-server webpack开发服务器

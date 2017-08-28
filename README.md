# webpack
> webpack 是一个模块打包器 (module bundler)，能够将任何资源如 JavaScript 文件、CSS 文件、图片等打包成一个或少数文件。
> * 首先，定义已经说明了 webpack 能将多个资源模块打包成一个或少数文件，这意味着与以往的发起多个 HTTP 请求来获得资源相比，现在只需要发起少量的 HTTP 请求。
> * 其次，webpack 能将你的资源转换为最适合浏览器的“格式”，提升应用性能。比如只引用被应用使用的资源 (剔除未被使用的代码)，懒加载资源 (只在需要的时候才加载相应的资源)。再次，对于开发阶段，webpack 也提供了实时加载和热加载的功能，大大地节省了开发时间。除此之外，还有许多优秀之处之处值得去挖掘。不过，webpack 最核心的还是打包的功能。
> * webpack 是模块打包器（module bundler），把所有的模块打包成一个或少量文件，使你只需加载少量文件即可运行整个应用，而无需像之前那样加载大量的图片，css文件，js文件，字体文件等等。而gulp／grunt 是自动化构建工具，或者叫任务运行器（task runner），是把你所有重复的手动操作让代码来做，例如压缩JS代码、CSS代码，代码检查、代码编译等等，自动化构建工具并不能把所有模块打包到一起，也不能构建不同模块之间的依赖图。两者来比较的话，gulp/grunt 无法做模块打包的事，webpack 虽然有 loader 和 plugin可以做一部分 gulp／grunt 能做的事，但是终究 webpack 的插件还是不如 gulp／grunt 的插件丰富，能做的事比较有限。于是有人两者结合着用，将 webpack 放到 gulp／grunt 中用。然而，更好的方法是用 npm scripts 取代 gulp／grunt，npm 是 node 的包管理器 (node package manager)，用于管理 node 的第三方软件包，npm 对于任务命令的良好支持让你最终省却了编写任务代码的必要，取而代之的，是老祖宗的几个命令行，仅靠几句命令行就足以完成你的模块打包和自动化构建的所有需求。

### 创建顺序
* $ mkdir webpack-demo && cd webpack-demo && npm init -y
* $ npm i --save-dev webpack
* $ mkdir src && cd src && touch index.js
*  ./node_modules/.bin/webpack src/index.js dist/bundle.js # 第一个参数是打包的入口文件，第二个参数是打包的出口文件
* $ touch webpack.config.js  //  webpack 的配置文件
* $ ./node_modules/.bin/webpack --config webpack.config.js # `--config` 制定 webpack 的配置文件，默认是 `webpack.config.js` 
  > 所以这里可以省却 --config webpack.config.js。但是每次都要写 ./node_modules/.bin/webpack 实在让人不爽，所以我们要动用 NPM Scripts
  > 在 npm scripts 中我们可以通过包名直接引用本地安装的 npm 包的二进制版本，而无需编写包的整个路径。
  * $ npm run build // bulid 并不是 npm scripts 的内置属性，需要使用 npm run 来执行脚本，详情见 npm run。

### loader
> 因为其他文件和 JS 文件类型不同，要把他们加载到 JS 文件中就需要经过加载器 (loader) 的处理。

*  $ npm i --save-dev style-loader css-loader
  > style-loader 通过插入 \<style> 标签将 CSS 加入到 DOM 中，css-loader 会像解释 import/require() 一样解释 @import 和 url()。
* $ npm install --save-dev file-loader
  > file-loader 指示 webpack 以文件格式发出所需对象并返回文件的公共URL，可用于任何文件的加载。
* filename: '[name].bundle.js'中的[name]会替换为对应的入口起点名，其他可用的替换请参见 output.filename。
* 如果我们修改了入口文件名或增加了入口文件，index.html是不会自动引用新文件的，而手动修改实在太挫。是时候使用插件 (plugin) 来完成这一任务了。我们使用 HtmlWebpackPlugin 自动生成 html 文件。
  > loader (加载器)，重在“加载”二字，是用于预处理文件的，只用于在加载不同类型的文件时对不同类型的文件做相应的处理。而 plugin (插件)，顾名思义，是用来增加 webpack 的功能的，作用于整个 webpack 的构建过程。在 webpack 这个大公司中，loader 是保安大叔，负责对进入公司的不同人员的处理，而 plugin 则是公司里不同职位的职员，负责公司里的各种不同业务，每增加一种新型的业务需求，我们就需要增加一种 plugin。 
* $ npm i clean-webpack-plugin --save-dev
  > 每次构建前我们需要清空 dist 目录

### 开发环境
  * 使用代码映射 (source map)
    > * devtool: 'inline-source-map'
    > * 当你的代码被打包后，如果打包后的代码发生了错误，你很难追踪到错误发生的原始位置，这个时候，我们就需要代码映射 (source map) 这种工具，它能将编译后的代码映射回原始的源码，你的错误是起源于打包前的b.js的某个位置，代码映射就能告诉你错误是那个模块的那个位置。webpack 默认提供了 10 种风格的代码映射，使用它们会明显影响到构建 (build) 和重构建 (rebuild，每次修改后需要重新构建) 的速度，十种风格的差异可以参看 devtool。关于如何选择映射风格可以参看 Webpack devtool source map。这里，我们为了准确显示错误位置，选择速度较慢的inline-source-map。
  * 使用 webpack-dev-server
    > * $ npm i --save-dev webpack-dev-server
    > * webpack 提供了对实时加载代码的支持 - 开发时每次修改代码保存后都需要重新手动构建代码并手动刷新浏览器以观察修改效果，这是很麻烦的，所以，我们要实时加载代码
    > * 使用 webpack-dev-server 时，webpack 并没有将所有生成的文件写入磁盘，而是放在内存中，提供更快的内存内访问，便于实时更新。
  * 模块热替换 (HMR, Hot Module Replacement)
    > * webpack 提供了对模块热替换 (或者叫热加载) 的支持。这一特性能够让应用运行的时候替换、增加或删除模块，而无需进行完全的重载。
    > * 模块热替换（HMR）只更新发生变更（替换、添加、删除）的模块，而无需重新加载整个页面（实时加载，LiveReload），这样可以显著加快开发速度，一旦打开了 webpack-dev-server 的 hot 模式，在试图重新加载整个页面之前，热模式会尝试使用 HMR 来更新。
    > * webpack-dev-server 会为每个入口文件创建一个客户端脚本，这个脚本会监控该入口文件的依赖模块的更新，如果该入口文件编写了 HMR 处理函数，它就能接收依赖模块的更新，反之，更新会向上冒泡，直到客户端脚本仍没有处理函数的话，webpack-dev-server 会重新加载整个页面。如果入口文件本身发生了更新，因为向上会冒泡到客户端脚本，并且不存在 HMR 处理函数，所以会导致页面重载。
    > * 开启了 HMR 的功能，HMR 的接口暴露在module.hot属性之下，我们只需要调用 HMR API 即可实现热加载。当“被加载模块”发生改变时，依赖该模块的模块便能检测到改变并接收改变之后的模块.
    > * webpack-dev-server 在 inline mode (此为默认模式) 时，会为每个入口起点 (entry) 创建一个客户端脚本，所以你会在上面的输出中看到有些信息重复输出两次
  * 生产环境 - 自动方式
    1. 我们只需要运行webpack -p (相当于 webpack --optimize-minimize --define process.env.NODE_ENV="'production'")这个命令，便可以自动构建生产版本的应用，这个命令会完成以下步骤：
      > * 使用 UglifyJsPlugin (webpack.optimize.UglifyJsPlugin) 压缩 JS 文件 (此插件和 uglifyjs-webpack-plugin 相同)
      > * 运行 LoaderOptionsPlugin 插件，这个插件是用来迁移的
      > * 设置 NodeJS 的环境变量，触发某些 package 包以不同方式编译
    2. webpack -p设置的process.env.NODE_ENV环境变量，是用于编译后的代码的，只有在打包后的代码中，这一环境变量才是有效的。如果在 webpack 配置文件中引用此环境变量，得到的是 undefined，可以参见 #2537。但是，有时我们确实需要在 webpack 配置文件中使用 process.env.NODE_ENV，怎么办呢？一个方法是运行NODE_ENV='production' webpack -p命令，不过这个命令在Windows中是会出问题的。为了解决兼容问题，我们采用 cross-env 解决跨平台的问题。
      > * $ npm i --save-dev cross-env
      > * [chunkhash]不能和 HMR 一起使用，换句话说，不应该在开发环境中使用 [chunkhash] (或者 [hash])，这会导致许多问题
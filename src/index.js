import _ from 'lodash'
// import './style.css'
// import Icon from './icon.png'
// import Data from './data.json' // Data 变量包含可直接使用的 JSON 解析得到的对象

import printMe from './print.js'

function component () {
  const element = document.createElement('div')
  const btn = document.createElement('button')

  element.innerHTML = _.join(['Hello', 'webpack', '测试'], ' ')
  element.classList.add('hello')

  /*
  const myIcon = new Image()
  myIcon.src = Icon
  element.appendChild(myIcon)

  console.log(Data)
 */
  btn.innerHTML = 'Click me and check the console!'
  btn.onclick = printMe

  element.appendChild(btn)

  return element
}
document.body.appendChild(component())

if (module.hot) { // 习惯上我们会检查是否可以访问 `module.hot` 属性
  module.hot.accept('./print.js', function() { // 接受给定依赖模块的更新，并触发一个回调函数来对这些更新做出响应
    console.log('Accepting the updated printMe module!')
    printMe()
  })
}
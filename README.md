# 原生JavaScript

##代码段
* 获取函数名
   ```javascript
   Function.prototype.getName = function() { return this.name || this.toString().match(/function\s*([^(]*)\(/)[1] }
   ```
* 获取URL参数
  ```javascript
  function getURLParameter (name) { return (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [null, ''])[1].replace(/\+/g, '%20') || '' }
  ```
# JAVASCRIPT

## 执行上下文
> * Global code – 默认环境，你的代码首次执行的地方
> * Function code – 当代码执行进入到函数体当中
> * Eval code – 在 eval 函数内部执行的文本
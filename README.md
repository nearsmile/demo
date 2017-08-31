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

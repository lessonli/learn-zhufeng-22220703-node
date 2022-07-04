
/* 
  + 高阶函数的应用 函数柯理化
    +什么是柯理化？
      + 把函数的多个参数 转变为单个参数的方式 
      + 柯理化 要求 函数的参数个数是已知的
    + 会让 函数更具体
*/

function isTyping(typing, val) {
  return Object.prototype.toString.call(val)=== `[object ${typing}]`
}

/**
 * 以上的方法 虽然实现了 代码的封装 可是我每次都得手动去 传入 数据类型 和 变量  
 * 我想 只传入 变量 如何实现呢？
 * 闭包
 */

/**
 * 什么是闭包？
 *  定义函数的作用域 与执行函数作用域 不一致就会产生闭包(开 发中的闭包理解)
 */

function isTypingCurry(typing){
  return function name(val) {
    return Object.prototype.toString.call(val)=== `[object ${typing}]`
  }
}

const isString = isTypingCurry("String")


const utils = {};

['String','Number'].forEach(method=>{
  utils[`is${method}`] = isTypingCurry(method)
})

console.log(utils.isNumber(12), 'number');






function curring(fn) {
  const len = fn.length // 函数的个数
  const presetArgs = Array.from(arguments).slice(1)

  return (...args)=>{
    const allArgs = [...presetArgs, ...args]
    if(allArgs.length >= len){
      fn(...args)
    } else{
      return curring(fn, ...args)
    }
  }
}
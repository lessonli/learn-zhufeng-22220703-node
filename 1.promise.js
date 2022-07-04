
//  先明确 promise 解决的问题  能否完全解决问题 什么是promise
// 在promise 出现之前 写代码都是基于回调的

// 在串行模式中 上一个人的输出是下一个人的输入 此时就会产生回调地狱问题(恶魔金字塔) then 链 依旧是基于回调的


//可以解决 异步并发问题 Promise.all
// 错误处理变得更简单 

// https://promisesaplus.com/  规范的目的 在于我们可以让不同人编写的 promise 可以相互的兼容在一起



//  走向失败有两种情况 1。 调用 reject 2， 代码中抛出异常(内部有 try catch ) 补货到异常后 调用 reject

// const Promise = require('./promise')
const Promise = require('./myPromise')

const promise = new Promise((resolve, reject)=>{
  // resolve('ok')
  reject('失败')
})

promise.then(res=>{
  console.log(res, 'res');
}, (reason)=>{
  console.log(reason, '1');
})

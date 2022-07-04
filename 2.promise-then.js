
const fs = require('fs')
const path = require('path')

// then 传递 成功和失败的函数 针对他的返回值 会做不同的处理
//  1.如果返回的不是 promise 那么 这值会被直接传递 到 下一次then 的成功的回调中
//  2.如果想走到 下一次 then 的失败 中去 需要在 本次then 成功的回调中抛出异常
//  3. 返回的值是 promise 则会根据返回的promise 来决定 走成功 或者失败
const readFile =(...args)=>{
  return new Promise((resolve,reject)=>{
    // 并行的请求 怎么同步 最终的结果 不要使用 promise
    fs.readFile(...args, (err,data)=>{
      if(err)  reject(err);
       resolve(data)
    })
  })
}



// 并行的请求 怎么同步 最终的结果 不要使用 promise
readFile(path.resolve(__dirname, './name.txt'), 'utf-8').then(res=>{
  console.log(res, 'res');
}).catch(err=>{
  console.log(err, 'err');
})

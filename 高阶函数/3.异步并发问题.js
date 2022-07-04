
const fs = require('fs')
const path = require('path');



// let school = {}
// function finish(key,value) {
//   school[key] = value
// }

// 并行的请求 怎么同步 最终的结果 不要使用 promise
fs.readFile(path.resolve(__dirname, './name.txt'), 'utf-8', function name(err,data) {
  console.log(data);
  finish('name',data)
})
fs.readFile(path.resolve(__dirname, './age.txt'), 'utf-8', function name(err,data) {
  console.log(data);
  finish('age',data)
})


function after(times, cb) {
  // 借用闭包缓存变量
  let obj = {}
  return (key,val)=>{
    obj[key] = val
    if(--times === 0){
      cb(obj)
    }
  }

}

let finish = after(2, function out(data) {
  console.log(data);
})

//  异步 并行 要通过 计数器 + 回调 
// 设计 模式 发布 订阅 模式


const fs = require('fs')
const path = require('path');
/**
 * 一般函数是为了组合的
 * 而类主要是为了封装逻辑
 * 
 */

const events = {
  _arr : [],
  on (cb){
    console.log(1);
    this._arr.push(cb)
  },
  emit(key,value){
    this._arr.forEach(fn=>fn(key,value))
  },
  getArr(){
    return this._arr
  }
}


// 监听某个事件 当emit 完成之后 就要触发该回调
events.on((key,value)=>{
 
  console.log('属性', key, 'value', value);
})

// 订阅事件
events.on((key, value)=>{
  console.log(key,value);
})




// 并行的请求 怎么同步 最终的结果 不要使用 promise
fs.readFile(path.resolve(__dirname, './name.txt'), 'utf-8', function name(err,data) {
  // console.log(data);
  // 每个emit 都会触发 eventon 事件
  events.emit('name',data)
})
fs.readFile(path.resolve(__dirname, './age.txt'), 'utf-8', function name(err,data) {
  // console.log(data);
  events.emit('age',data)
})




// 观察者模式  基于发布订阅的  (观察者模式 包含发布订阅的)
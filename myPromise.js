
const PENDFING = 'pending'
const FUILILLED = 'fuililled'
const REJECTED = 'rejected'

class Promise {
  constructor(execute){
    this.status = PENDFING;
    this.reason = undefined
    this.value = undefined
    this.resolveCallbacks = []
    this.rejectCallbacks = []


    const resolve = (value)=>{
      if(this.status === PENDFING){
        this.status = FUILILLED
        this.value = value
        this.resolveCallbacks.forEach(fn=>fn())
      }

    }
    const reject = (reason)=>{
      if(this.status === PENDFING){
        this.status = REJECTED
        this.reason = reason
        this.rejectCallbacks.forEach(fn=>fn())
      }
    }

    try {
      execute(resolve, reject)
    } catch (error) {
      reject(error)
    }
   
  }
  catch(errCallback) {
    return this.then(null, errCallback);
  }
  then(onFulfilled, onRejected) {

    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (e) => {
          throw e;
        };
    //  每一个 Promise 的then 方法 都返回一个新的Promise 而不是 this 本身  并且 Promise 要求 每个 Promsie 的then 都是异步的 因此我们用 setTimeout 模拟
    let promise2 = new Promise((resolve,reject)=>{
      if(this.status === FUILILLED){
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        });
      }

      if(this.status === REJECTED){
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        });
      }
      if(this.status === PENDFING){
        //  发布订阅 处理 异步 回调
        this.rejectCallbacks.push(()=>{
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2,x, resolve,reject)
            } catch (error) {
              reject(error)
            }
          });
        })
        this.resolveCallbacks.push(()=>{
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2,x, resolve,reject)
            } catch (error) {
              reject(error)
            }
          });
        })

     
      }

    })

    return promise2

  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
  //  借助 当前then 的返回值 透传下去
  static finally(callback){
    return this.then(value=>{
      return  Promise.resolve(callback()).then(()=>value)
    }, reason=>{
      return Promise.resolve(callback).then(()=>{throw reason})
    })
  }

  static allSettled(promiseArr){
    
  }
}


const resolvePromise = (promise2, x, resolve, reject) =>{
  //  如果 返回相同的 Promise 则 抛出 错误
  if(promise2 === x){
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  // 然后 判断 x(上一次的返回值 是不是 promise)
  // 满足 当前条件 才可能是一个promise（规范认为 是为了兼容 别人的 Promise  ）
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // 然后还要看是否具备then 方法  具备 了 then 方法 promise 才认为是一个函数
    
    let called = false
    try {
      let then = x.then
      if(typeof then === 'function'){
        // 此时 才是一个 promsie
  
        // 如果 是一个 promise 要去接着 调用 该 resolvePromise 知道解析到 普通值
        // 如果是一个 promise 则会把 promise 接着解析出来 给到 then
        // 那么 x就是Promise2
        
        then.call(x, (y)=>{
          if(called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        },(r)=>{
          if(called) return
          called = true
          reject(r)
        })
        
      } else {
      //   普通值 直接抛出
        resolve(x)
      }
    } catch (error) {
      if(called) return
        called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}
module.exports = Promise;
Promise.deferred = function () {
  // deferred  all race catch ...
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};


// 基于 promise 封装一个 中断的promise
//  我们知道 promsie 的状态是不可逆的 因此 借助另外一个 promise 来实现 race
function withABort(userPromise){
  let abort ;
  //  保存 内部 promise 失败的引用 
  let innerPromsie = new Promise((resolve,reject)=> {
    abort = reject
  })
  let racePromise = Promise.race([userPromise, innerPromsie])
  racePromise.abort = abort
  return racePromise
}


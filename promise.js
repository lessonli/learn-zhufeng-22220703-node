
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {

    this.status = PENDING; // 默认是等待态
    // 默认有成功的值或失败的原因
    this.value = undefined;
    this.reason = undefined;
    // 成功回调
    this.onResolveedCallbacks = []
    // 失败的回调
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onResolveedCallbacks.foreach(fn => fn)
      }
    }
  
    const reject = (reason) => {
      console.log(reason, 'reason');
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.foreach(fn => fn)
      }
    }

    // 调用成功走向成功 调用 失败 走向失败 如果 抛出异常 则 执行 失败
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }

  }

  then(onFulfilled, onRejected) {
    //  如果函数 返回的是一个普通值 那么 需要在 下一轮的 then 中返回 成功或者失败
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
       let x =  onFulfilled(this.value)
       resolve(x)
      }
      if (this.status === REJECTED) {
        let x =  onRejected(this.reason)
        reject(x)
      }
      // 当resolve 存在 定时器 异步任务时 该 状态未释放 依旧是 pending 状态
      if (this.status === PENDING) {
        this.onRejectedCallbacks.push(() => {
          //  这里为什么用个闭包呢 就是为了 在使用的时候 可以在执行之前做一些自定义任务
          let x =  onRejected(this.reason)
          resolve(x)
        })
        this.onResolveedCallbacks.push(() => {
          let x =  onFulfilled(this.value)
          reject(x)
        })
      }
      
    })

    return promise2
  }
}



// common js 规范
module.exports = Promise
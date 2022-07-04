
/* 什么是高阶函数？
    + 返回值是一个函数
    + 参数是一个函数
*/

function core(a,b,c) {
  console.log('core', a,b,c);
}

Function.prototype._before = function before(before) {
  return (...args)=>{
  // before? 也携带参数呢？
    // before.call()
    before.call(this,arguments )
    this(...args) // 执行外层的core
  }
}



let newCore = core._before((params)=>{
  console.log('before', );
})


// 高阶函数可以对函数进行扩展
newCore(1,2,4)
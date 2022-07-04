

let p = Promise.resolve(Promise.resolve(12))

p.then(res=>{
  console.log(res, 'res');
})
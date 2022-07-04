

// 观察者模式 必须要基于发布订阅的

// 被观察者 观察者

// 被观察者观察者
class Subject {
  constructor(name){
    this.name = name
    // 观察者 可以是多个
    this.observerArr = []
    this.state = '开心'
  }
  /**
   * 挂载观察者 使得观察者 和 被观察者 产生关联
   * @params observer 观察者
   */
  attach(observer){
    this.observerArr.push(observer)
  }

  // 被观察者状态发生改变
  setState(newState){
    if(newState!== this.stae){
      this.state = newState
      this.observerArr.forEach(o=>o.update(this))
    }
  }
}

// 观察者
class Observe{
  constructor(name){
    this.name = name
  }

  // 被观察者的 状态发生改变  通知观察者 调用 参数为 被观察者
  update(sub){
    console.log(sub.state, '被观察者状态');
    console.log(sub);
  }


}


//  一个被观察者
let s = new Subject('小宝贝')

// 观察者 可以是多个

let o1 = new Observe('爸爸')
let o2 = new Observe('妈妈')
let o3 = new Observe('爷爷')

s.attach(o1)
s.attach(o2)
s.attach(o3)

s.setState('不开心')

// 观察者 和发布订阅 都是基于 发布订阅的  观察者 模式  一定要有一个被观察者 


// vue2 中 属性 @xx=‘’ this.emit()  就是发布订阅
//  视图更新 就是一个观察者模式
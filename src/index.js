

class Store  {
  constructor(reducer) {
    this.state = null
    this.listener = []
    this.reducer = reducer
  }
  getState() {
    return this.state
  }
  subscribe(fn) {
    this.listener.push(fn)
    return () => {
      this.listener.length = 0
    }
  }
  dispatch(action) {
    // 更新state
    this.reducer(this.state, action)
    // 触发订阅函数
    for(const fn of this.listener) {
      fn()
    }
  }
}

function createStore(reducer) {
  return new Store(reducer)
}




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
    this.state =  this.reducer(this.state, action)
    // 触发订阅函数
    for(const fn of this.listener) {
      fn()
    }
  }
}

function createStore(reducer) {
  return new Store(reducer)
}

const testStore = createStore((state = 'default', action) => {
  switch(action.type) {
    case 'TEST':
      return 'success';
    default:
      return state;
  }
});
testStore.subscribe(() => {
  alert(testStore.getState())
})
setTimeout(() => {
  testStore.dispatch({
    type: 'TEST'
  })
}, 1000)

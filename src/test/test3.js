let obj ={
  key1:'key111',
  key2:'key222'
}
let map = new Map();
map.set('key1','key111')

function t1( key) {
  console.log(map.get(key))
}
t1("key1")

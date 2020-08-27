function t1(t2) {
  t2.call()
}

//t1(()=>console.log('hello world'))

function t3() {
  console.log('函数回调')
}

t1(t3)

function fun() {
  function test() {
    console.log(111111)

  }

  return this;
}

//console.log(fun())
//fun().

function runFunc1() {
  console.log(111111111111);
  var p = new Promise(function (resolve, reject) {            //异步操作
    setTimeout(function () {
      console.log('success runFunc1');
      resolve('数据1');
    }, 5000);
  });
  return p;
}
runFunc1().then(item=>console.log(item))


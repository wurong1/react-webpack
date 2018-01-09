
let btn = document.createElement('button');
btn.innerHTML = 'Click me and check the console';

btn.onclick = e => import('./print').then(module => {
  var print = module.default; //必须指向模块的 .default 值，因为它才是 promise 被处理后返回的实际的 module 对象。
  print();
})
async function getComponent() {
  var element = document.createElement('div');
  const _ = await import('lodash');
  element.innerHTML = _.join(['Hello', 'wurong'],'');
  return element;
}

getComponent().then(component => {
    document.body.appendChild(component);
})

//需要在入口处添加babel-polyfill, entry: ['babel-polyfill','./src/app.js'],
import _ from 'lodash';
import './style/style.css';
import printMe from './print';
import Icon from './icon.PNG';
import data from './data.json';
import { cube } from './math.js';
function component(tag) {
    let element = document.createElement(tag);
    element.innerHTML = _.join(['Hello','webpack', '吴蓉'], '');
    element.classList.add('hello'); //classList是dom原生属性
    /* ----------------------image------------------------------- */
    let myIcon = new Image(500, 500); //等价于 document.createElement('img')
    myIcon.src = Icon;
    element.appendChild(myIcon);
    /* -----------------------button------------------------------ */
    let btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console';
    btn.onclick = printMe;
    element.appendChild(btn);
    /* ----------------------全局变量------------------------------ */
    console.log(data, xx, process.env.NODE_ENV, PRODUCTION);
    /* ----------------------------------------------------------- */
    return element;
}

document.body.appendChild(component('div'));

if (module.hot) {
    module.hot.accept('./print.js', function () {
      console.log('Accepting the updated printMe module!');
      printMe();
   })
}
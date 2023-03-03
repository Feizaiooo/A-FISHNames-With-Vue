import Vue from 'vue';
import message from './index.vue';
import store from '../../store'
import i18n from '../../../locales'
const messageConstructor = Vue.extend(message);
let messagePool = [];
let getAnInstance = () => {
  if(messagePool.length) {
    for (let i = 0;i< messagePool.length;i++) {
      removeDom(messagePool[i]);
    }
    messagePool = [];
  }
  return new messageConstructor({
    el: document.createElement('div')
  });
}

let returnAnInstance = (instance) => {
  if (instance) {
    messagePool.push(instance);
  }
}

let removeDom = (instance) => {
  if (instance) {
    instance.$el.parentNode.removeChild(instance.$el);
  }
}

let messageBox = (options = {}) => {
    let instance = new messageConstructor({ i18n })
    // let instance = getAnInstance()
    instance.$store = store
    // instance.$i18n = i18n
    instance = Object.assign(instance, options)
    instance.$mount()
    // const vm = new messageConstructor({ i18n }).$mount()
    document.body.appendChild(instance.$el)
    returnAnInstance(instance)
    return instance
}

export default messageBox;


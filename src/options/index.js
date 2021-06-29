import Vue from 'vue'
import AppComponent from './index.vue'
Vue.component('app-component', AppComponent)

import {
  Message,
  MessageBox,
  Icon,
  Input,
  Dialog,
  Form,
  Button
} from 'element-ui'

Vue.use(Icon)
  .use(Input)
  .use(Dialog)
  .use(Form)
  .use(Button)

new Vue({
  el: '#app',
  render: createElement => {
    return createElement(AppComponent)
  }
})

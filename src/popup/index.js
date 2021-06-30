import Vue from 'vue'
import AppComponent from './index.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './module/less/globa.css'
Vue.component('app-component', AppComponent)

import { Icon, Input, Dialog, Form, Button } from 'element-ui'

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

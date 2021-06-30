import Vue from 'vue'
import AppComponent from './index.vue'
Vue.component('app-component', AppComponent)

import { Icon, Input, Dialog, Form, Button, FormItem } from 'element-ui'

Vue.use(Icon)
  .use(Input)
  .use(Dialog)
  .use(Form)
  .use(Button)
  .use(FormItem)

new Vue({
  el: '#app',
  render: createElement => {
    return createElement(AppComponent)
  }
})

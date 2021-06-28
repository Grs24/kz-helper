import Vue from 'vue'
import AppComponent from './App/popup.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './globa.css'
Vue.component('app-component', AppComponent)

import { Message, MessageBox, Icon, Input } from 'element-ui'

Vue.use(Icon).use(Input)

new Vue({
  el: '#app',
  render: createElement => {
    return createElement(AppComponent)
  }
})

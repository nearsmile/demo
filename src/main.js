import Vue from 'vue'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
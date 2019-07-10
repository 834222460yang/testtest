import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/flexble.js'
import axios from 'axios'
Vue.prototype.$axios=axios;
Vue.config.productionTip = false
import "./module/module"
import "./module/api"
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

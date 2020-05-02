import Vue from 'vue'
import VueRouter from 'vue-router'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';


import Index from './components/Index'
import Login from './components/Login'
import Register from './components/Register'
import Upload from './components/Upload'
import Detail from './components/Detail'
import Message from './components/Message'

// Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Antd)
// Vue.use(VueRouter)

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Index },
  { path: '/register', component: Register },
  { path: '/upload', component: Upload },
  { path: '/view', component: Detail },
  { path: '/message', component: Message },
]

const router = new VueRouter({
  mode: "history",
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

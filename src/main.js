import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import './styles/main.scss'

import DefaultButton from './components/DefaultButton.vue'
import DefaultContainer from './components/DefaultContainer.vue'
import PageTitle from './components/PageTitle.vue'
Vue.component('DefaultButton', DefaultButton)
Vue.component('DefaultContainer', DefaultContainer)
Vue.component('PageTitle', PageTitle)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

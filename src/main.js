import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

// uncomment the below line if I want to set custom scss values
// import './custom.scss'
new Vue({
  render: (h) => h(App),
}).$mount('#app');

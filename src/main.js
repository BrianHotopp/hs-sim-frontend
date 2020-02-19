import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import store from './store';

library.add(faEdit);
Vue.component('font-awesome-icon', FontAwesomeIcon);
// Install BootstrapVue
Vue.use(BootstrapVue);

Vue.config.productionTip = false;


// uncomment the below line if I want to set custom scss values
// import './custom.scss'
new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

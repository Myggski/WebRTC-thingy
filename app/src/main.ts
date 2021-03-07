import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Vue } from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'reflect-metadata';
import './styles/main.scss';
import './core/plugins/font-awesome';

createApp(App)
  .use(store)
  .use(router)
  .component('fa', FontAwesomeIcon)
  .mount('#app');

Vue.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

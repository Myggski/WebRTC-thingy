import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Vue } from 'vue-class-component';
import './styles/main.scss';

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');

Vue.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

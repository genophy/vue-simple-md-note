import axios                              from 'axios';
import ElementUI                          from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue                                from 'vue';
import App                                from './App.vue';
import * as filters                       from './filters';
import router                             from './router';
import store                              from './store';
import {get, getWithFn, post, postWithFn} from './util/HttpClientHelper';

Vue.config.productionTip = false;
Vue.use(ElementUI);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})

Vue.prototype.$axios = axios;

Vue.prototype.$postWithFn = postWithFn;
Vue.prototype.$getWithFn = getWithFn;
Vue.prototype.$post = post;
Vue.prototype.$get = get;

new Vue({
  router,
  store,
  render: h => h(App),
}).
$mount('#app');

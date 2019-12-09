import Vue from 'vue'
import store from './store'
import App from './App'
import Api from '@/common/api/index.js';
import Ui from '@/common/ui.js';
import Storage from '@/common/storage.js';
import Core from '@/common/core.js';
import filters from '@/common/filters.js';

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$http = Api;
Vue.prototype.$ui = Ui;
Vue.prototype.$core = Object.assign({}, Core, Storage);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
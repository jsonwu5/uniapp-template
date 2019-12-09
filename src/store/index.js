import Vue from 'vue';
import Vuex from 'vuex';
import Storage from '@/common/storage.js';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		// token持久化缓存
		token: Storage.getStorageSync('token') || ''
	},
	getters: {
	},
	mutations: {
	},
	actions: {
	}
})

export default store

import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/Api';

//modules
import forks from './modules/forks';
Vue.use(Vuex);

let Store = new Vuex.Store({
  state: {},
  modules: {
    forks
  }
});

Store.$axios = axios;
export default Store;

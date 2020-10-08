import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/analytics'

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAQ__K8PLP3lvNq2PVAAdKs8mKPUjSrdzQ",
  authDomain: "vue-4-3b8f4.firebaseapp.com",
  databaseURL: "https://vue-4-3b8f4.firebaseio.com",
  projectId: "vue-4-3b8f4",
  storageBucket: "vue-4-3b8f4.appspot.com",
  messagingSenderId: "4241067226",
  appId: "1:4241067226:web:7e84b5b231ba50929f69e3",
  measurementId: "G-ZGLDXW6T2S"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

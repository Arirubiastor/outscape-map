import Vue from 'vue'
// import VueResource from 'vue-resource' // To access HTTP
import VueRouter from 'vue-router';
import App from './App.vue'
import axios from 'axios' // To access HTTP
import * as firebase from 'firebase'
import { routes } from './routes';// routes test udemy!
import store from "./store";
// import regeneratorRuntime from "regenerator-runtime";
import 'leaflet/dist/leaflet.css'; // i gues for leaflet search

axios.defaults.baseURL = 'https://pyet2m3rzl.execute-api.us-east-1.amazonaws.com'

export const eventBus = new Vue();

// Vue.use(VueResource); // Access to HTTP
Vue.use(VueRouter);// routes test udemy!

const router = new VueRouter({
  routes,
  mode: 'history',
  // base: process.env.BASE_URL
});

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAEfGuGOpKyVpSl7_VJJZiSWfEGWJYZ_Xo",
    authDomain: "outscape-map-5f64d.firebaseapp.com",
    databaseURL: "https://outscape-map-5f64d.firebaseio.com",
    projectId: "outscape-map-5f64d",
    storageBucket: "outscape-map-5f64d.appspot.com",
    messagingSenderId: "957053898979",
    appId: "1:957053898979:web:57a23e18326e75fb63b5d6",
    measurementId: "G-Y28RC6RGE5"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});


router.beforeEach((to, from, next) => {

  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }

});

firebase.auth().onAuthStateChanged(function (user) {

new Vue({
  el: '#app',
  router, // routes test udemy!
  store,
  render: h => h(App)
})

});

// import { Icon } from 'leaflet';

// delete Icon.Default.prototype._getIconUrl;
// Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });
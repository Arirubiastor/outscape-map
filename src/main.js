import Vue from 'vue'
import VueResource from 'vue-resource' // To access HTTP
import App from './App.vue'
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

Vue.use(VueResource); // Access to HTTP

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  el: '#app',
  render: h => h(App)
})

import Vue from 'vue'
import VueResource from 'vue-resource' // To access HTTP
import App from './App.vue'
import Home from './Home.vue';

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

import { Icon } from 'leaflet';

Vue.use(VueResource); // Access to HTTP


Vue.component('app-map', Home);

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

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

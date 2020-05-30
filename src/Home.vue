<template>
<body>
  <l-map class="map" ref="map" :min-zoom="minZoom" :crs="crs">
    <l-tile-layer :url="url"></l-tile-layer>
    <!-- <l-image-overlay :url="url" :bounds="bounds" /> -->
    <l-grid-layer :tile-component="tileComponent"></l-grid-layer>
    <l-marker v-for="star in stars" :key="star.rowNumber" :lat-lng="star" >
      <l-icon :icon-size="[25, 25]" icon-url="https://image.flaticon.com/icons/png/512/304/304378.png"></l-icon>
      <!-- <l-icon :icon-size="[32, 37]" icon-url="/images/star.png"></l-icon> -->
      <l-popup class="popup">
        Name: {{ star.name }}<br>
        Status: {{ star.status }}<br>
        Longitud: {{ star.lng }}<br>
        Latitud: {{ star.lat }}<br>
        Number of Planets: {{ star.planets }}<br>
        Local Population: {{ star.local }}<br>
        System Owner: {{ star.owner }}<br>
        System Within Radar Range of: {{ star.cosest }}<br>
        Radar: {{ star.radar }}<br>
        Comments: {{ star.comments }}
      </l-popup>
    </l-marker>
    <!-- <l-polyline :lat-lngs="travel" /> -->
  </l-map>
</body>
</template>

<script>
import L from "leaflet";
import { CRS } from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LImageOverlay,
  LPopup,
  LPolyline,
  LIcon,
  LGridLayer
} from "vue2-leaflet";

export default {
  name: "OutScapeMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LImageOverlay,
    LPopup,
    LPolyline,
    LIcon,
    LGridLayer
  },

  data() {
    return {
      url: 'https://wallpaperboat.com/wp-content/uploads/2019/10/high-resolution-black-background-08.jpg',
      bounds: [
        // [-26.5, -25],
        // [1021.5, 1023]
        [-2600, -2700],
        [1000, 3000]
      ],
      minZoom: 0.5,
      crs: L.CRS.Simple,
      stars: [],
      // icon: {
      //   iconUrl: "/star.png",
      //   iconSize: [32, 37],
      //   iconAnchor: [16, 37]
      //   },
      tileComponent: {
        name: 'tile-component',
        props: {
          coords: {
            type: Object,
            required: true
          }
        },
        template: '<div style="outline:1px solid #38c9d386; height:40rem; width:40rem;"></div>'
      }
    };
  },

  mounted() {
    this.$refs.map.mapObject.setView([-500, -155], 3);

    // this.$refs.map.mapObject.fitBounds(bounds);

    this.$http.get('https://amupvtj3f9.execute-api.us-east-1.amazonaws.com/test/outscapedata')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const resultArray = [];
        for (let key in data) {
          resultArray.push(data[key]);
        }
        this.stars = resultArray;
      });
  },
  methods: {

  }
};
</script>

<style scoped>
.map {
  height: 95vh;
}

.popup {
  display: flexbox;
  flex-direction: column;
  /* color: #38c9d386; */
}

.container {
  margin-top: 50px;
}

.form {
  display: flex;
  flex-direction: column;
}
</style>

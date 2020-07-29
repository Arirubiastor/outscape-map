<template>
<body>
  <!-- <v-autocomplete :stars="stars" v-model="star" :get-label="getLabel" :component-star='template' @update-stars="updateStars">
    <h1>Este es mi auto-complete</h1>
  </v-autocomplete> -->
  <!-- <div>was?</div> -->

  <!-- <leaflet-search></leaflet-search> -->

  <!-- <button class="search-by-name" @click="StarsData()">Search by Name</button> -->

  <navbar></navbar>

  <div>
    <li v-for="(message, index) in messageList" :item="message" :key="index">{{ message }}</li>
  </div>
  <l-map class="map" ref="map" :min-zoom="minZoom" :crs="crs">
    <l-tile-layer :url="url"></l-tile-layer>

    <!-- <l-grid-layer class="grid" :tile-component="tileComponent"></l-grid-layer> -->
    
    <!-- STARS MAP WITH ORIGINAL COORDS (wrong one, it has to be rotated 180 deg) -->
    <!-- <l-marker v-for="star in stars" :key="star.id" :lat-lng="star">
      <div v-if="star.status==='A'">
        <l-icon id="yellow-icon" :icon-size="[25, 25]" icon-url="https://image.flaticon.com/icons/svg/304/304378.svg"></l-icon>
      </div>
      <div v-else-if="star.status==='E'">
        <l-icon id="red-icon" :icon-size="[25, 25]" icon-url="https://image.flaticon.com/icons/svg/304/304341.svg"></l-icon>
      </div>
      <div v-else-if="star.status==='N'">
        <l-icon id="blue-icon" :icon-size="[25, 25]" icon-url="https://image.flaticon.com/icons/svg/304/304267.svg"></l-icon>
      </div>
      <div v-else>
        <l-icon id="green-icon" :icon-size="[25, 25]" icon-url="https://image.flaticon.com/icons/svg/304/304304.svg"></l-icon>
      </div>
      <l-popup class="popup">
        <em class="popup-bold">Name: </em>{{ star.name }}<br />
        <em class="popup-bold">Longitud: </em>{{ star.lng }}<br />
        <em class="popup-bold">Latitud: </em>{{ star.lat }}<br />
        <em class="popup-bold">Number of Planets: </em>{{ star.planetCount }}<br />
        <em class="popup-bold">Local Population 1: </em>{{ star.localPop1 }}<br />
        <em class="popup-bold">Planet 1: </em>{{ star.planet1 }}<br />
        <em class="popup-bold">Local Population 2: </em>{{ star.localPop2 }}<br />
        <em class="popup-bold">Planet 2: </em>{{ star.planet2 }}<br />
        <em class="popup-bold">Local Population 3:</em>{{ star.localPop3 }}<br />
        <em class="popup-bold">Planet 3: </em>{{ star.planet3 }}<br />
        <em class="popup-bold">System Owner: </em>{{ star.systemOwner }}<br />
        <em class="popup-bold">Radar: </em>{{ star.radar }}<br />
        <em class="popup-bold">Comments: </em>{{ star.comments }}<br />
        <em class="popup-bold">Added by: </em>{{ star.addedBy }}<br />
        <em class="popup-bold">Date: </em>{{ star.date }}<br />
        <em class="popup-bold">Status: </em>{{ star.status }}<br />
      </l-popup>
    </l-marker> -->

    <!-- INVERTED COORDS NEW STARS MAP -->
    <!-- <l-menu @inputData="updateMessage" v-bind:stars="stars"></l-menu> -->
    <l-menu v-bind:stars="stars"></l-menu>
    <l-layer-group>
      <l-marker v-for="(newCoords, i) in InvertedCoords" :key="i" :lat-lng="newCoords">
      <div v-if="stars[i].status === 'ALLY'">
        <l-icon
          id="yellow-icon"
          :icon-size="[25, 25]"
          icon-url="https://app-html-comunicado.s3-us-west-2.amazonaws.com/image/yellow-star.png"
        ></l-icon>
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      </div>
      <div v-else-if="stars[i].status === 'ENEMY'">
        <l-icon
          id="red-icon"
          :icon-size="[25, 25]" 
          icon-url="https://app-html-comunicado.s3-us-west-2.amazonaws.com/image/red-star.png"
        ></l-icon>
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      </div>
      <div v-else-if="stars[i].status === 'NEUTRAL'">
        <l-icon
          id="blue-icon"
          :icon-size="[25, 25]"
          icon-url="https://app-html-comunicado.s3-us-west-2.amazonaws.com/image/blue-star.png"
        ></l-icon>
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      </div>
      <div v-else-if="stars[i].status === 'NAP'">
        <l-icon
          id="green-icon"
          :icon-size="[25, 25]"
          icon-url="https://app-html-comunicado.s3-us-west-2.amazonaws.com/image/green-star.png"
        ></l-icon>
      </div>
      <div v-else>
        <l-icon 
          id="white-icon"
          :icon-size="[25, 25]"
          icon-url="https://app-html-comunicado.s3-us-west-2.amazonaws.com/image/white-star.png"
        ></l-icon>
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      </div>
      <!-- <l-icon :icon-size="[32, 37]" icon-url="/images/star.png"></l-icon> -->
      <l-popup class="popup">
        <em class="popup-bold">Id: </em>{{ newCoords.id }}<br />
        <!-- Lat: {{ newCoords.lat }}, Lng: {{ newCoords.lng }},<br> -->
        <em class="popup-bold">Name: </em>{{ stars[i].name }}<br />
        <em class="popup-bold">Longitud: </em>{{ stars[i].lng }}<br />
        <em class="popup-bold">Latitud: </em>{{ stars[i].lat }}<br />
        <em class="popup-bold">Number of Planets: </em>{{ stars[i].planetCount }}<br />
        <em class="popup-bold">Local Population 1: </em>{{ stars[i].localPop1 }}<br />
        <em class="popup-bold">Planet 1: </em>{{ stars[i].planet1 }}<br />
        <em class="popup-bold">Local Population 2: </em>{{ stars[i].localPop2 }}<br />
        <em class="popup-bold">Planet 2: </em>{{ stars[i].planet2 }}<br />
        <em class="popup-bold">Local Population 3:</em>{{ stars[i].localPop3 }}<br />
        <em class="popup-bold">Planet 3: </em>{{ stars[i].planet3 }}<br />
        <em class="popup-bold">System Owner: </em>{{ stars[i].systemOwner }}<br />
        <em class="popup-bold">Radar: </em>{{ stars[i].radar }}<br />
        <em class="popup-bold">Comments: </em>{{ stars[i].comments }}<br />
        <em class="popup-bold">Added by: </em>{{ stars[i].addedBy }}<br />
        <em class="popup-bold">Date: </em>{{ stars[i].date }}<br />
        <em class="popup-bold">Status: </em>{{ stars[i].status }}<br />
        <!-- TEST: {{ InvertedCoords }} -->
      </l-popup>
    </l-marker>
    </l-layer-group>
    
    <div v-for="(newCoords, i) in InvertedCoords" :key="'A' + i"><!-- 'A' + i to avoid duplicate id -->
      <l-circle v-if="stars[i].radar === '1'"
        :lat-lng="newCoords" 
        :radius="radar.radius1"
        :color="radar.color"
        :fillColor="radar.fillColor"
        :weight="radar.weight">
      </l-circle>
      <l-circle v-if="stars[i].radar === '1Har'"
        :lat-lng="newCoords" 
        :radius="radar.radius1Har"
        :color="radar.color"
        :fillColor="radar.fillColor"
        :weight="radar.weight">
      </l-circle>
      <l-circle v-if="stars[i].radar === '2Har'"
        :lat-lng="newCoords" 
        :radius="radar.radius2Har"
        :color="radar.color"
        :fillColor="radar.fillColor"
        :weight="radar.weight">
      </l-circle>
    </div>
  </l-map>
</body>
</template>

<script>
import axios from 'axios';
import L from "leaflet";
import { CRS } from "leaflet";
import LMenu from "./Menu";
import { mapGetters } from "vuex";
import Navbar from './Navbar';
// import ItemTemplate from './ItemTemplate.vue';
// import GridTemplate from './GridTemplate.vue';
import { LeafletSearch } from 'leaflet-search';
import { eventBus } from '../main.js'
import {
  LMap,
  LTileLayer,
  LMarker,
  LImageOverlay,
  LPopup,
  LPolyline,
  LIcon,
  LGridLayer,
  LCircle,
  LLayerGroup
} from "vue2-leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LImageOverlay,
    LPopup,
    LPolyline,
    LIcon,
    LGridLayer,
    LCircle,
    LeafletSearch,
    LLayerGroup,
    LMenu,
    Navbar
  },

  props: {
    msg: {
      type: String
    }
  },

  data() {
    return {
      url: "https://wallpaperboat.com/wp-content/uploads/2019/10/high-resolution-black-background-08.jpg",
      bounds: [
        [-2600, -2700],
        [1000, 3000]
      ],
      minZoom: 0,
      crs: L.CRS.Simple,
      stars: [],
      // newCoords: [],
      // template: ItemTemplate,
      messageList: [],
      icon: {
        iconUrl: "https://image.flaticon.com/icons/png/512/304/304378.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      },
      radar: {
        center: [652, 10],
        radius1: 35,
        radius2: 10,
        radius3: 15,
        radius1Har: 35,
        radius2Har: 35,
        radius3Har: 30,
        color: '#6fcaee52',
        fillColor: '#6fcaee',
        weight: 1.5
      },
      // tileComponent: GridTemplate
      // tileComponent: {
      //   name: "tile-component",
      //   props: {
      //     coords: {
      //       type: Object,
      //       required: true
      //     }
      //   },
      //   template: '<div style="outline:1px solid #38c9d386; height:40rem; width:40rem;"></div>'
      // }
    };
  },
  computed: {
    InvertedCoords() {
      var newArraw = [];
      for (let i = 0; i < this.stars.length; i++) {
        newArraw[i] = {
          id: i + 2,
          lat: this.stars[i].lat * -1,
          lng: this.stars[i].lng * -1
        };
      }
      return newArraw;
      console.log(newArraw);
    },

    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })

  },

  watch: {
    msg: function() {
      this.messageList.push(this.msg);
    }
  },

  mounted() {
    // this.$refs.map.mapObject.setView([-552, -40], 1);
    this.$refs.map.mapObject.setView([552, 40], 1); // setView coords for the inverted coordinates (correct!)

    // this.$refs.map.mapObject.fitBounds(bounds);
  },

  created() {
    // VUE-RESOURSE
    // this.$http.get("https://pyet2m3rzl.execute-api.us-east-1.amazonaws.com/test/outscapebackend")
    //     .then(response => {
    //       return response.json();
    //     })
    //   .then(data => {
    //     const resultArray = [];
    //     for (let key in data) {
    //       resultArray.push(data[key]);
    //     }
    //     this.stars = resultArray;
    //   });
    
    // AXIOS
    axios.get('/test/outscapebackend')
      .then(response => {
        // console.log(response) // do not delete, useful for testing
        const data = response.data
        const resultArray = []
        for (let key in data) {
          resultArray.push(data[key])
        }
        // console.log(resultArray) // do not delete, useful for testing
        this.stars = resultArray
      })
      .catch(error => console.log(error))

  // SEARCH.CONTROL PLUGIN
    // var markersArray;
    
    // var hydMarker = new L.Marker([17.385044, 78.486671]);
    // var vskpMarker = new L.Marker([17.686816, 83.218482]);
    // var vjwdMarker = new L.Marker([16.506174, 80.648015]);


    // someMarker.addTo(someLayerGroup); // add markers to a Leaflet layer group

    // var searchLayer = new L.layerGroup([hydMarker, vskpMarker, vjwdMarker]).addTo(this.$refs.map.mapObject);
    // L.marker().addTo(searchLayer); // add markers to a Leaflet layer group

//     for (i = 0; i < InvertedCoords.length; i++) {
//     marker = L.marker([InvertedCoords[i][0], InvertedCoords[i][1]]);
//     layerGroup.addLayer(marker);

//     var overlay = {'markers': layerGroup};
//     L.control.layers(null, overlay).addTo(map);
// }
    
    // this.$refs.map.mapObject.addLayer(searchLayer);

    // const controlSearch = new L.Control.Search({
    //   layer: searchLayer,
    //   propertyName: 	'name',
    //   propertyLoc: ['lat','lng'],
    //   marker: L.circleMarker([0, 0], { radius: 30 }),
    //   autoCollapse: true,
    //   autoType: true,
    //   minLength: 2,
    //   textPlaceholder: 'search star by name...'
  //     inicial: false,
  //     zoom: 11,
  //     marker: false,
  // });
  // this.$refs.map.mapObject.addControl(controlSearch); //descomentar
  //   map.addControl(controlSearch);
  },

  methods: {
    inverted() {
      for (let i = 0; i < this.newArraw.length; i++) {
        console.log(this.newArraw[i]);
        return this.newArraw[i];
      }
    },
    updateStars(text) {
      this.$http.get("https://pyet2m3rzl.execute-api.us-east-1.amazonaws.com/test/outscapebackend")
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
    // StarsData() {
    //   eventBus.$emit('i-got-clicked', this.stars)
    // },
    
  }
};
</script>

<style scoped>
@import "~leaflet-search/src/leaflet-search.css";

/* .search-by-name {
  cursor: pointer;
  position: absolute;
  z-index: 501;
  margin-right: 17px;
  right: 0;
} */

.leaflet-top {
  top: 20px;
}

.alert-success {
  height: 20px;
  position: absolute;
  z-index: 500;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: white;
  margin-top: 4px;
  margin-left: 80px;
  font-size: 14px;
  font-family: Arial;
  font-weight: normal;
}

.map {
  height: 95vh;
  margin-top: 5px;
}

.popup {
  display: flexbox;
  flex-direction: column;
  /* color: #38c9d386; */
}

.popup-bold {
  font-weight: bold;
  font-style: normal;
}

.container {
  margin-top: 50px;
}

.grid {
  outline: 1px solid #38c9d386;
  height: 40rem;
  width: 40rem;
}
</style>

<template>
<body>
  <!-- <v-autocomplete :stars="stars" v-model="star" :get-label="getLabel" :component-star='template' @update-stars="updateStars">
    <h1>Este es mi auto-complete</h1>
  </v-autocomplete> -->
  <!-- <div>was?</div> -->
  <button class="search-by-name" @click="StarsData()">Search by Name</button>
  <div>
    <li v-for="(message, index) in messageList" :item="message" :key="index">{{ message }}</li>
  </div>
  <l-map class="map" ref="map" :min-zoom="minZoom" :crs="crs">
    <l-tile-layer :url="url"></l-tile-layer>
    <!-- <l-image-overlay :url="url" :bounds="bounds" /> -->
    <l-grid-layer class="grid" :tile-component="tileComponent"></l-grid-layer>
    
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
    <l-marker v-for="(newCoords, i) in InvertedCoords" :key="i" :lat-lng="newCoords">
      <div v-if="stars[i].status === 'ALLY'">
        <l-icon
          id="yellow-icon"
          :icon-size="[25, 25]"
          icon-url="https://image.flaticon.com/icons/svg/304/304378.svg"
        ></l-icon>
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      </div>
      <div v-else-if="stars[i].status === 'ENEMY'">
        <l-icon
          id="red-icon"
          :icon-size="[25, 25]"
          icon-url="https://image.flaticon.com/icons/svg/304/304341.svg"
        ></l-icon>
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      </div>
      <div v-else-if="stars[i].status === 'NEUTRAL'">
        <l-icon
          id="blue-icon"
          :icon-size="[25, 25]"
          icon-url="https://image.flaticon.com/icons/svg/304/304267.svg"
        ></l-icon>
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      </div>
      <div v-else>
        <l-icon 
          id="green-icon"
          :icon-size="[25, 25]"
          icon-url="https://image.flaticon.com/icons/svg/304/304304.svg"
        ></l-icon>
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      </div>
      <!-- <l-icon :icon-size="[32, 37]" icon-url="/images/star.png"></l-icon> -->
      <l-popup class="popup">
        <em class="popup-bold">Id: </em>{{ newCoords.id }}<br />
        <!-- Lat: {{ newCoords.lat }},
        Lng: {{ newCoords.lng }},<br> -->
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
import L from "leaflet";
import { CRS } from "leaflet";
// import ItemTemplate from './ItemTemplate.vue';
// import GridTemplate from './GridTemplate.vue';
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
  LCircle
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
    LCircle
  },

  props: {
    msg: {
      type: String
    }
  },

  data() {
    return {
      url:
        "https://wallpaperboat.com/wp-content/uploads/2019/10/high-resolution-black-background-08.jpg",
      bounds: [
        [-2600, -2700],
        [1000, 3000]
      ],
      minZoom: 0.5,
      crs: L.CRS.Simple,
      star: {"id":2,"name":"ABBERET 2","lng":"-242","lat":"-544","planetCount":"","planet1":"","localPop2":"","planet2":"","localPop3":"","planet3":"","systemOwner":"MasterMantis","radar":"","comments":"","addedBy":"AC","date":"04.05.2020","status":"NEUTRAL"},
      stars: [],
      searchStar: "",
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
      tileComponent: {
        name: "tile-component",
        props: {
          coords: {
            type: Object,
            required: true
          }
        },
        template: '<div style="outline:1px solid #38c9d386; height:40rem; width:40rem;"></div>'
        // GridTemplate
      }
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
    filteredStars: function() {
      return this.stars.filter((star) => {
        return star.name.match(this.search);
      })
    }
  },

  watch: {
    msg: function() {
      this.messageList.push(this.msg);
    }
  },

  mounted() {
    // this.$refs.map.mapObject.setView([-552, -40], 1);
    this.$refs.map.mapObject.setView([552, 40], 1); // For the inverted coordinates (correct!)

    // this.$refs.map.mapObject.fitBounds(bounds);

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

  methods: {
    inverted() {
      for (let i = 0; i < this.newArraw.length; i++) {
        console.log(this.newArraw[i]);
        return this.newArraw[i];
      }
    },
    getLabel(star) {
      return star.name
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
    StarsData() {
      eventBus.$emit('i-got-clicked', this.stars)
    }
  }
};
</script>

<style scoped>
.search-by-name {
  cursor: pointer;
  position: absolute;
  z-index: 500;
  /* margin-left: 755px; */
  margin-right: 17px;
  /* text-align: right; */
  right: 0;
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

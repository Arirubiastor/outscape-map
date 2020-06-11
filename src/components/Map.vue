<template>
<body>
  <div>
    <li v-for="(message, index) in messageList" :item="message" :key="index">{{ message }}</li>
  </div>
  <l-map class="map" ref="map" :min-zoom="minZoom" :crs="crs">
    <l-tile-layer :url="url"></l-tile-layer>
    <!-- <l-image-overlay :url="url" :bounds="bounds" /> -->
    <l-grid-layer class="grid" :tile-component="tileComponent"></l-grid-layer>
    <l-marker v-for="star in stars" :key="star.id" :lat-lng="star">
      <div v-if="star.status==='A'">
        <l-icon
          id="yellow-icon"
          :icon-size="[25, 25]"
          icon-url="https://image.flaticon.com/icons/svg/304/304378.svg">
          </l-icon>
          <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      </div>
      <div v-else-if="star.status==='E'">
        <l-icon
          id="red-icon"
          :icon-size="[25, 25]"
          icon-url="https://image.flaticon.com/icons/svg/304/304341.svg"
        ></l-icon>
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      </div>
      <div v-else-if="star.status==='N'">
        <l-icon
          id="blue-icon"
          :icon-size="[25, 25]"
          icon-url="https://image.flaticon.com/icons/svg/304/304267.svg">
          </l-icon>
          <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      </div>
      <div v-else>
        <l-icon
          id="green-icon"
          :icon-size="[25, 25]"
          icon-url="https://image.flaticon.com/icons/svg/304/304304.svg">
          </l-icon>
          <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
      </div>
      <!-- <l-icon :icon-size="[32, 37]" icon-url="/images/star.png"></l-icon> -->
      <l-popup class="popup">
        <em class="popup-bold">Name:</em>{{ star.name }}
        <br />
        <em class="popup-bold">Longitud:</em>{{ star.lng }}
        <br />
        <em class="popup-bold">Latitud:</em>{{ star.lat }}
        <br />
        <em class="popup-bold">Number of Planets:</em>{{ star.planetCount }}
        <br />
        <em class="popup-bold">Local Population 1:</em>{{ star.localPop1 }}
        <br />
        <em class="popup-bold">Planet 1:</em>{{ star.planet1 }}
        <br />
        <em class="popup-bold">Local Population 2:</em>{{ star.localPop2 }}
        <br />
        <em class="popup-bold">Planet 2:</em>{{ star.planet2 }}
        <br />
        <em class="popup-bold">Local Population 3:</em>{{ star.localPop3 }}
        <br />
        <em class="popup-bold">Planet 3:</em>{{ star.planet3 }}
        <br />
        <em class="popup-bold">System Owner:</em>{{ star.systemOwner }}
        <br />
        <em class="popup-bold">Radar:</em>{{ star.radar }}
        <br />
        <em class="popup-bold">Comments:</em>{{ star.comments }}
        <br />
        <em class="popup-bold">Added by:</em>{{ star.addedBy }}
        <br />
        <em class="popup-bold">Date:</em>{{ star.date }}
        <br />
        <em class="popup-bold">Status:</em>{{ star.status }}
        <br />
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
  name: "Map",
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
      stars: [],
      messageList: [],
      icon: {
        iconUrl: "https://image.flaticon.com/icons/png/512/304/304378.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      },
      tileComponent: {
        name: "tile-component",
        props: {
          coords: {
            type: Object,
            required: true
          }
        },
        template:
          '<div style="outline:1px solid #38c9d386; height:40rem; width:40rem;"></div>'
      }
    };
  },

  watch: {
    msg: function() {
      this.messageList.push(this.msg);
    }
  },

  mounted() {
    this.$refs.map.mapObject.setView([-552, -40], 1);

    // this.$refs.map.mapObject.fitBounds(bounds);

    this.$http
      .get(
        // "https://amupvtj3f9.execute-api.us-east-1.amazonaws.com/test/outscapedata"
        "https://pyet2m3rzl.execute-api.us-east-1.amazonaws.com/test/outscapebackend"
      )
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

    LTileLayer.InvertedY = LTileLayer.extend({
      getTileUrl: function(tilecoords) {
        tilecoords.y = -tilecoords.y;
        return LTileLayer.prototype.getTileUrl.call(this, tilecoords);
      }
    });

    var layer = new LTileLayer.InvertedY(
      "https://wallpaperboat.com/wp-content/uploads/2019/10/high-resolution-black-background-08.jpg"
    );
  },

  methods: {}
};
</script>

<style scoped>
.map {
  height: 95vh;
  margin-top: 0px;
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

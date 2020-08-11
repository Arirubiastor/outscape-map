<template>
<body>
  <!-- put: {{ temporalUpdatedStar }}<br> -->
  <!-- selected id: {{ temporalValues.id }}<br> -->
  <div class="hide-test">temp values: {{ temporalValues }}, range: {{ rangeFormat }}, values: {{ objectToArray }}, deleted id: {{ deleteID }}</div>
  <div class="main-menu">
    <div>
      <button class="add-button" @click="toggleAdd">Add Star</button>
      <form class="form_add-star" v-if="active">
        <label>Name:</label>
        <input required type="text" id="name" class="form-control required-input" v-model.lazy="newStar.body.NAME">
        <label>Longitud:</label>
        <input required type="number" id="lng" class="form-control required-input" v-model.lazy="newStar.body.LONG">
        <label>Latitud:</label>
        <input
          required
          type="number"
          id="lat"
          class="form-control required-input"
          v-model.lazy="newStar.body.LAT"
        >
        <label>Number of Planets:</label>
        <select type="number" id="planets" class="form-control" v-model="newStar.body.PLANETCOUNT">
          <option
            v-for="optionPlanetCount in optionsPlanetCount"
            :key="optionPlanetCount"
          >{{ optionPlanetCount }}</option>
        </select>
        <label>Local Population 1:</label>
        <select type="text" id="local-pop1" class="form-control" v-model="newStar.body.LOCALPOP1">
          <option
            v-for="optionLocalPop in optionsLocalPop"
            :key="optionLocalPop"
          >{{ optionLocalPop }}</option>
        </select>
        <label>Planet 1:</label>
        <input type="text" id="planet1" class="form-control" v-model.lazy="newStar.body.PLANET1" />
        <label>Local Population 2:</label>
        <select type="text" id="local-pop2" class="form-control" v-model="newStar.body.LOCALPOP2">
          <option
            v-for="optionLocalPop in optionsLocalPop"
            :key="optionLocalPop"
          >{{ optionLocalPop }}</option>
        </select>
        <label>Planet 2:</label>
        <input type="text" id="planet2" class="form-control" v-model.lazy="newStar.body.PLANET2" />
        <label>Local Population 3:</label>
        <select type="text" id="local-pop3" class="form-control" v-model="newStar.body.LOCALPOP3">
          <option
            v-for="optionLocalPop in optionsLocalPop"
            :key="optionLocalPop"
          >{{ optionLocalPop }}</option>
        </select>
        <label>Planet 3:</label>
        <input type="text" id="planet3" class="form-control" v-model.lazy="newStar.body.PLANET3" />
        <label>System Owner:</label>
        <input type="text" id="owner" class="form-control" v-model.lazy="newStar.body.SYSTEMOWNER" />
        <label>Radar:</label>
        <select type="number" id="radar" class="form-control" v-model="newStar.body.RADAR">
          <option v-for="optionRadar in optionsRadar" :key="optionRadar">{{ optionRadar }}</option>
        </select>
        <label>Comments:</label>
        <textarea type="text" id="comments" class="form-control" v-model.lazy="newStar.body.COMMENTS" />
        <label>Added by:</label>
        <input
          required
          type="text"
          id="added-by"
          class="form-control required-input"
          v-model.lazy="newStar.body.ADDEDBY"
        >
        <label>Date:</label>
        <input
          required
          type="date"
          min="2019-01-01"
          max="2030-12-31"
          id="date"
          class="form-control required-input"
          v-model="newStar.body.DATE"
        >
        <label>Status:</label>
        <select type="text" id="status" class="form-control" v-model="newStar.body.STATUS">
          <option v-for="optioStatus in optiosStatus" :key="optioStatus">{{ optioStatus }}</option>
        </select>
        <br>
        <input class="submit-button" type="submit" value="Sumbit" @click.prevent="submit" v-if="!submitted" :class="{ disabled: isDisabled }" :disabled="isDisabled">
        <div class="submitted-form" v-if="submitted">
          <h3 style="text-align:center; font-size:16px; margin-top:0">You added the star {{ newStar.body.NAME }}</h3>
          <button class="close-button" @click="close">Close</button>
        </div>
        <!-- <div>Your data: {{ newStar }}</div>
        <div>New Lat: {{ LATNEG }}</div>
        <div>Lat Neg: {{ latNeg }}</div>-->
      </form>
    </div>
    <!-- <div>
      <button>Delete Star</button>
    </div>-->
    <div>
      <button class="edit-button" @click="toggleUpdate">Edit Star</button>
      <form class="form_add-star" v-if="isActive">
        <!-- <label>Id:</label>
        <input type="text" id="starId" class="form-control" placeholder="" v-model="temporalUpdatedStar.body.range">-->
        <!-- <label>Name:</label>
        <select required type="text" id="nameSearch" class="form-control" v-model="temporalValues">
          <option v-for="starMenu in starsMenu" :key="starMenu.id" :value="starMenu" @change="selectedStarName($event)">
            {{ starMenu.name }}
          </option>
        </select> -->
        <label>Name:</label>
        <select required type="text" id="nameSearch" class="form-control" v-model="temporalValues">
          <option v-for="star in sortedArray" :key="star.id" :value="star" v-bind:stars="stars">
            {{ star.name }}
          </option>
        </select>
        <!-- <label>Name:</label>
        <input required type="text" id="name" class="form-control" v-model="temporalValues.name">-->
        <label>Longitud:</label>
        <input required type="number" id="lng" class="form-control required-input" v-model="temporalValues.lng">
        <!-- <label>Latitud:</label>
        <input required type="number" id="lat" class="form-control" v-model="temporalUpdatedStar.body.values[2]" />-->
        <label>Latitud:</label>
        <input required type="number" id="lat" class="form-control required-input" v-model="temporalValues.lat">
        <label>Number of Planets:</label>
        <select type="number" id="planets" class="form-control" v-model="temporalValues.planetCount">
          <option v-for="optionPlanetCount in optionsPlanetCount" :key="optionPlanetCount">
          {{ optionPlanetCount }}
          </option>
        </select>
        <label>Local Population 1:</label>
        <select type="text" id="local-pop1" class="form-control" v-model="temporalValues.localPop1">
          <option v-for="optionLocalPop in optionsLocalPop" :key="optionLocalPop">
            {{ optionLocalPop }}
          </option>
        </select>
        <label>Planet 1:</label>
        <input type="text" id="planet1" class="form-control" v-model.lazy="temporalValues.planet1">
        <label>Local Population 2:</label>
        <select type="text" id="local-pop2" class="form-control" v-model="temporalValues.localPop2">
          <option v-for="optionLocalPop in optionsLocalPop" :key="optionLocalPop">
            {{ optionLocalPop }}
          </option>
        </select>
        <label>Planet 2:</label>
        <input type="text" id="planet2" class="form-control" v-model.lazy="temporalValues.planet2">
        <label>Local Population 3:</label>
        <select type="text" id="local-pop3" class="form-control" v-model="temporalValues.localPop3">
          <option v-for="optionLocalPop in optionsLocalPop" :key="optionLocalPop">
            {{ optionLocalPop }}
          </option>
        </select>
        <label>Planet 3:</label>
        <input type="text" id="planet3" class="form-control" v-model.lazy="temporalValues.planet3">
        <label>System Owner:</label>
        <input type="text" id="owner" class="form-control" v-model.lazy="temporalValues.systemOwner">
        <label>Radar:</label>
        <select type="number" id="radar" class="form-control" v-model="temporalValues.radar">
          <option v-for="optionRadar in optionsRadar" :key="optionRadar">{{ optionRadar }}</option>
        </select>
        <label>Comments:</label>
        <textarea type="text" id="comments" class="form-control" v-model.lazy="temporalValues.comments" />
        <label>Added by:</label>
        <input
          required
          type="text"
          id="added-by"
          class="form-control required-input"
          v-model.lazy="temporalValues.addedBy">
        <label>Date:</label>
        <input
          required
          type="date"
          min="2019-01-01"
          max="2030-12-31"
          id="date"
          class="form-control required-input"
          v-model="temporalValues.date">
        <label>Status:</label>
        <select type="text" id="status" class="form-control" v-model="temporalValues.status">
          <option v-for="optioStatus in optiosStatus" :key="optioStatus">{{ optioStatus }}</option>
        </select>
        <br />
        <!-- <input class="update-button" type="submit" value="Update" @click.prevent="update" v-if="!updated" :class="{ disabledUpdate: isDisabledUpdate }" :disabledUpdate="isDisabledUpdate"> -->
        <input class="update-button" type="submit" value="Update" @click.prevent="update" v-if="!updated">
        <!-- put: {{ temporalUpdatedStar }}<br>
        selected id: {{ selectedid }}<br>
        temp values: {{ temporalValues }}<br>
        range: {{ rangeFormat }}, values: {{ objectToArray }}<br>
        deleted id: {{ deleteID }}-->
        <div class="updated-from" v-if="updated">
          <h3 style="text-align:center; font-size:16px; margin-top:0">The star is updated</h3>
          <button class="close-button" @click="close">Close</button>
        </div>
      </form>
    </div>
  </div>
</body>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main.js";

export default {
  name: "Menu",
  data() {
    return {
      active: false,
      isActive: false,
      submitted: false,
      updated: false,
      starsMenu: "",
      selectedStar: null,
      temporalValues: "",
      values: "",
      // stars: [],
      newStar: {
        body: {
          NAME: "",
          LONG: "",
          LAT: "",
          PLANETCOUNT: "",
          LOCALPOP1: "",
          PLANET1: "",
          LOCALPOP2: "",
          PLANET2: "",
          LOCALPOP3: "",
          PLANET3: "",
          SYSTEMOWNER: "",
          RADAR: "",
          COMMENTS: "",
          ADDEDBY: "",
          DATE: "",
          STATUS: ""
        }
      },
      updatedStar: "",
      selectedId: "",
      temporalUpdatedStar: {
        body: {
          range: "",
          values: ""
        }
      },
      optionsLocalPop: ["Evo", "Ako", "Mount", "Skre", "Harp", "Zoni", "None"],
      optionsRadar: ["1", "2", "3", "1Har", "2Har", "3Har"],
      optiosStatus: ["", "ALLY", "ENEMY", "NEUTRAL", "NAP"],
      optionsPlanetCount: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  props: {
    stars: {
      type: Array
    }
  },

  computed: {
    selectedid() {
      return this.temporalValues.id;
    },
    rangeFormat() {
      return (this.temporalUpdatedStar.body.range =
        this.temporalValues.id + ":" + this.temporalValues.id);
      console.log(temporalUpdatedStar.body.range);
    },
    objectToArray() {
      const obj = this.temporalValues;
      // const newobj = delete obj.id;
      return (this.temporalUpdatedStar.body.values = Object.values(obj));
    },
    deleteID() {
      const array = this.temporalUpdatedStar.body.values;
      const removedid = array.shift();
      // console.log(array);
    },
    isDisabled () {
      if (this.newStar.body.NAME.length > 0 && this.newStar.body.LAT.length > 0 && this.newStar.body.LONG.length > 0 && this.newStar.body.ADDEDBY.length > 0 && this.newStar.body.DATE.length > 0) {
        return false;
      }  else {
        return true;
      }
    },
    sortedArray() {
      function compare(a, b) {
        if (a.name < b.name) {
          return -1;
        } 
        if (a.name > b.name) {
          return 1
        }
        return 0;
      }
      return this.stars.sort(compare);
    }
  },

  methods: {
    toggleAdd() {
      this.active = !this.active;
    },
    toggleUpdate() {
      this.isActive = !this.isActive;
    },

    // submit() {var temporalForm1 = '{"body": { "NAME": "11", "LONG": "11", "LAT": "11", "PLANETS": "11", "LOCAL": "11", "OWNER": "11", "CLOSEST": "11", "RADAR": "11", "COMMENTS": "11","ADDED": "11","Date": "11"}}'
    //   this.$http.post('https://pyet2m3rzl.execute-api.us-east-1.amazonaws.com/test/outscapebackend', temporalForm1 )
    //     .then(response => {
    //       console.log(response);
    //     }, error => {
    //       console.log(error);
    //     },);
    //   console.log(temporalForm1);
    // },

    // AXIOS
    submit() {
      axios.post('/test/outscapebackend', this.newStar)
      .then(response => {
    console.log(response)
    this.submitted = true;
		})
      .catch(error => {
		console.log(error)
    })
    },
    
    close() {
      this.newStar = "";
    },

    // VUE-RESOURCE
    // submit() {
    //   this.$http.post("https://pyet2m3rzl.execute-api.us-east-1.amazonaws.com/test/outscapebackend", this.newStar)
    //     .then(response => {
    //         console.log(response); // success callback
    //         this.submitted = true;
    //         // alert('You added a new star');
    //       },
    //       error => {
    //         console.log(error); // error callback
    //         // alert('The star was not added');
    //       }
    //     );
    //   console.log(this.newStar);
    //   this.submitted = true;
    //   this.newStar = "";
    //   // alert('You added a new star');
    // },

    // submit: function() {
    //   this.$emit("inputData", this.newStar); // Make tempMessage available to a parent component
    //   this.newStar = ""; // Clears out the input field to accept the next value
    // }

    // VUE-RESOURCE
    // update() {
    //   // var temporalUpdatedStar = {
    //   //   "body": {
    //   //     "range": "151:151",
    //   //     "values": ["122", "122", "122", "122", "122", "122", "122", "122", "122", "122", "122", "122"]
    //   //   }
    //   // }
    //   this.$http.put("https://pyet2m3rzl.execute-api.us-east-1.amazonaws.com/test/outscapebackend", this.temporalUpdatedStar)
    //   .then(response => {
    //     this.temporalUpdatedStar = response // this.temporalUpdatedStar = response.body; // update data from the response
    //     console.log(response.body);
    //     console.log(response);
    //     // console.log(temporalUpdatedStar);
    //   }, error => {
    //     console.log(error);// callback error
    //   })
    // },

    // AXIOS
    update() {
      axios.put("/test/outscapebackend", this.temporalUpdatedStar)
        .then(response => {
          console.log(response)
          this.updated = true;
        })
        .catch(error => {
          console.log(error)
        })
    },

    selectedStarName(event) {
      // this.temporalUpdatedStar.body.values = event.target.value
      // this.selectedCountry = event.target.options[event.target.options.selectedIndex].text
      return starsMenu;
      alert("You selected a star!");
      console.log("You selected a star");
      console.log(event.target.value);
    }
  },
  created() {
    eventBus.$on("i-got-clicked", value => {
      this.starsMenu = value;
    });
  }
};
</script>

<style scoped>
.hide-test {
  position: absolute;
  z-index: 1;
  color: transparent;
  /* color: aliceblue; */
  /* z-index: 1000; */
}

.main-menu {
  height: 20px;
  width: 100%;
  position: absolute;
  z-index: 500;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 100px;
  
  margin-top: -8px;
}

.add-button {
  margin-right: 5px;
  cursor: pointer;
}

.edit-button {
  margin-right: 10px;
  cursor: pointer;
}

.form_add-star {
  display: flex;
  flex-direction: column;
  background: white;

  margin-right: 30px;
  width: 300px;
  padding: 5px;
}

.required-input {
  outline: 1px solid red;
}

#comments {
  height: 60px;
}

.form_update-star {
  margin-right: 32px;
}

.submit-button,
.update-button,
.close-button {
  cursor: pointer;
  width: 80px;
  align-self: center;
}

.submitted-form,
.updated-from {
  display: flex;
  flex-direction: column;
} 
</style>
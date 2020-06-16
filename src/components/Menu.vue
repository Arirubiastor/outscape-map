<template>
  <div class="main-menu">
    <div>
      <!-- <input type="text" v-model="search" placeholder="search star"> -->
      <button class="add-button" @click="toggle">Add Star</button>
      <form class="form_add-star" v-if="active">
        <label>Name:</label>
        <input required type="text" id="name" value class="form-control" v-model="temporalForm.body.NAME" />
        <label>Longitud:</label>
        <input required type="number" id="lng" class="form-control" v-model="temporalForm.body.LONG" />
        <label>Latitud:</label>
        <input required type="number" id="lat" class="form-control" v-model="temporalForm.body.LAT" />
        <label>Number of Planets:</label>
        <select type="number" id="planets" class="form-control" v-model="temporalForm.body.PLANETCOUNT">
          <option v-for="optionPlanetCount in optionsPlanetCount" :key="optionPlanetCount">{{ optionPlanetCount }}</option>
        </select>
        <label>Local Population 1:</label>
        <select type="text" id="local-pop" class="form-control" v-model="temporalForm.body.LOCALPOP1">
            <option v-for="optionLocalPop1 in optionsLocalPop1" :key="optionLocalPop1">{{ optionLocalPop1 }}</option>
        </select>
        <label>Planet 1:</label>
        <input type="text" id="local-pop" class="form-control" v-model="temporalForm.body.PLANET1" />
        <label>Local Population 2:</label>
        <input type="text" id="local-pop" class="form-control" v-model="temporalForm.body.LOCALPOP2" />
        <label>Planet 2:</label>
        <input type="text" id="local-pop" class="form-control" v-model="temporalForm.body.PLANET2" />
        <label>Local Population 3:</label>
        <input type="text" id="local-pop" class="form-control" v-model="temporalForm.body.LOCALPOP3" />
        <label>Planet 3:</label>
        <input type="text" id="local-pop" class="form-control" v-model="temporalForm.body.PLANET3" />
        <label>System Owner:</label>
        <input type="text" id="owner" class="form-control" v-model="temporalForm.body.SYSTEMOWNER" />
        <label>Radar:</label>
        <select type="number" id="radar" class="form-control" v-model="temporalForm.body.RADAR">
          <option v-for="optionRadar in optionsRadar" :key="optionRadar">{{ optionRadar }}</option>
        </select>
        <label>Comments:</label>
        <textarea type="text" id="comments" class="form-control" v-model="temporalForm.body.COMMENTS" />
        <label>Added by:</label>
        <input type="text" id="added-by" class="form-control" v-model="temporalForm.body.ADDEDBY" />
        <label>Date:</label>
        <input type="date" min="2019-01-01" max="2030-12-31" id="date" class="form-control" v-model="temporalForm.body.DATE" />
        <label>Status:</label>
        <select type="text" id="status" class="form-control" v-model="temporalForm.body.STATUS">
            <option v-for="optioStatus in optiosStatus" :key="optioStatus">{{ optioStatus }}</option>
        </select>
        <br />
        <input class="submit-button" type="submit" value="Sumbit" @click="submit" />
        <!-- <div>Your data: {{ temporalForm }}</div>
        <div>New Lat: {{ LATNEG }}</div>
        <div>Lat Neg: {{ latNeg }}</div> -->
      </form>
    </div>
    <!-- <div>
      <button>Delete Star</button>
    </div>
    <div>
      <button class="form_update-star">Update Star</button>
    </div> -->
    

    <!-- <input
      placeholder="Enter Text Here"
      v-model="tempMessage"
      @keyup.enter="submit"
    />-->
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      active: false,
      //   temporalForm: {
      //     body: ""
      //   },
      latNeg: "",
      search: "",
      temporalForm: {
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
      optionsLocalPop1: ['Evo', 'Ako', 'Mount', 'Skre', 'Harp', 'Zoni'],
      optionsRadar: ['1', '2', '3', '1Har', '2Har', '3Har'],
      optiosStatus: ['ALLY', 'ENEMY', 'NEUTRAL'],
      optionsPlanetCount: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      // newStar: {}
    };
  },
  computed: {
    LATNEG: function() {
      return this.latNeg * -1
    },
    filteredStars: function() {
      return this.stars.filter((star))
    }
  },

  methods: {
    toggle() {
      this.active = !this.active;
    },
    // submit() {var temporalForm1 = '{"body": { "NAME": "11", "LONG": "11", "LAT": "11", "PLANETS": "11", "LOCAL": "11", "OWNER": "11", "CLOSEST": "11", "RADAR": "11", "COMMENTS": "11","ADDED": "11","Date": "11"}}'
    //   this.$http.post('https://pyet2m3rzl.execute-api.us-east-1.amazonaws.com/test/outscapebackend',temporalForm1 )
    //     .then(response => {
    //       console.log(response);

    //     }, error => {
    //       console.log(error);
    //     },);
    //   console.log(temporalForm1);
    //   this.temporalForm = "";
    // },

    newTemporalForm() {
      return 
    },

    submit() {
      this.$http
        .post(
          "https://pyet2m3rzl.execute-api.us-east-1.amazonaws.com/test/outscapebackend", this.temporalForm)
        .then(response => {
            console.log(response);
            
          },
          error => {
            console.log(error);
          }
        );
      console.log(this.temporalForm);
      this.temporalForm = "";
      // alert('You added a new star');
    }

    // submit: function() {
    //   this.$emit("inputData", this.temporalForm); // Make tempMessage available to a parent component
    //   this.temporalForm = ""; // Clears out the input field to accept the next value
    // }
  }
};
</script>

<style scoped>
.main-menu {
  height: 20px;
  width: 100%;
  position: absolute;
  z-index: 500;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 100px;
}

.add-button {
  margin-right: 25px;
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

#comments {
  height: 60px;
}

.form_update-star {
  margin-right: 32px;
}

.submit-button {
  cursor: pointer;
  width: 80px;
  align-self: center;
}
</style>
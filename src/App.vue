<template>
  <div>
    <l-menu @inputData="updateMessage"></l-menu>
    <app-map :msg="childData"></app-map>
    <!-- <grid-map></grid-map> -->
  </div>
</template>

<script>
import AppMap from "./components/Map";
import LMenu from "./components/Menu";
// import GridMap from "./components/Grid";

export default {
  name: "App",
  components: {
    AppMap,
    LMenu
    // GridMap
  },
  data: function() {
    return {
      childData: ""
    };
  },
  methods: {
    updateMessage(variable) {
      this.childData = variable;
    }  
  }
};
</script>

<style>
</style>


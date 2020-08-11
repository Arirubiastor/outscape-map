<template>
  <div id='app'>
    <!-- <h1>Outscape Community</h1>
    <hr> -->
    <router-view></router-view>
  </div>
</template>

<script>
import AppMap from "./components/Map";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import regeneratorRuntime from "regenerator-runtime";
// import LMenu from "./components/Menu";

export default {
  name: "App",
  components: {
    AppMap,
    Login,
    Navbar
    // LMenu
    // GridMap
  },
  data: function() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>

/* .auth-form {
  z-index: 100;
} */

</style>


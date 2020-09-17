<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <!-- <router-link to="/" class="navbar-brand">Vue Firebase Auth</router-link> -->
      <!-- <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      > -->
        <span class="navbar-toggler-icon"></span>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
            <div v-if="user" class="alert alert-success" role="alert">{{ user.data.displayName }}, You are logged in!
              <button class="nav-link sing-out_button" @click.prevent="signOut">Sign out</button>
              <button :disabled="admin" class="nav-link register_button" @click.prevent="$router.push({path: '/register'})">Register</button>
              <!-- <h1>{{ user.data }}</h1> -->
            </div>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import axios from 'axios';

export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      // showRegister: false
    }
  },
  // mounted: {

  // },
  // created() {
  //   axios.get('https://outscape-map-5f64d.firebaseio.com/users.json')
  //   .then(response => {
  //     console.log(response)
  //     const data = response.data
  //     const users = []
  //     for (let key in data) {
  //       const user = data[key]
  //       user.id = key
  //       users.push(user)
  //     }
  //     console.log(users)
  //     //this.name = users[0].name
  //     //this.email = users[0].email
  //   })
  //   .catch(error => console.log(error))
  // },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user` 
        user: "user"
    }),
    admin() {
      if (this.user.data.email == 'test@test.com') {
        return false;
      } else if (this.user.data.email == 'arianarubigo@gmail.com') {
        return false;
      } else if (this.user.data.email == 'admin@outscape.com') {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "login"
          });
        });
    }
  },
  
};
</script>

<style scoped>

.nav-item {
  height: 20px;
  position: absolute;
  z-index: 500;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: white;
  margin-top: 4px;
  font-size: 14px;
  font-weight: normal;
  margin-left: 12px;
}

.sing-out_button {
  position: absolute;
  z-index: 501;
  margin-left: 10px;
  cursor: pointer;
}

.register_button {
  position: absolute;
  z-index: 501;
  margin-left: 80px;
  cursor: pointer;
}

.alert-success {
  position: absolute;
  z-index: 501;
  margin-left: 20px;
  color: white;
}

</style>
<template>
  <!-- <div>
    <h1>Login</h1>
    <div class="auth-form">
      <div class="form-group">
        <label>Username</label>
        <input class="form-control" type="text" v-model="user.username">
      </div>
      <div class="form-group">
        <label>Mail</label>
        <input class="form-control" type="text" v-model="user.email">
      </div>
      <button class="btn btn-primary" @click="submit">Submit</button>
    </div>
  </div> -->

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: Login,
  data() {
    return {
      form: {
        email: "",
        pasword: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      console.log(this.form);
    }
  }
};

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.16.0/firebase-app.js">
</script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.16.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyAEfGuGOpKyVpSl7_VJJZiSWfEGWJYZ_Xo",
//     authDomain: "outscape-map-5f64d.firebaseapp.com",
//     databaseURL: "https://outscape-map-5f64d.firebaseio.com",
//     projectId: "outscape-map-5f64d",
//     storageBucket: "outscape-map-5f64d.appspot.com",
//     messagingSenderId: "957053898979",
//     appId: "1:957053898979:web:57a23e18326e75fb63b5d6",
//     measurementId: "G-Y28RC6RGE5"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
//
</script>
</script>

<style scoped>
</style>
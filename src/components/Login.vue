<template>
  <div class="container">
          <h2 class="title">Login</h2>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group">
                <label for="email" class="email">Email</label>

                <div class="input">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email">
                </div>
              </div>

              <div class="form-group">
                <label for="password" class="password">Password</label>

                <div class="input">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password">
                </div>
              </div>
              <button type="submit" class="button">Login</button>
            </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          //console.log(data)
          this.$router.replace({ name: "map" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>

<style scoped>

.container {
  border: solid 1px gray;
  width: fit-content;
  padding: 16px;
  margin: auto;
  margin-top: 20px;
}

.title,
.input,
.button {
  text-align: center;
}

.form-group,
.alert {
  margin-bottom: 16px;
}

.title {
  margin-top: 0;
}

input {
  width: 100%;
}



</style>
<template>
  <div class="container">
    <h2 class="title">Register</h2>
    <div class="card-body">
      <div v-if="error" class="alert alert-danger">{{error}}</div>
      <form action="#" @submit.prevent="submit">
        <div class="form-group row">
          <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

          <div class="input">
            <input
              id="name"
              type="name"
              class="form-control"
              name="name"
              value
              required
              autofocus
              v-model="form.name"
            />
          </div>
        </div>

        <div class="form-group row">
          <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

          <div class="input">
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

          <div class="input">
            <input
              id="password"
              type="password"
              class="form-control"
              name="password"
              required
              :placeholder="placeholder"
              v-model="form.password"
            />
          </div>
        </div>
        <div v-if="registered && !error">
          <h3>You've registered for Outscape-map!</h3>
          <button type="submit" onclick="history.go(0);" @click="close">Continue registering</button>
        </div>
        <button
          type="submit"
          class="button"
          @click="submit"
          @click.prevent="registered=true"
          :class="{ disabled: passwordLength }"
          :disabled="passwordLength"
          v-if="!registered"
        >Register</button>
        <!-- <button type="submit" class="button"
                @click="submit"
                :class="{ disabled: passwordLength }"
                :disabled="passwordLength"
                >Register
        </button>-->
        <!-- <button v-if="error && registered" @click.prevent="registered=false">Try again</button> -->
        <button v-if="error && registered" onclick="history.go(0);">Try again</button>
        <button id="go-to-map" @click.prevent="$router.push({path: '/map'})">Go to map</button>
      </form>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null,
      registered: false,
      placeholder: 'at least 6 characters',
      success: false,
      success2: 'You´ve registered for Outscape-map!',
      hideButton: false,
      submitted: {
        name: "",
        email: "",
        password: ""
      },
      close: "",
    
    };
  },
  computed: {
    passwordLength() {
    if (this.form.password.length > 5 && this.form.name.length > 0 && this.form.email.length > 0) {
      return false;
    } else {
      return true;
    }
  }
  },
  methods: {
    submit() {
      let authWorkerApp = firebase.initializeApp(firebase.app().options, 'auth-worker');
      let authWorkerAuth = firebase.auth(authWorkerApp);
      authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE); // disables caching of account credentials

      authWorkerAuth.createUserWithEmailAndPassword(this.form.email, this.form.password)
      .then(data => {
        data.user
            .updateProfile({ // register se queda en true cuando valida password.length
              displayName: this.form.name
            })
            .then(() => {})
            .catch(err => {
          this.error = err.message;
        });
        }).catch(err => {
          this.error = err.message;
        });
          
      


      // firebase
      //   .auth()
      //   // .createUserWithEmailAndPassword(this.form.email, this.form.password)
      //   // .then(data => {
      //   //   data.user
      //   //     .updateProfile({ // register se queda en true cuando valida password.length
      //   //       displayName: this.form.name
      //   //     })
      //   //     .then(() => {});
      //   // })
      //   .then(
      //     function(user) {
      //       console.log('You have registered for Outscape-map!');
      //     }
      //   )
      //   // .then(
      //   //   function(event) {
      //   //     this.submitted.name = this.form.name;
      //   //     this.submitted.email = this.form.email;
      //   //     this.submitted.password = this.form.password;

      //   //     this.form.name = this.form.email = this.form.password = '';

      //   //     event.target.reset();
      //   //   }
      //   // )

      //   // .then(succ => {
      //   //   this.success = succ.message;
      //   // })
      //   .catch(err => {
      //     this.error = err.message;
      //   });
      // return this.registered=false;
      // setTimeout(() => this.registered=false, 2000);
    },
  },
  tryAgain() {
    return this.registered=false;
  },
  // resetForm(event) {
  //   this.submitted.name = this.form.name;
  //   this.submitted.email = this.form.email;
  //   this.submitted.password = this.form.password;

  //   this.form.name = this.form.email = this.form.password = '';

  //   event.target.reset();
  // },
  close() {
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
    },
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

#go-to-map {
  display: block;
  margin-top: 18px;
}
</style>
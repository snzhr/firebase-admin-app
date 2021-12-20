<template>
  <div class="form__container">
    <form v-if="!$store.state.isAuthenticated" @submit.prevent="">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          v-model="username"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>

      <div v-if="error" class="alert alert-warning" role="alert">
        {{ error }}
      </div>

      <button @click="login" class="btn btn-primary float-end">Login</button>
    </form>
    <div v-else>
      <h1>You are already logged in</h1>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then((data) => {
          this.$store.state.isAuthenticated = true;
          this.$router.replace("/");
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>

<style scoped>
.form__container {
  width: 50%;
  margin: 5em auto 0 auto;
}
</style>
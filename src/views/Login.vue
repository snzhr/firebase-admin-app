<template>
  <div class="form__container">
    <form @submit.prevent="">
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
      <button @click="login" class="btn btn-primary float-end">Login</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then((data) => {
          this.$router.replace("/");
        })
        .catch((err) => {
          console.log(err);
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
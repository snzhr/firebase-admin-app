<template>
  <nav class="navbar align-items-center navbar-expand-lg navbar-light">
    <div class="container">
      <span class="navbar-brand" @click="$router.push('/')">Car rent</span>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li> -->
          <li class="nav-item">
            <router-link
              v-if="$store.state.isAuthenticated"
              class="nav-link"
              to="/addcar"
              >Add new car</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              v-if="$store.state.isAuthenticated"
              class="nav-link"
              to="/cars"
              >Edit cars</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              v-if="$store.state.isAuthenticated"
              class="nav-link"
              to="/bookings"
              >Bookings</router-link
            >
          </li>
        </ul>
        <button
          v-if="!$store.state.isAuthenticated"
          class="btn btn-primary"
          @click="$router.push('/login')"
        >
          Login
        </button>
        <div v-else class="admin__buttons">
          <button @click="logout" class="btn btn-danger">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import firebase from "firebase";
export default {
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.state.isAuthenticated = !!user;
    });
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      this.$store.state.isAuthenticated = false;
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
nav {
  background-color: darkslategray;
}
.navbar-brand {
  color: white !important;
  font-weight: 600;
  cursor: pointer;
}
a {
  color: white !important;
}
a.router-link-exact-active {
  color: white !important;
  border: 1px solid white;
  border-radius: 0.5em;
}
</style>
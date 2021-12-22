<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color: #e3f2fd"
  >
    <div class="container">
      <a class="navbar-brand" href="#">Dashboard</a>
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
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
              >Cars</router-link
            >
          </li>
        </ul>
        <button
          v-if="!$store.state.isAuthenticated"
          class="btn btn-outline-primary"
          @click="$router.push('/login')"
        >
          Login
        </button>
        <div v-else class="admin__buttons">
          <button @click="logout" class="btn btn-outline-danger">Logout</button>
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
a.router-link-exact-active {
  color: darkslategrey !important;
}
</style>
<template>
  <ul class="list-group container">
    <h1>Car list admin</h1>
    <li class="list-group-item" v-for="car in carList" :key="car.model">
      <p>{{ car.model }}</p>
      <span @click="deleteCar(car)">Delete</span>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["carList"]),
  },
  methods: {
    deleteCar(val) {
      this.$store.dispatch("removeCar", val);
    },
  },
  created() {
    this.$store.dispatch("getCars");
  },
};
</script>

<style>
</style>
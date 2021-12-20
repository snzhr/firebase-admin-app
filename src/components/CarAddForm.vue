<template>
  <div class="car__add__form">
    <div class="form-floating mb-3">
      <input
        v-model="car.model"
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder="Mercedes"
      />
      <label for="floatingInput">Car model</label>
    </div>
    <div class="form-floating mb-3">
      <input
        v-model="car.year"
        type="number"
        class="form-control"
        id="floatingPassword"
        placeholder="Year"
      />
      <label for="floatingPassword">Year</label>
    </div>
    <select
      class="form-select form-select-lg mb-3"
      v-model="car.transmission"
      aria-label="Default select example"
    >
      <option value="">Select car transmission</option>
      <option value="Automatic">Automatic</option>
      <option value="Manual">Manual</option>
    </select>
    <button @click="createNewCar" class="btn btn-primary">Add</button>
  </div>
</template>
<script>
import { createCar } from "@/fbconfig.js";
export default {
  data() {
    return {
      car: {
        model: "",
        year: null,
        transmission: "",
      },
    };
  },
  methods: {
    createNewCar() {
      createCar(this.car);
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="about container my-3">
    <h1>Cars</h1>
    <Loader class="customLoader" v-if="carList.length === 0" />
    <div v-if="carList.length === 0">No cars</div>
    <div v-else class="cars d-flex flex-wrap justify-content-center">
      <div
        class="card position-relative mx-3 my-2"
        style="width: 18rem"
        v-for="car in carList"
        :key="car.id"
      >
        <div
          v-if="car.booked"
          class="bg-danger position-absolute end-0 p-1 m-1 rounded text-white"
        >
          Booked
        </div>
        <div
          v-if="car.booked === false"
          class="bg-success position-absolute end-0 p-1 m-1 rounded text-white"
        >
          Available
        </div>
        <img
          @click="$router.push(`/car/${car.id}`)"
          :src="car.imageUrl"
          class="card-img-top"
          :alt="car.model"
        />
        <div class="card-body">
          <h5 class="card-title">
            {{ car.model }}
          </h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Price per day: {{ car.price }}$</li>
          <li class="list-group-item">Year: {{ car.year }}</li>
        </ul>
        <button
          class="btn btn-outline-primary"
          @click="$router.push(`/car/${car.id}`)"
        >
          More
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Loader from "../components/Loader.vue";
export default {
  components: {
    Loader,
  },
  computed: {
    ...mapState(["carList"]),
  },
  created() {
    this.$store.dispatch("getCars");
  },
};
</script>
<style scoped>
.customLoader {
  margin: auto;
}
</style>
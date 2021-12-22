<template>
  <div class="about container mt-3">
    <h1>Cars</h1>
    <Loader class="customLoader" v-if="carList.length === 0" />

    <div class="cars d-flex flex-wrap justify-content-between">
      <div
        class="card"
        style="width: 18rem"
        v-for="car in carList"
        :key="car.id"
      >
        <img :src="car.imageUrl" class="card-img-top" :alt="car.model" />
        <div class="card-body">
          <h5 class="card-title">{{ car.model }}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{ car.year }}</li>
          <li class="list-group-item">{{ car.transmission }}</li>
        </ul>
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
  mounted() {
    this.$store.dispatch("getCars");
  },
};
</script>
<style scoped>
.customLoader {
  margin: auto;
}
</style>
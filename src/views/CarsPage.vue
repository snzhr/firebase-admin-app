<template>
  <div class="about container mt-3">
    <h1>Cars</h1>
    <div class="cars d-flex justify-content-around">
      <div
        class="card"
        style="width: 20rem"
        v-for="car in carList"
        :key="car.model"
      >
        <img :src="car.imageUrl" class="card-img-top" :alt="car.model" />
        <div class="card-body">
          <h5 class="card-title">{{ car.model }}</h5>
          <!-- <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> -->
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
import { db } from "../fbconfig";
export default {
  data() {
    return {
      carList: [],
    };
  },
  created() {
    db.collection("cars")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.carList.push(doc.data());
        });
      });
  },
};
</script>
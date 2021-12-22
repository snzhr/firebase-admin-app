<template>
  <div class="single__car my-5 container">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-6">
          <img
            :src="car.imageUrl"
            class="d-block mx-auto rounded-start"
            :alt="car.model"
          />
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h4 class="card-title">{{ car.model }}</h4>
            <p class="card-text">
              <small class="text-muted">Price per day:</small>
              {{ car.price }}$
            </p>
            <p class="card-text">
              <small class="text-muted">Drive type:</small>
              {{ car.drivetype }}
            </p>
            <p class="card-text">
              <small class="text-muted">Fuel type:</small>
              {{ car.fuel }}
            </p>
            <p class="card-text">
              <small class="text-muted">Steering wheel:</small>
              {{ car.steeringWheel }}
            </p>
            <p class="card-text">
              <small class="text-muted">Transmission type:</small>
              {{ car.transmission }}
            </p>
            <p class="card-text">
              <small class="text-muted">Manufactured year:</small>
              {{ car.year }}
            </p>
          </div>
          <button
            v-show="car.booked === false"
            class="btn btn-warning"
            @click="bookCar(car)"
          >
            Book
          </button>
          <p v-show="car.booked === true">Not available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../fbconfig.js";
export default {
  data() {
    return {
      car: {},
    };
  },
  created() {
    this.$store.state.carList.find((car) => {
      if (car.id === this.$route.params.id) {
        this.car = car;
        console.log("car is : ", car);
      }
    });
    // db.collection("cars")
    //   .doc(this.$route.params.id)
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       this.car = doc.data();
    //       //   console.log("Document data:", doc.data());
    //     } else {
    //       console.log("No such document!");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Error getting document:", error);
    //   });
  },
  methods: {
    bookCar(car) {
      return db
        .collection("cars")
        .doc(car.id)
        .update({
          booked: true,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    },
  },
};
</script>

<style>
</style>
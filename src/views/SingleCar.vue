<template>
  <booking-form :car="car" />
  <div class="single__car my-5 container">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-6">
          <img
            :src="car.imageUrl"
            class="img-fluid d-block mx-auto rounded-start"
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
            <button
              v-show="car.booked === false"
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Book
            </button>
            <p v-show="car.booked === true">Not available</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../fbconfig.js";
import BookingForm from "../components/BookingForm.vue";
export default {
  components: {
    BookingForm,
  },
  data() {
    return {
      car: {},
    };
  },
  created() {
    db.collection("cars")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.car = doc.data();
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  },
};
</script>

<style>
</style>
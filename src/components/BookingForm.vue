<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Booking car: {{ car.model }} - {{ car.year }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <input
              v-model="booking.fullname"
              type="text"
              class="form-control"
              placeholder="Enter your fullname"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="booking.phone"
              type="tel"
              class="form-control"
              placeholder="0700123456"
              maxlength="10"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="booking.dateFrom"
              type="date"
              class="from form-control"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="booking.dateTo"
              type="date"
              class="to form-control"
            />
          </div>
        </div>

        <div class="my__modal__footer">
          <div
            v-if="isBooked"
            class="booked__message p-1 rounded bg-success text-white my-1"
          >
            <span class="">Booked</span>
          </div>
          <button
            type="button"
            class="btn btn-secondary me-2"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            :disabled="isBooked"
            type="button"
            @click="bookCar(car)"
            class="btn btn-primary"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../fbconfig";
export default {
  props: {
    car: {
      type: Object,
    },
  },
  data() {
    return {
      booking: {
        fullname: "",
        phone: null,
        dateFrom: "",
        dateTo: "",
      },
      isBooked: false,
    };
  },
  methods: {
    bookCar(car) {
      let bookedCarRef = db.collection("bookings").doc();
      bookedCarRef
        .set({
          id: bookedCarRef.id,
          bookedCar: car.model,
          bookedCarId: car.id,
          fullname: this.booking.fullname,
          phone: this.booking.phone,
          dateFrom: this.booking.dateFrom,
          dateTo: this.booking.dateTo,
        })
        .then(() => {
          this.isBooked = true;
          console.log("Car is Booked");
        })
        .catch((error) => {
          console.log("Error ", error);
        });

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

<style scoped>
.my__modal__footer {
  padding: 0.5em;
}
</style>
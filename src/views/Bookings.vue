<template>
  <div class="container my-5">
    <h1>Booking view</h1>
    <div class="bookings d-flex">
      <div
        class="card m-2"
        style="width: 18rem"
        v-for="book in bookings"
        :key="book.id"
      >
        <div
          class="card-header"
          style="cursor: pointer"
          @click="$router.push(`/car/${book.bookedCarId}`)"
        >
          Car: {{ book.bookedCar }}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Booker: {{ book.fullname }}</li>
          <li class="list-group-item">Phone: {{ book.phone }}</li>
          <li class="list-group-item">From: {{ book.dateFrom }}</li>
          <li class="list-group-item">To: {{ book.dateTo }}</li>
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
      bookings: [],
    };
  },
  created() {
    db.collection("bookings")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.bookings.push(doc.data());
          // console.log(doc.id, " => ", doc.data());
        });
      });
  },
};
</script>
<style>
</style>
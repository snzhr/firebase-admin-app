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
          class="card-header d-flex align-items-center justify-content-between"
          style="cursor: pointer"
        >
          Car: {{ book.bookedCar }}
          <button
            @click="removeBooking(book.id)"
            class="btn btn-outline-danger"
          >
            Delete
          </button>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Booker: {{ book.fullname }}</li>
          <li class="list-group-item">Phone: {{ book.phone }}</li>
          <li class="list-group-item">From: {{ book.dateFrom }}</li>
          <li class="list-group-item">To: {{ book.dateTo }}</li>
        </ul>
        <button
          @click="$router.push(`/car/${book.bookedCarId}`)"
          class="btn btn-outline-primary align-self-center m-1 px-5"
        >
          More
        </button>
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
        });
      });
  },
  methods: {
    async removeBooking(id) {
      const res = await db
        .collection("bookings")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
};
</script>
<style>
</style>
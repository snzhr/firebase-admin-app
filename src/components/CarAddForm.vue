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
    <div class="mb-3">
      <label for="formFile" class="form-label">Car image</label>
      <input
        @change="fileHandler"
        class="form-control"
        type="file"
        id="formFile"
      />
      <!-- <div v-show="imgUploading">Image is loading. Please wait ...</div> -->
      <Loader v-if="imgUploading" />
    </div>
    <button
      :disabled="imgNotUploaded"
      @click="createNewCar"
      class="btn btn-primary"
    >
      Add
    </button>
  </div>
</template>
<script>
import { createCar } from "@/fbconfig.js";
import firebase from "firebase";
import Loader from "@/components/Loader.vue";
export default {
  components: {
    Loader,
  },
  data() {
    return {
      car: {
        model: "",
        year: null,
        transmission: "",
        img: null,
        imageUrl: "",
      },
      imgNotUploaded: true,
      imgUploading: false,
    };
  },
  watch: {
    car: {
      handler(newValue) {
        if (newValue.imageUrl) {
          this.imgNotUploaded = false;
          this.imgUploading = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    createNewCar() {
      createCar(this.car);
    },
    async fileHandler(e) {
      try {
        this.imgUploading = true;
        const carImg = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(carImg.name);
        await fileRef.put(carImg);
        const imageUrl = await fileRef.getDownloadURL();
        this.car.img = carImg.name;
        this.car.imageUrl = imageUrl;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>
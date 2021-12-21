import { createStore } from 'vuex'
import { db } from "../fbconfig";

export default createStore({
  state: {
    carList: [],
   isAuthenticated: false
  },
  mutations: {
    SET_CARS(state, payload){
       state.carList = payload
    },
    REMOVE_CAR(state,payload){
      state.carList.splice(state.carList.indexOf(payload), 1)
    },
    // UPDTE_CAR(state, payload){

    // }
  },
  actions: {
    getCars({commit}){
    db.collection("cars")
      .get()
      .then((querySnapshot) => {
        let cars = []
        querySnapshot.forEach((doc) => {
          cars.push({
            id: doc.id,
            ...doc.data()
          })
        });
        commit('SET_CARS', cars)
      });
    },

    removeCar({commit}, payload){
      db.collection("cars").doc(payload.id).delete().then(() => {
        console.log("Document successfully deleted!");
        commit("REMOVE_CAR", payload)
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    },

    async updateCar({commit},car){
      return  await db.collection("cars").doc(car.id).update(car)
      .then(() => {
        // commit("UPATE_CAR",car)
        console.log("Document successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    }
  },
  modules: {
  }
})

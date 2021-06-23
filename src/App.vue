<template>
  <div id="app">
    <Navigation class="navigation"/>
    <router-view />
  </div>
</template>

<script>
import axios from "axios"
import db from "./firebase/firebaseInit"
import Navigation from './components/Navigation.vue'
export default {
  components: { Navigation },
  name: "App",
  data() {
    return {
      APIkey: "a700f9451c06ddb9940a4f1fefa2b15c",
      cities: []
    }
  },
  created () {
    this.getCityWeather()
  },
  methods: {
    getCityWeather() {
      let firebaseDB = db.collection('cities');
      firebaseDB.onSnapshot(snap => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === 'added') {
            try {
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&APPID=${this.APIkey}`)
              const data = response.data
              firebaseDB.doc(doc.doc.id).update({
                currentWeather: data
              }).then(() => {
                this.cities.push(doc.doc.data)
              })
            } catch (error) {
              console.log(error);
            }
          }
        });
      })
    }
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;
  .container {
    padding: 0 20px;
  }
}
</style>

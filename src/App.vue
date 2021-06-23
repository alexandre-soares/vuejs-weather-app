<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios"
import db from "./firebase/firebaseInit"
export default {
  name: "App",
  data() {
    return {
      APIkey: "a700f9451c06ddb9940a4f1fefa2b15c",
      city: 'Detroit',
      cities: []
    }
  },
  created () {
    this.getCityWeather()
  },
  methods: {
    getCurrentWeather() {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.APIkey}`).then((res) => {
        console.log(res.data);
      })
    },
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
  font-family: 'Quicksand', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <v-app class="calendar-component" style="background-color: transparent;">
    <filters></filters>
    <calendar></calendar>
  </v-app>
</template>

<script>

import calendar from './components/calendar'
import filters from './components/filters'

export default {
  name: 'App',
  components: {
    calendar,
    filters
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.calendar-component {
  @import url('https://fonts.googleapis.com/css?family=Ubuntu');
  width: 60%;
  margin: 40px auto;
  font-family: 'Ubuntu', sans-serif;
  padding: 20px;
  .c-heading {
    color: #006ce5;
    font-weight: bold;
    font-size: 1.3rem;
    text-transform: uppercase;
  }
}
</style>

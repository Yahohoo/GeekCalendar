<template>
  <v-app class="calendar-component">
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

  font-family: 'Ubuntu', sans-serif;

  .c-heading {
    color: #006ce5;
    font-weight: bold;
    font-size: 1.4rem;
    text-transform: uppercase;
  }
}
</style>

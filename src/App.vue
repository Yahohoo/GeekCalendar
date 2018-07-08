<template>
  <v-app class="calendar-component">
    <div class="wrapper">
      <filters></filters>
      <calendar></calendar>
    </div>
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

// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://test.arruzk.ru/api/calendar?from=09-11-2016', false);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send();
// if (xhr.status != 200) {
//   alert( xhr.status + ': ' + xhr.statusText );
// } else {
//   var sched = xhr.responseText;
// }
</script>

<style lang="scss">
.calendar-component {
  @import url('https://fonts.googleapis.com/css?family=Ubuntu');
  font-family: 'Ubuntu', sans-serif;

  .wrapper {
    width: 60%;
    margin: 40px auto;
  }

  .c-heading {
    color: #006ce5;
    font-weight: bold;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
}
</style>

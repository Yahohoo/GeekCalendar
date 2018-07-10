<template>
  <v-app class="calendar-component">
    <div class="wrapper">
      <c-filters></c-filters>
      <c-calendar></c-calendar>
    </div>
  </v-app>
</template>

<script>

import cCalendar from './components/c-calendar'
import cFilters from './components/c-filters'
import scheduale from './data.js'

function filterEqual(lesson) {
  var fields = this.event.dataFields
  if (fields) {
    var field = lesson
    for (const fieldName of fields) {
      field = lesson[fieldName]
    }
  }
  console.log(field)
}

export default {
  name: 'App',
  components: {
    cCalendar,
    cFilters
  },
  data () {
    return {
      scheduale: scheduale,
      filteredScheduale: []
    }
  },
  computed: {

  },
  methods: {
    filterScheduale(event, data) {
      var filFunc = null
      switch (event.eventType) {
        case 'filter-equal':
          filFunc = filterEqual
        case 'filter-age':
        case 'filter-class':
        case 'filter-in':
      }

      this.filteredScheduale = this.scheduale.filter(
        filFunc, {event, data}
      )
      

    }
  },
  created() {
    this.$root.$on('filter-change', this.filterScheduale)
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

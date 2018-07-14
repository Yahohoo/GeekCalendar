<template>
  <v-app class="calendar-component">
    <div class="wrapper">
      <c-filters></c-filters>
      <c-calendar :schedule="filteredSchedule"></c-calendar>
    {{filteredSchedule.length}}
    </div>
  </v-app>
</template>

<script>
import cCalendar from "./components/c-calendar";
import cFilters from "./components/c-filters";
import schedule from "./data.js";
import Vue from 'vue';

function getField(lesson, fields, process) {
  if (!fields) {
    return null;
  }
  var field = lesson;
  for (const fieldName of fields) {
    field = field[fieldName];
  }
  if (process) {
    field = process(field);
  }
  return field;
}

function filterEqual(lesson, prs) {
  var field = getField(lesson, prs.fields, prs.process);
  return prs.data.some(el => field == el);
}

function filterIn(lesson, prs) {
  const field = getField(lesson, prs.fields);
  return prs.data.some(el => field.includes(el));
}

function filterBetween(lesson, prs) {
  const min = getField(lesson, prs.fields[0]);

  if (min === null) {
    return true;
  }

  const max = getField(lesson, prs.fields[1]);
  return prs.data.some(el => min <= el && el <= max);
}

export default {
  name: "App",
  components: {
    cCalendar,
    cFilters
  },

  data() {
    return {
      schedule: schedule
    };
  },
  computed: {
    // второй проход, но реактивность
    filteredSchedule() {
      var filtered =  this.schedule.filter(
        lesson => {
          return Object.values(lesson._filters).every(el => el)
        } 
      )
      return filtered
    }
  },
  methods: {
    checkSchedule(event, data) {
      var filFunc = null;

      if (!Array.isArray(data)) {
        if (data === null) {
          data = []
        }
        else {
          data = [data];
        }
      }

      switch (event.eventType) {
        case "filter-equal":
          filFunc = filterEqual;
          break;
        case "filter-between":
          filFunc = filterBetween;
          break;
        case "filter-in":
          filFunc = filterIn;
          break;
      }

      for (var lesson of this.schedule) {
        const doFit =
          data.length == 0
            ? true
            : filFunc(lesson, {
                process: event.process,
                fields: event.dataFields,
                data
              });
        Vue.set(lesson._filters, event.id, doFit)
      }
    }
  },
  created() {
    this.$root.$on("filter-change", this.checkSchedule);

    for (var lesson of this.schedule) {
      Vue.set(lesson, '_filters', {})
    }
  }
};

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
  @import url("https://fonts.googleapis.com/css?family=Ubuntu");
  font-family: "Ubuntu", sans-serif;

  .wrapper {
    width: 80%;
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

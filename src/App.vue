<template>
  <v-app>
    <div class="calendar-app">
      <v-expansion-panel expand>
        <v-expansion-panel-content>
          <div slot="header" class="c-heading">
            <i class="fas fa-filter"></i> фильтры
          </div>
          <v-container fluid grid-list-md class="filters-container">
            <v-layout wrap align-center>
              <c-selector v-for="(selector, id) in selectors" :key="`${selector.label}-${id}`" :prs="selector"></c-selector>
            </v-layout>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <c-calendar :schedule="filteredSchedule"></c-calendar>
    </div>
  </v-app>
</template>

<script>
import cSelector from "./components/c-selector";
import cCalendar from "./components/c-calendar";
import schedule from "./data.js";
import Vue from "vue";
import selectors from "./selectors.js"

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
    return false;
  }

  const max = getField(lesson, prs.fields[1]);
  return prs.data.some(el => min <= el && el <= max);
}

export default {
  name: "App",
  components: {
    cCalendar,
    cSelector
  },

  data() {
    return {
      schedule: schedule,
      selectors: selectors.selectors
    };
  },
  computed: {
    // второй проход, но реактивность
    filteredSchedule() {
      var filtered = this.schedule.filter(lesson => {
        return Object.values(lesson._filters).every(el => el);
      });
      return filtered;
    }
  },
  methods: {
    checkSchedule(event, data) {
      var filFunc = null;

      if (!Array.isArray(data)) {
        if (data === null) {
          data = [];
        } else {
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
        Vue.set(lesson._filters, event.id, doFit);
      }
    }
  },
  created() {
    this.$root.$on("filter-change", this.checkSchedule);
    console.log(selectors)
    for (var lesson of this.schedule) {
      Vue.set(lesson, "_filters", {});
    }
  }
};
</script>

<style lang="scss">
.calendar-app {
  @import url("https://fonts.googleapis.com/css?family=Ubuntu");
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  font-family: "Open Sans", sans-serif;
  color: #212121;
  width: 95%;
  margin: 10px auto;

  .c-heading {
    color: #32c5d2;
    font-weight: bold;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
}
</style>

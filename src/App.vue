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
              <c-selector
              v-for="selector in selectors"
              :key="selector.id"
              :prs="selector"
              :choices="selectorsChoices[selector.id]"/>
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
import { selectors, getValue } from "./selectors.js";

function filterEqual(lesson, prs) {
  var field = getValue(lesson, prs.fields, prs.process);
  return prs.data.some(el => field == el);
}

function filterIn(lesson, prs) {
  const field = getValue(lesson, prs.fields);
  return prs.data.some(el => field.includes(el));
}

function filterBetween(lesson, prs) {
  const min = getValue(lesson, prs.fields[0]);

  if (min === null) {
    return false;
  }

  const max = getValue(lesson, prs.fields[1]);
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
      selectors: selectors
    };
  },
  computed: {
    // второй проход, но реактивность
    filteredSchedule() {
      var filtered = this.schedule.filter(lesson => {
        return Object.values(lesson._filters).every(el => el);
      });
      return filtered;
    },
    selectorsChoices() {
      var selectorsChoices = {};
      var id, fields, choices;
      for (let selector of this.selectors) {
        id = selector.id;
        fields = selector.fieldsName;
        choices = selector.choicesFetcher(this.schedule, fields);
        selectorsChoices[id] = choices;
      }
      return selectorsChoices;
    }
  },
  methods: {
    checkSchedule(event, data) {
      var filFunc;

      if (!Array.isArray(data)) {
        if (data === null) {
          data = [];
        } else {
          data = [data];
        }
      }

      switch (event.filterType) {
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
                fields: event.fieldsName,
                data
              });
        Vue.set(lesson._filters, event.id, doFit);
      }
    }
  },
  created() {
    this.$root.$on("filter-change", this.checkSchedule);
    for (var lesson of this.schedule) {
      Vue.set(lesson, "_filters", {});
    }
  }
};
</script>

<style lang="scss">
.calendar-app {
  @import url("https://fonts.googleapis.com/css?family=Ubuntu");
  @import url("https://fonts.googleapis.com/css?family=Open+Sans");
  font-family: "Open Sans", sans-serif;
  color: #212121;
  width: 95%;
  margin: 10px auto;

  .c-heading {
    color: #337ab7;
    font-weight: bold;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
}
</style>

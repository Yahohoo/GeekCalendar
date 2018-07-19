<template>
  <v-app>
    <div class="calendar-app">
      <v-expansion-panel expand>
        <v-expansion-panel-content>
          <div slot="header" class="c-heading">
            <span class="icon"><i class="fas fa-filter"></i></span> фильтры
          </div>
          <v-container fluid grid-list-md class="filters-container">
            <v-layout wrap align-center>
              <c-selector
              v-for="selector in selectors"
              :key="selector.id"
              :selector="selector"
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
import { selectors } from "./selectors.js";

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
    checkSchedule(selector, data) {
      if (!Array.isArray(data)) {
        if (data === null) {
          data = [];
        } else {
          data = [data];
        }
      }
      for (var lesson of this.schedule) {
        const doFit =
          data.length == 0 ? true : selector.filterMethod(lesson, data);
        Vue.set(lesson._filters, selector.id, doFit);
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
    display: flex;
    align-items: center;
    .icon {
      font-size: 1.5rem;
      display: inline-block;
      width: 25px;
      margin-right: 5px;
      text-align: center;
    }
  }
}
</style>

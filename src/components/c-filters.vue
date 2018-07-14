<template>
  <v-expansion-panel expand>
    <v-expansion-panel-content>
      <div slot="header" class="c-heading">
        <i class="fas fa-filter"></i> Фильтры
      </div>
      <v-container fluid grid-list-md class="filters-container">
        <v-layout wrap align-center>
          <c-selector v-for="(selector, id) in selectors" :key="`${selector.label}-${id}`" :prs="selector"></c-selector>
        </v-layout>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import cSelector from "./c-selector";
import func from "../lib/func.js";

export default {
  name: "filters",
  components: {
    cSelector
  },
  data() {
    return {
      chips: [],
      items: ["Streaming", "Eating"],
      // Данные для фильтра включают тип ивента для обновления фильтра
      selectors: [
        {
          label: "Возраст",
          choices: [3, 4, 5, 6, 7],
          multi: true,
          event: {
            id: "age",
            eventType: "filter-between",
            dataFields: [["baseLesson", "min_age"], ["baseLesson", "max_age"]]
          }
        },
        {
          label: "Класс",
          choices: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          multi: true,
          event: {
            id: "class",
            eventType: "filter-between",
            dataFields: [
              ["baseLesson", "min_class"],
              ["baseLesson", "max_class"]
            ]
          }
        },
        {
          label: "Статус",
          choices: ["Робо-1", "Шахматно-мат класс"],
          multi: false,
          event: {
            id: "status",
            eventType: "filter-equal",
            dataFields: ["room", "name"]
          }
        },
        {
          label: "Направление",
          choices: ["Робо-1", "Шахматно-мат класс"],
          multi: false,
          event: {
            id: "dir",
            eventType: "filter-equal",
            dataFields: ["room", "name"]
          }
        },
        {
          label: "Педагог",
          choices: ["Алексей Ильин", "Лев Юманов"],
          multi: false,
          event: {
            id: "teacher",
            eventType: "filter-in",
            dataFields: ["teachersName"]
          }
        },
        {
          label: "Помещение",
          choices: ["Робо-1", "Шахматно-мат класс"],
          multi: false,
          event: {
            id: "room",
            eventType: "filter-equal",
            dataFields: ["room", "name"]
          }
        },
        {
          label: "День недели",
          choices: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
          multi: true,
          event: {
            id: "day",
            eventType: "filter-equal",
            dataFields: ["startDate"],
            process: func.dayFromDate
          }
        }
      ]
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filters-container {
  padding-top: 0;
}
</style>

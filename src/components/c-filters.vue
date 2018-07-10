<template>
  <v-expansion-panel expand>
    <v-expansion-panel-content>
      <div slot="header" class="c-heading">
        <i class="fas fa-filter"></i> Фильтры
      </div>
      <v-container fluid grid-list-md >
        <v-layout wrap align-center>
          <c-selector v-for="(selector, id) in selectors" :key="`${selector.label}-${id}`" :prs="selector"></c-selector>
        </v-layout>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import cSelector from "./c-selector";

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
          label: "Филиал",
          choices: ["Геккон-основной", "Ещё какой-то"],
          multi: false,
          event: {
            eventType: "filter-equal",
            dataFiels: null
          }
        },
        {
          label: "Возраст",
          choices: [3, 4, 5, 6, 7],
          multi: true,
          event: {
            eventType: "filter-age",
            dataFiels: null
          }
        },
        {
          label: "Класс",
          choices: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          multi: true,
          event: {
            eventType: "filter-class",
            dataFiels: null
          }
        },
        {
          label: "Педагог",
          choices: ["Алексей Ильин", "Лев Юманов"],
          multi: false,
          event: {
            eventType: "filter-in",
            dataFiels: ["teachersName"]
          }
        },
        {
          label: "Помещение",
          choices: ["Робо-1", "Шахматно-мат класс"],
          multi: false,
          event: {
            eventType: "filter-equal",
            dataFiels: ["room", "name"]
          }
        }
      ]
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

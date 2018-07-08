<template>
  <v-expansion-panel v-model="panel" expand>
    <v-expansion-panel-content>
      <div slot="header" class="c-heading">
        <i class="fas fa-filter"></i> Фильтры
      </div>
      <v-container fluid grid-list-md>
        <v-layout wrap align-center>
          <v-flex v-for="(selector, id) in selectorsSolo" :key="`${selector.label}-${id}`" xs12 sm6>
            <v-select v-model="value" :items="selector.choices" :label="selector.label">
            </v-select>
          </v-flex>
          <v-flex v-for="(selector, id) in selectorsMulti" :key="`${selector.label}-${id}`" xs12 sm6>
            <v-select v-model="chips" :items="selector.choices" :label="selector.label" multiple>
              <template slot="selection" slot-scope="data">
                <v-chip :selected="data.selected" close @input="remove(data.item)">
                  {{data.item}}
                </v-chip>
              </template>
            </v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "filters",
  data() {
    return {
      panel: [],
      value: [],
      chips: [],
      items: ["Streaming", "Eating"],
      selectorsSolo: [
        {
          label: "Филиал",
          choices: ["Геккон-основной", "Ещё какой-то"]
        },
        {
          label: "Филиал",
          choices: ["Геккон-основной", "Ещё какой-то"]
        }
      ],
      selectorsMulti: [
        {
          label: "Класс",
          choices: [1, 2, 3, 4, 5]
        }
      ]
    };
  },

  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    equal(value, event, type) {
      return value == event[type];
    },
    between(value, event, type1, type2) {
      return event[type1] <= value <= event[type2];
    },
    inside(value, event, type) {
      return event[type].includes(value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

<template>
    <v-flex xs12 sm4 xl3 class="selector">
        <v-select
        clearable
        @change="filterChange(prs, $event)"
        v-model="chips"
        :items="choices"
        :label="prs.label" 
        :multiple="prs.multi">
          <template slot="selection" slot-scope="data">
              <v-chip v-if="prs.multi"
              small
              :selected="data.selected"
              close
              @input="remove(data.item)">
                {{data.item}}
              </v-chip>
              <div
              v-else
              class="v-select__selection v-select__selection--comma">
                {{data.item}}
              </div>
          </template>
          <template slot="no-data">
            <div class="v-list__tile">
              <div class="v-list__tile__content">
                <div class="v-list__tile__title" :style="{'color': '#aeaeae'}">
                  Нет данных с таким параметром
                </div>
              </div>
            </div>
          </template>
        </v-select>
    </v-flex>
</template>

<script>
export default {
  data() {
    return {
      chips: [],
      selections: []
    };
  },
  props: ["prs", "choices"],
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    filterChange(prs, data) {
      const info = {
        id: prs.id,
        filterType: prs.filterType,
        fieldsName: prs.fieldsName,
        process: prs.process
      };
      this.$root.$emit("filter-change", info, data);
    }
  }
};
</script>

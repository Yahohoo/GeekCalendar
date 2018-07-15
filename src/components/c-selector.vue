<template>
    <v-flex xs12 sm4>
        <v-select clearable @change="filterChange(prs.event, $event)" v-model="chips" :items="prs.choices" :label="prs.label" :multiple="prs.multi">
            <template slot="selection" slot-scope="data">
                <v-chip v-if="prs.multi" small :selected="data.selected" close @input="remove(data.item)">
                    {{data.item}}
                </v-chip>
                <div v-else class="v-select__selection v-select__selection--comma">{{data.item}}</div>
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
  props: ["prs"],
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    filterChange(event, data) {
      this.$root.$emit("filter-change", event, data);
    }
  }
};
</script>

<style>
</style>

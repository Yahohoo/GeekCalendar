<template>
    <v-flex xs12 sm4>
        <v-select v-model="prs.selections" :items="prs.choices" :label="prs.label" :multiple="prs.multi">
            <template slot="selection" slot-scope="data" v-if="prs.multi">
                <v-chip small :selected="data.selected" close @input="remove(data.item)">
                    {{data.item}}
                </v-chip>
            </template>
        </v-select>
    </v-flex>
</template>

<script>
// v-for="(selector, id) in selectorsMulti" :key="`${selector.label}-${id}`"
export default {
  props: ["prs"],
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    }
  }
};
</script>

<style>
</style>

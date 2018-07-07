<template>
  <div class="filters">
    <v-expansion-panel
      v-model="panel"
      expand
    >
      <v-expansion-panel-content>
        <div slot="header" class="c-heading"><i class="fas fa-filter"></i> Фильтры</div>
         <v-container fluid grid-list-xl> 
        <v-layout wrap align-center>
          <v-flex xs12 sm6>
          <v-select
            height="10"
            v-model="value"
            :items="items"
            chips
            label="Chips"
            multiple
            solo
          >
          </v-select>
          <v-flex xs12 sm6 d-flex>
        </v-flex>
            <v-select
              :items="items"
              label="Solo field"
              solo
            ></v-select>
          </v-flex>
        </v-layout>
    </v-container>
      </v-expansion-panel-content>
    <hr>
    </v-expansion-panel>
      
  </div>
</template>

<script>
export default {
  name: "filters",
  data: function() {
    return {
      panel: [],
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      value: []
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

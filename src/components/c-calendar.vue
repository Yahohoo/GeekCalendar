<template>
  <v-card class="calendar">
    <v-layout>
      <v-flex>

      </v-flex>
      <v-flex>

      </v-flex>
    </v-layout>
      <div class="header">
        <div class="c-heading"><i class="fas fa-calendar-alt"></i> Календарь</div>
        <div class="menu">
          <div class="date-switcher">
            <v-icon>fas fa-angle-left</v-icon>
            <v-icon>fas fa-angle-right</v-icon>
            <div class="current-period">{{currentPeriod}}</div>
          </div>
          
        </div>
      </div>
      <c-events-grid></c-events-grid>
  </v-card>
</template>

<script>
import cEventsGrid from './c-events-grid'

export default {
  name: 'calendar',
  props: {
      msg: String
  },
  components: {
    cEventsGrid
  },
  data: function () {
    return {
      currentPeriod: 'Ноябрь 2017'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .calendar {
    margin-top: 5px;
    padding: 12px 24px;
    .header {
      display: flex;
    }
    .date-switcher {
      display: flex;
    }
  }
</style>


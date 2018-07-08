<template>
  <v-card class="calendar">
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
      <div class="events-grid">
        <grid></grid>
      </div>
  </v-card>
</template>

<script>
import grid from './grid'

export default {
  name: 'calendar',
  props: {
      msg: String
  },
  components: {
    grid
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


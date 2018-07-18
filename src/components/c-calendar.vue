<template>
  <v-card class="calendar">
    <div class="header">
      <div class="c-heading">
        <span class="icon">
          <i class="fas fa-calendar-alt icon"></i>
        </span>календарь
      </div>
      <div class="menu">
        <div class="date-switcher">
          <v-icon @click="switchWeek('prev')" class="controls">fas fa-angle-left</v-icon>
          <div class="current-period">
            <span>{{weekInfo.startMonth}}</span>
            <span 
            v-if="weekInfo.startYear != weekInfo.endYear">
              {{weekInfo.startYear}}
            </span>
            <span
            v-if="weekInfo.startMonth != weekInfo.endMonth">
              — {{weekInfo.endMonth}}
            </span>
            <span>
              {{weekInfo.endYear}}
            </span>
          </div>
          <v-icon @click="switchWeek('next')" class="controls">fas fa-angle-right</v-icon>
        </div>
        <v-tabs class="tabs">
          <v-tab>
            Неделя
          </v-tab>
          <v-tab>
            По комнатам
          </v-tab>
          <v-tab>
            Список
          </v-tab>
        </v-tabs>
      </div>
    </div>
    <events-grid :schedule="schedule" :dates="weekInfo.dates"></events-grid>
  </v-card>
</template>

<script>
import eventsGrid from "./events-grid";
import moment from "moment";
moment.locale("ru");

export default {
  name: "calendar",
  props: ["schedule"],
  components: {
    eventsGrid
  },
  data: function() {
    return {
      currentWeekDay: moment().toArray()
    };
  },
  methods: {
    switchWeek(dir) {
      var current = moment(this.currentWeekDay);
      dir == "next" ? current.add(7, "d") : current.subtract(7, "d");
      this.currentWeekDay = current.toArray();
    }
  },
  computed: {
    weekInfo() {
      var curr = moment(this.currentWeekDay);
      var dates = [];
      var startMonth, endMonth, startYear, endYear;

      for (let i = 1; i < 8; i++) {
        curr.isoWeekday(i);
        dates.push(curr.date());
        if (i == 1) {
          startMonth = curr.format("MMMM");
          startYear = curr.year();
        }
        if (i == 7) {
          endMonth = curr.format("MMMM");
          endYear = curr.year();
        }
      }

      return {
        dates,
        startMonth,
        endMonth,
        startYear,
        endYear
      };
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.calendar {
  margin-top: 5px;
  padding: 12px 24px;
  .header {
    display: flex;
    justify-content: space-between;
  }
  .menu {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    .date-switcher {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .current-period {
        font-size: 1.3em;
        color: #337ab7;
        padding: 0 10px;
        span {
          text-transform: capitalize;
        }
      }
      .controls {
        color: #337ab7;
      }
    }
  }
}
</style>


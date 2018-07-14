<template>
  <v-card class="calendar">
    <v-layout>
      <v-flex>

      </v-flex>
      <v-flex>

      </v-flex>
    </v-layout>
    <div class="header">
      <div class="c-heading">
        <i class="fas fa-calendar-alt"></i> Календарь</div>
      <div class="menu">
        <div class="date-switcher">
          <v-icon @click="switchWeek('prev')">fas fa-angle-left</v-icon>
          <v-icon @click="switchWeek('next')">fas fa-angle-right</v-icon>
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
        </div>

      </div>
    </div>
    <c-events-grid :schedule="schedule"></c-events-grid>
  </v-card>
</template>

<script>
import cEventsGrid from "./c-events-grid";
import moment from "moment";
moment.locale("ru");

export default {
  name: "calendar",
  props: ["schedule"],
  components: {
    cEventsGrid
  },
  data: function() {
    return {
      currentWeekDay: moment().toArray()
    };
  },
  created() {
    console.log(this.getWeekInfo);
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
    .current-period span {
      text-transform: capitalize;
    }
  }
  .date-switcher {
    display: flex;
  }
}
</style>


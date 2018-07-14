<template>
<div class="calendar">
  <div class="header">
    <div class="col-head">
      <div class="day" v-for="day in calendar" :key="`col-head-${day.date}`">
        <div class="day-name">{{day.day}}</div>
        <div class="is-curr" v-if="today == day.date"></div>
      </div>
      <div class="date"></div>
    </div>
  </div>
  <div class="events">
    <div class="column"></div>
  </div>
</div>
<!--     <v-container fluid class="calendar">
        <v-layout class="calendar-layout">
            <v-flex class="calendar-column" v-for="day in calendar" :key="`row-date-${day.date}`">
                <div class="head">
                    <div class="day">
                      <div class="day-name"></div>
                        {{day.day}}
                    </div>
                    <div class="date">
                        {{day.date}}
                    </div>
                </div>
                <div class="events">

                </div>
            </v-flex>
        </v-layout>
    </v-container> -->
</template>

<script>
import func from "../lib/func.js";

export default {
  name: "c-events-grid",
  props: ["schedule"],
  data: function() {
    return {
      today: null
    };
  },
  computed: {
    datesForWeek() {
      return null
    },
    weekSchedule() {
      var events = {
        "Пн": [],
        "Вт": [],
        "Ср": [],
        "Чт": [],
        "Пт": [],
        "Сб": [],
        "Вс": [],
      }
      for (let event of this.schedule) {
        const day = func.dayFromDate(event.startDate)
        events[day].push(event)
      }
      return events
    },
    calendar() {
      // dynamic date
      var calendar = [
        {
          day: "Пн",
          events: this.weekSchedule["Пн"]
        },
        {
          day: "Вт",
          events: this.weekSchedule["Вт"]
        },
        {
          day: "Ср",
          events: this.weekSchedule["Ср"]
        },
        {
          day: "Чт",
          events: this.weekSchedule["Чт"]
        },
        {
          day: "Пт",
          events: this.weekSchedule["Пт"]
        },
        {
          day: "Сб",
          events: this.weekSchedule["Сб"]
        },
        {
          day: "Вс",
          events: this.weekSchedule["Вс"]
        }
      ];
      return calendar
    }
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
.calendar /deep/ .calendar-column {
  border: 1px solid #e0e0e0;
  border-right: none;
}

.calendar /deep/ .calendar-column:last-child {
  border-right: 1px solid #e0e0e0;
}

.calendar /deep/ .head {
  border-bottom: 1px solid #e0e0e0;
}
</style>


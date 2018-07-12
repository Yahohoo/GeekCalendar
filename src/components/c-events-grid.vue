<template>
    <v-container fluid class="calendar">
        <v-layout class="calendar-layout">
            <v-flex class="calendar-column" v-for="day in calendar" :key="`row-date-${day.date}`">
                <div class="head">
                    <div class="day">
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
    </v-container>
</template>

<script>
export default {
  name: "c-events-grid",
  props: ["filteredEvents"],
  data: function() {
    return {};
  },
  computed: {
    calendar: function() {
      var calendar = [
        {
          day: "Пн",
          date: 1,
          events: []
        },
        {
          day: "Вт",
          date: 2,
          events: []
        },
        {
          day: "Ср",
          date: 3,
          events: []
        },
        {
          day: "Чт",
          date: 4,
          events: []
        },
        {
          day: "Пт",
          date: 5,
          events: []
        },
        {
          day: "Сб",
          date: 6,
          events: []
        },
        {
          day: "Вс",
          date: 7,
          events: []
        }
      ];
      return calendar
    }
  },
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


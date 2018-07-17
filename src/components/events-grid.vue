<template>
<div class="calendar-grid">
  <div class="grid">
    <div class="col" v-for="day in calendar" :key="`col-head-${day.date}`">
      <div class="col-head">
        <div class="wrapper">
          <div class="day-name">{{day.name}}</div>
          <div class="is-curr" v-if="today == day.date">Сегодня</div>
        </div>
      <div class="date">{{day.date}}</div>
      </div>
      <event-card class="event"
      v-for="event in weekSchedule[day.name]"
      :event="event"
      :key="`ev-${event.id}`"></event-card>  
    </div>
  </div>
</div>
</template>

<script>
import moment from "moment";
import eventCard from "./event-card";

export default {
  name: "events-grid",
  props: ["schedule", "dates"],
  components: {
    eventCard
  },
  data: function() {
    return {
      today: moment().date()
    };
  },
  computed: {
    weekSchedule() {
      var events = {
        пн: [],
        вт: [],
        ср: [],
        чт: [],
        пт: [],
        сб: [],
        вс: []
      };
      for (let event of this.schedule) {
        const day = moment(event.startDate).format('dd');
        events[day].push(event);
      }
      return events;
    },
    calendar() {
      // dynamic date
      var calendar = [
        {
          name: "пн",
          events: this.weekSchedule["пн"],
          date: this.dates[0]
        },
        {
          name: "вт",
          events: this.weekSchedule["вт"],
          date: this.dates[1]
        },
        {
          name: "ср",
          events: this.weekSchedule["ср"],
          date: this.dates[2]
        },
        {
          name: "чт",
          events: this.weekSchedule["чт"],
          date: this.dates[3]
        },
        {
          name: "пт",
          events: this.weekSchedule["пт"],
          date: this.dates[4]
        },
        {
          name: "сб",
          events: this.weekSchedule["сб"],
          date: this.dates[5]
        },
        {
          name: "вс",
          events: this.weekSchedule["вс"],
          date: this.dates[6]
        }
      ];
      return calendar;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.calendar-grid {
  height: 500px;
  overflow-y: scroll;
  .grid {
    display: flex;
    .col {
      flex: 1 1;
      .col-head {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 3px 1px -2px rgba(0, 0, 0, 0.12);
        position: sticky;
        z-index: 2;
        top: 0;
        color: #fff;
        background-color: #e57373;
        display: flex;
        border-right: 1px solid #0000001f;
        padding: 0 10px 0 6px;
        .wrapper {
          flex: 1 2;
          display: flex;
          flex-direction: column;
          padding-top: 16px;
          text-align: right;
          .day-name {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 1.2rem;
          }
          .is-curr {
            font-size: 0.7rem;
          }
        }
        .date {
          padding: 10px 5px 10px 0;
          font-weight: bold;
          font-size: 2rem;
          flex: 1 1;
          text-align: center;
        }
      }
    }
  }
}
</style>


<template>
    <v-container fluid>
        <v-layout>
            <v-flex v-for="day in calendar" :key="`row-date-${day.date}`">
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
  name: "grid",
  data: function() {
    return {
      calendar: [
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
      ]
    };
  }
};
</script>

<style>
</style>

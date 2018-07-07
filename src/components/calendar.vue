<template>
  <div class="calendar">
      <div class="header">
        <div class="heading"><i class="fas fa-calendar-alt"></i> Календарь</div>
        <div class="menu">
          <div class="date-picker">
            <button class="arrow-left"></button>
            <button class="arrow-right"></button>
            <div class="current-week"></div>
          </div>
          <div class="choose-rep"></div>
        </div>
      </div>
      <hr>
  </div>
</template>

<script>

  export default {
  name: 'calendar',
      props: {
          msg: String
      },
      components: {
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .filters {
    margin: 20px;
    border: 1px solid #000;
    border-radius: 2px;
  }
</style>


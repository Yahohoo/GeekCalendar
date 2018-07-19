<template>
<div class="event-card">
    <div class="header">
      <div class="time">
        {{timing}}
      </div>
      <i class="fas fa-wrench header-icon"></i>
    </div>
    <div class="subject">
      {{event.baseLesson.name}}
    </div>
    <div class="props">
      <div class="prop">
        <span class="icon"><i class="fas fa-map-marker-alt"></i></span>{{event.room.name}}
      </div>
      <div class="prop"
      v-if="event.teachersName.length && event.teachersName[0]">
        <span class="icon"><i class="fas fa-user-alt"></i></span>
        <div class="teachers">
          <div
          v-for="(name, i) in event.teachersName"
          :key="`${event.id}-name-${i}`">
            {{name}}
          </div>
        </div>
      </div>
      <div class="prop">
        <span class="icon"><i class="fas fa-child"></i></span>{{age}}
      </div>
    </div>
    <div class="buttons">
      <v-btn flat small>Запись</v-btn>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["event"],
  computed: {
    timing() {
      var start, end;
      var date = moment(this.event.startDate);
      start = date.format("HH:mm");
      date.add(this.event.baseLesson.duration, "m");
      end = date.format("HH:mm");
      return start + " - " + end;
    },
    age() {
      var min, max, type;
      const bl = this.event.baseLesson;
      if (bl.min_class) {
        min = bl.min_class;
        max = bl.max_class;
        type = " кл.";
      } else {
        min = bl.min_age;
        max = bl.max_age;
        type = "л.";
      }

      return `${min}-${max} ${type}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.event-card {
  min-width: 110px;
  margin: auto 2px;
  margin-top: 5px;
  position: relative;
  font-size: 12px;
  // border: 1px solid #0000001f;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  font-family: "Ubuntu", sans-serif;
  background-color: #b9f6ca;
  color: #37474f;
  padding: 5px 5px;
  &.no-entry {
    background-color: #b3e5fc;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    height: 24px;
    padding: 0 5px;
    border-radius: 12px;
    .time {
      font-weight: bold;
    }
    .header-icon {
      color: #f48fb1;
      font-size: 1.2em;
    }
  }
  .subject {
    color: #000000dd;
    padding: 5px 5px 0px 7px;
    font-weight: bold;
    text-transform: capitalize;
    font-size: 1.1em;
    // word-break: break-all; пока что не надо
    margin-bottom: 5px;
  }
  .props {
    margin: auto;
    max-width: 110px;
    text-align: left;
    .prop {
      display: flex;
      .icon {
        display: inline-block;
        width: 15px;
        text-align: center;
        margin-right: 3px;
      }
    }
  }
}
</style>

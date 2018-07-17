import moment from "moment"

const selectors = [
  {
    label: "Возраст",
    choicesFetcher(events) {
      var min, max, minLocal, maxLocal;
      min = Infinity;
      max = -1;
      for (let event of events) {
        minLocal = event.baseLesson.min_age;
        maxLocal = event.baseLesson.max_age;
        if (min < minLocal) {
          min = minLocal;
        }
        if (max > maxLocal) {
          max = maxLocal;
        }
      }
      var choices;
      for (let i = min; i <= max; i++) {
        choices.push(i);
      }
      return choices;
    },
    multi: true,
    event: {
      id: "age",
      eventType: "filter-between",
      dataFields: [
        ["baseLesson", "min_age"],
        ["baseLesson", "max_age"]
      ]
    }
  },
  {
    label: "Класс",
    choicesFetcher(events) {
      var min, max, minLocal, maxLocal;
      min = Infinity;
      max = -1;
      for (let event of events) {
        minLocal = event.baseLesson.min_age;
        maxLocal = event.baseLesson.max_age;
        if (min < minLocal) {
          min = minLocal;
        }
        if (max > maxLocal) {
          max = maxLocal;
        }
      }
      var choices;
      for (let i = min; i <= max; i++) {
        choices.push(i);
      }
      return choices;
    },
    multi: true,
    event: {
      id: "class",
      eventType: "filter-between",
      dataFields: [
        ["baseLesson", "min_class"],
        ["baseLesson", "max_class"]
      ]
    }
  },
  {
    label: "Статус",
    choices: ["Робо-1", "Шахматно-мат класс"],
    multi: false,
    event: {
      id: "status",
      eventType: "filter-equal",
      dataFields: ["room", "name"]
    }
  },
  {
    label: "Направление",
    choices: ["Робо-1", "Шахматно-мат класс"],
    multi: false,
    event: {
      id: "dir",
      eventType: "filter-equal",
      dataFields: ["room", "name"]
    }
  },
  {
    label: "Педагог",
    choices: ["Алексей Ильин", "Лев Юманов"],
    multi: false,
    event: {
      id: "teacher",
      eventType: "filter-in",
      dataFields: ["teachersName"]
    }
  },
  {
    label: "Помещение",
    choices: ["Робо-1", "Шахматно-мат класс"],
    multi: false,
    event: {
      id: "room",
      eventType: "filter-equal",
      dataFields: ["room", "name"]
    }
  },
  {
    label: "День недели",
    choices: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
    multi: true,
    event: {
      id: "day",
      eventType: "filter-equal",
      dataFields: ["startDate"],
      process: (date) => moment(date).format('dd')
    }
  }
]

export default {selectors};
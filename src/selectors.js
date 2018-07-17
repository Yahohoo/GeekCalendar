import moment from "moment"

// Данные для фильтра включают тип ивента для обновления фильтра
// fetcher - метод сбора данных, в считающем свойстве будет выполняться метод и присваиваться? нет, его буду брать отдельно по id из объекта свойства, которое будет перебирать, можно переписать emit и все остальное, чтобы созранить плоскость
// предусмотреть краевые случаи!!
// нужно ли это все вообще?


function getValue(event, fields, process = null) {
  var field = event;
  for (let fieldName of fields) {
    field = field[fieldName];
  }
  if (process) {
    field = process(field);
  }
  return field;
}

function rangeFetch(events, fieldsName) {
  var min, max, minLocal, maxLocal;
  min = Infinity;
  max = -1;
  for (let event of events) {
    minLocal = getValue(event, fieldsName[0]);
    maxLocal = getValue(event, fieldsName[1]);
    if (minLocal !== null && minLocal < min) {
      min = minLocal;
    }
    if (maxLocal !== null && maxLocal > max) {
      max = maxLocal;
    }
  }
  var choices = [];
  for (let i = min; i <= max; i++) {
    choices.push(i);
  }
  return choices;
}

function singleFetch(events, fieldsName) {
  var choices = []
  var value
  for (let event of events) {
    value = getValue(event, fieldsName)
    if (value !== null && !choices.includes(value)) {
      choices.push(value)
    }
  }
  return choices
}

function multiFetch(events, fieldsName) {
  var choices = []
  var values
  for (let event of events) {
    values = getValue(event, fieldsName)
    for (let value of values) {
      if (value !== null && !choices.includes(value)) {
        choices.push(value)
      }
    }
  }
  return choices
}

const selectors = [{
    label: "Возраст",
    choicesFetcher: rangeFetch,
    multi: true,
    id: "age",
    filterType: "filter-between",
    fieldsName: [
      ["baseLesson", "min_age"],
      ["baseLesson", "max_age"]
    ]
  },
  {
    label: "Класс",
    choicesFetcher: rangeFetch,
    multi: true,
    id: "class",
    filterType: "filter-between",
    fieldsName: [
      ["baseLesson", "min_class"],
      ["baseLesson", "max_class"]
    ]
  },
  {
    label: "Статус",
    choicesFetcher: () => [],
    multi: false,
    id: "status",
    filterType: "filter-equal",
    fieldsName: ["room", "name"]
  },
  {
    label: "Направление",
    choicesFetcher: singleFetch,
    multi: false,
    id: "dir",
    filterType: "filter-equal",
    fieldsName: ["direction"]
  },
  {
    label: "Педагог",
    choicesFetcher: multiFetch,
    multi: false,
    id: "teacher",
    filterType: "filter-in",
    fieldsName: ["teachersName"]
  },
  {
    label: "Помещение",
    choicesFetcher: singleFetch,
    multi: false,
    id: "room",
    filterType: "filter-equal",
    fieldsName: ["room", "name"]

  },
  {
    label: "День недели",
    choicesFetcher: () => ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
    multi: true,
    id: "day",
    filterType: "filter-equal",
    fieldsName: ["startDate"],
    process: (date) => moment(date).format('dd')
  }
]

export {
  selectors,
  getValue
};
import moment from "moment"

// Данные для фильтра включают тип ивента для обновления фильтра
// fetcher - метод сбора данных, в считающем свойстве будет выполняться метод и присваиваться? нет, его буду брать отдельно по id из объекта свойства, которое будет перебирать, можно переписать emit и все остальное, чтобы созранить плоскость
// предусмотреть краевые случаи!!
// нужно ли это все вообще?

const selectors = [{
    label: "Возраст",
    choicesFetcher: rangeFetch,
    multi: true,
    id: "age",
    filterMethod: filterBetween,
    fieldsName: [
      ["baseLesson", "min_age"],
      ["baseLesson", "max_age"]
    ],
    process: null
  },
  {
    label: "Класс",
    choicesFetcher: rangeFetch,
    multi: true,
    id: "class",
    filterMethod: filterBetween,
    fieldsName: [
      ["baseLesson", "min_class"],
      ["baseLesson", "max_class"]
    ],
    process: null
  },
  {
    label: "Статус",
    choicesFetcher: () => [],
    multi: false,
    id: "status",
    filterMethod: filterEqual,
    fieldsName: ["room", "name"],
    process: null
  },
  {
    label: "Направление",
    choicesFetcher: singleFetch,
    multi: false,
    id: "dir",
    filterMethod: filterEqual,
    fieldsName: ["direction"],
    process: null
  },
  {
    label: "Педагог",
    choicesFetcher: multiFetch,
    multi: false,
    id: "teacher",
    filterMethod: filterIn,
    fieldsName: ["teachersName"],
    process: null
  },
  {
    label: "Помещение",
    choicesFetcher: singleFetch,
    multi: false,
    id: "room",
    filterMethod: filterEqual,
    fieldsName: ["room", "name"],
    process: null
  },
  {
    label: "День недели",
    choicesFetcher: () => ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
    multi: true,
    id: "day",
    filterMethod: filterEqual,
    fieldsName: ["startDate"],
    process(date) {
      return moment(date).format('dd')
    }
  }
]

function rangeFetch(events) {
  const fields = this.fieldsName
  var min, max, minLocal, maxLocal;
  min = Infinity;
  max = -1;
  for (let event of events) {
    minLocal = getValue(event, fields[0]);
    maxLocal = getValue(event, fields[1]);
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

function singleFetch(events) {
  const fields = this.fieldsName
  var choices = []
  var value
  for (let event of events) {
    value = getValue(event, fields)
    if (value !== null && !choices.includes(value)) {
      choices.push(value)
    }
  }
  return choices
}

function multiFetch(events) {
  const fields = this.fieldsName
  var choices = []
  var values
  for (let event of events) {
    values = getValue(event, fields)
    for (let value of values) {
      if (value !== null && !choices.includes(value)) {
        choices.push(value)
      }
    }
  }
  return choices
}

function filterEqual(lesson, data) {
  var field = getValue(
    lesson,
    this.fieldsName,
    this.process
  );
  return data.some(el => field == el);
}

function filterIn(lesson, data) {
  const field = getValue(
    lesson,
    this.fieldsName,
    this.process
  );
  return data.some(el => field.includes(el));
}

function filterBetween(lesson, data) {
  const min = getValue(
    lesson,
    this.fieldsName[0],
    this.process
  );

  if (min === null) {
    return false;
  }

  const max = getValue(
    lesson,
    this.fieldsName[1],
    this.process
  );

  return data.some(el => min <= el && el <= max);
}

function getValue(event, fieldsName, process) {
  var field = event;
  for (let fieldName of fieldsName) {
    field = field[fieldName];
  }
  if (process) {
    field = process(field);
  }
  return field;
}

export {
  selectors
};
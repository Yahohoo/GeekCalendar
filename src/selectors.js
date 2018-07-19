import moment from "moment"

/* 
Каждый селектор - объект, который содержит все данные и логику, относящиеся к нему.
Логику предполагается формировать с помощью методов фильтрации данных и методов выборки.
Метод фильтрации применяется при взаимодействии пользователся с select. При изменении состояния селектора
(выбор пунктов, выбор поля, очистка поля) из компонента
 c-selector поднимается событие, которое содержит объект selector

Назначение полей на примере селектора "День недели":
  {
    // Название селектра, будет отображено пользователю
    label: "День недели",

    // Несколько вариантов выбора, галочками
    multi: true,

    // Идентификатор, используется при выборке вариантов
    // с choicesFetcher
    id: "day",

    // По этому полю идет доступ к данным в getValue
    // В массиве по порядку перечисляются поля
    // на пути к значению начиная от корня
    fieldsName: ["startDate"],

    // Метод для выборки вариантов ответа для пользователя
    // нужен, если варианты зависят от данных,
    // например, имена преподавателей
    choicesFetcher: () => [
      "пн", "вт", "ср", "чт", "пт", "сб", "вс"
    ],

    // Метод, с помощью которого определяется,
    // проходит ли какой-либо 
    // объект данных при текущих значениях селектора
    filterMethod: filterEqual,
    
    // метод используется, если для сырого значения,
    // полученного из поля нужна доп. обработка
    // для того, чтобы использовать их в методе filterMethod
    process(date) {
      return moment(date).format('dd')
    }
*/

const selectors = [{
    label: "Возраст",
    multi: true,
    id: "age",
    fieldsName: [
      ["baseLesson", "min_age"],
      ["baseLesson", "max_age"]
    ],
    choicesFetcher: rangeFetch,
    filterMethod: filterBetween,
    process: null
  },
  {
    label: "Класс",
    multi: true,
    id: "class",
    fieldsName: [
      ["baseLesson", "min_class"],
      ["baseLesson", "max_class"]
    ],
    choicesFetcher: rangeFetch,
    filterMethod: filterBetween,
    process: null
  },
  {
    label: "Статус",
    multi: false,
    id: "status",
    fieldsName: ["room", "name"],
    choicesFetcher: () => [],
    filterMethod: filterEqual,
    process: null
  },
  {
    label: "Направление",
    multi: false,
    id: "dir",
    choicesFetcher: singleFetch,
    fieldsName: ["direction"],
    filterMethod: filterEqual,
    process: null
  },
  {
    label: "Педагог",
    multi: false,
    id: "teacher",
    fieldsName: ["teachersName"],
    choicesFetcher: multiFetch,
    filterMethod: filterIn,
    process: null
  },
  {
    label: "Помещение",
    multi: false,
    id: "room",
    fieldsName: ["room", "name"],
    choicesFetcher: singleFetch,
    filterMethod: filterEqual,
    process: null
  },
  {
    label: "День недели",
    multi: true,
    id: "day",
    fieldsName: ["startDate"],
    choicesFetcher: () => [
      "пн", "вт", "ср", "чт", "пт", "сб", "вс"
    ],
    filterMethod: filterEqual,
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
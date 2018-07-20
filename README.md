# Geek календарь

## Запуск

Для запуска потребуется Vue CLI

[Инструкция по установке](https://cli.vuejs.org/guide/installation.html).
После установки вы можете воспользоватся командами:
```bash
# из корня папки
# для запуска live-режима
$ vue serve /src/main.js
# для запуска сборки prod-ready файлов в папку dist
$ vue build /src/main.js 
```

## Документация

Текущие проблемы и задачи перечислены в todo

При изменении схемы данных, добавлении/удалении фильтров следует редактировать файл `selectors.js`. В нем содержатся пояснения и некоторая дополнительная информация.
Приложение осоновано на фильтрах, варианты отображения данных можно менять, создавая/изменяя компонент c-calendar. Компонент отображения будет получать в качестве аргумента вычислимое свойство, а там уже можно делать что душе угодно.
 
Варианты отображения данных можно менять, создавая/изменяя компонент c-calendar. В целом, есть возможность использовать систему фильтров для любых данных, которые содержатся в json. Вся логика каждого фильтра, включая методы для выборки, преобразования и непосредственной фильтрации данных, хранится и создается отдельно в `selectors.js`

## 
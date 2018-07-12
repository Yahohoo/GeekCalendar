export default {
    dayFromDate(date) {
        date = new Date(date)

        const daysOfWeek = {
            1: "Пн",
            2: "Вт",
            3: "Ср",
            4: "Чт",
            5: "Пт",
            6: "Сб",
            0: "Вс"
        }

        const day = date.getDay()
        return daysOfWeek[day]
    }
}
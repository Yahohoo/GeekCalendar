export default {
    dayFromDate(date) {
        date = new Date(date)

        const daysOfWeek = {
            1: "пн",
            2: "вт",
            3: "ср",
            4: "чт",
            5: "пт",
            6: "сб",
            0: "вс"
        }

        const day = date.getDay()
        return daysOfWeek[day]
    }
}
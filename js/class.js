// Клас API---------
class loadAPI { // Клас по API
    constructor(urlAPI) {
        this.urlAPI = urlAPI
    }
    async load_API(function_obj) {//Загальний API
        const response = await fetch(this.urlAPI)
        const data = await response.json()
        console.log(data)
        //    ------------
        function_obj(data)
        //    ------------
    }
    async load_Weather(function_weather, city_weather = 'Рівне') {//Погодний API
        let urlWeather = `http://api.openweathermap.org/data/2.5/weather?q=${city_weather}&appid=67c0943dd192282f796a8f4803af40f9&lang=ua&units=metric`;
        try {
            const response = await fetch(urlWeather)
            const data = await response.json()
            console.log(data)
            if (data.cod != 200) { alert(data.message) }
            else {
                function_weather(data)
            }
            //    ------------
        }
        catch (error) {
            console.log(error)
        }
    }
}
// ----Класс  для виводу календарних даних---
class Time {
    constructor(todey) {
        this.day = todey.getDay()
        this.month = todey.getMonth()
        this.date = todey.getDate()
        this.hours = todey.getHours()
        this.minutes = todey.getMinutes()
        this.sec = todey.getSeconds()
        this.years = todey.getFullYear()
    }
    nullCreate(obj) {//метод додавання 0
        if (obj < 10) { return `0${obj}` }
        else { return obj }
    }
    showLocation() { // вивід календарних даних
        let hoursLocal = document.querySelector('.country-span')
        let dataLocal = document.querySelector('.data-p')
        hoursLocal.textContent = `${this.nullCreate(this.hours)}:${this.nullCreate(this.minutes)}`
        dataLocal.textContent = `${this.nullCreate(this.date)}.${this.nullCreate(this.month+1)}.${this.nullCreate(this.years)}`

    }
    showFooter(){//Виводить рік у футері
        let footer = document.querySelector('.footer-top')
        creatElemHtml('P', footer, 'footer-p', 'beforeend', `Copyright &copy${this.years}`)
        console.log(footer)
    }
}

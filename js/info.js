// ----------------------------------------------------
let city_name = 'Рівне'
let ip_user = 10;
creatElem('DIV', asideRight, 'location-div', 'beforeend')
// ----------------Визначення по IP------------------------------
let urlIP = 'https://api64.ipify.org?format=json'
let local_IP = new loadAPI(urlIP);
local_IP.load_API((obj) => {
    let url_IP_city = `http://ipwhois.app/json/${obj.ip}?lang=ru`
    let local_IP_city = new loadAPI(url_IP_city);
    local_IP_city.load_API((obj) => {
        obj.city
        console.log(obj.city)
        creatElemText('H4', document.querySelector('.location-div'), 'country-h4', 'beforeend', obj.city)
        creatElemText('SPAN', document.querySelector('.country-h4'), 'country-span', 'beforeend', '  15:00')
        creatElemText('P', document.querySelector('.location-div'), 'data-p', 'beforeend', ' 20.02.2021')
    })
})
// ----------------------------------------------
function load_time() {
    setInterval(() => {
        let time = new Time(new Date())
        time.showLocation()
    }, 1000)
}
load_time();
// -------------------Погода-----------------------------------------
creatElem('DIV', asideRight, 'weather-title', 'beforeend')
creatElemText('H5', document.querySelector('.weather-title'), 'aside-right-title', 'beforeend', `Погода`)
creatElemAtr('INPUT', document.querySelector('.weather-title'), 'input-city', 'beforeend', 'type', 'text')
creatElem('I', document.querySelector('.weather-title'), 'i-search', 'beforeend')
document.querySelector('.i-search').classList.add('fas', 'fa-search-location')

let city_input = document.querySelector('.input-city');
city_input.value = 'Рівне'
creatElem('DIV', asideRight, 'weather-div', 'beforeend')
creatElem('DIV', document.querySelector('.weather-div'), 'valute-div', 'afterend')
creatElemText('H5', document.querySelector('.weather-div'), 'aside-right-title', 'afterend', 'Курс валют')
// ------------------------------
let weather = new loadAPI();
// ------------------------------
weather.load_Weather(showWeather, city_input.value);
function showWeather(obj) {

    creatElem('DIV', document.querySelector('.weather-div'), 'temperature-div', 'beforeend')
    creatElemText('P', document.querySelector('.temperature-div'), 'temperature-p', 'beforeend', `${Math.round(obj.main.temp)}°C`)
    creatElem('DIV', document.querySelector('.weather-div'), 'img-div', 'beforeend')
    let srcImg = `http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`;
    creatElemAtr('IMG', document.querySelector('.img-div'), 'img-weather', 'beforeend', 'src', srcImg);
    creatElemText('p', document.querySelector('.img-div'), 'descr-weather', 'beforeend', `${obj.weather[0].description}`)
    creatElem('DIV', document.querySelector('.weather-div'), 'info-div', 'beforeend')
    creatElem('UL', document.querySelector('.info-div'), 'info-list', 'beforeend')

    creatElemHtml('LI', document.querySelector('.info-list'), 'info-li', 'beforeend', `Вологість: <span>${obj.main.humidity} %</span>`)
    creatElemHtml('LI', document.querySelector('.info-list'), 'info-li', 'beforeend', `Тиск: <span>${Math.round(obj.main.pressure * 0.75)} мм.рт.ст</span>`)
    creatElemHtml('LI', document.querySelector('.info-list'), 'info-li', 'beforeend', `Вітер: <span>${obj.wind.speed.toFixed(1)} м/c, ${windDirect(obj.wind.deg)}</span><i class="fas fa-arrow-circle-down arow-wind"></i> `)
    document.querySelector('.arow-wind').style.transform = `rotate(${obj.wind.deg}deg)`

}
// ------------------------------
function windDirect(direct) {//метод виводимо направлення вітру в буквах 
    let val = Math.floor((direct / 45) + 0.5);
    let directWind = ['Пн', 'Пн-С', 'Схід', 'Пд-С', 'Пд', 'Пд-З', 'Зах', 'Пн-З'];
    return directWind[val % 8];
}
// ----------Вибор погоди по місту---------------------
document.querySelector('.input-city').addEventListener('change', function () {
    ContainerRemove(document.querySelector('.weather-div'))
    weather.load_Weather(showWeather, city_input.value);
    console.log(city_input)
})
// --------------------------Курс валют----------------------------------
let urlVal = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
let valuta = new loadAPI(urlVal);
valuta.load_API((obj) => {
    let arrTitleTable = ['', '', 'Купівля', 'Продаж'];
    creatElem('TABLE', document.querySelector('.valute-div'), 'table-valute', 'beforeend')
    creatElem('TR', document.querySelector('.table-valute'), 'tr-title', 'beforeend')
    for (let i = 0; i < arrTitleTable.length; i++) {
        creatElemText('TD', document.querySelector('.tr-title'), 'td-title', 'beforeend', arrTitleTable[i])
    }
    for (object of obj) {
        let tr = document.createElement('TR');
        for (key in object) {
            let td = document.createElement('TD');
            if (!isNaN(object[key])) {
                let val = +object[key];

                td.textContent = val.toFixed(2);
            }
            else {

                td.textContent = object[key];
            }
            tr.appendChild(td);
        }
        document.querySelector('.table-valute').append(tr)
    }
});
// -----------Корона інфо------------
creatElem('DIV', document.querySelector('.valute-div'), 'corona-title', 'afterend')
creatElemText('H5', document.querySelector('.corona-title'), 'aside-right-title', 'beforeend', 'COVID-19')
creatElem('DIV', document.querySelector('.corona-title'), 'corona-div', 'afterend')
creatElemText('P', document.querySelector('.corona-div'), 'corona-info', 'beforeend', 'В світі')
creatElem('DIV', document.querySelector('.corona-info'), 'corona-world', 'afterend')
document.querySelector('.corona-world').classList.add('world-div');
creatElemText('P', document.querySelector('.world-div'), 'corona-ua', 'afterend', 'В Україні')
creatElem('DIV', document.querySelector('.corona-ua'), 'ua-div', 'afterend')
document.querySelector('.ua-div').classList.add('corona-world');
let urlCorAll = `https://api.covid19api.com/summary`;
// let urlCorUa = `https://covid19-api.org/api/diff/UA`;
// let urlCorUa = `https://covid19-api.org/api/status/UA`;

let coronaAll = new loadAPI(urlCorAll);
coronaAll.load_API((obj) => {
    //В світі
    creatElemHtml('DIV', document.querySelector('.corona-world'), 'corona-confir', 'beforeend', `Інфіковано<h6>${obj.Global.TotalConfirmed}</h6> <p>+${obj.Global.NewConfirmed}</p>`)
    creatElemHtml('DIV', document.querySelector('.corona-world'), 'corona-recov', 'beforeend', `Одужало<h6>${obj.Global.TotalRecovered}</h6> <p>+${obj.Global.NewRecovered}</p>`)
    creatElemHtml('DIV', document.querySelector('.corona-world'), 'corona-death', 'beforeend', `Померло<h6>${obj.Global.TotalDeaths}(${(obj.Global.TotalDeaths*100/obj.Global.TotalConfirmed).toFixed(1)})%</h6> <p>+${obj.Global.NewDeaths}(${(obj.Global.NewDeaths*100/obj.Global.NewConfirmed).toFixed(1)})%</p>`)
    // в Укрaїні
    for (let i = 0; i < obj.Countries.length; i++) {
        if (obj.Countries[i].CountryCode == 'UA') {
            creatElemHtml('DIV', document.querySelector('.ua-div'), 'corona-confir', 'beforeend', `<h6>${obj.Countries[i].TotalConfirmed}</h6> <p>+${obj.Countries[i].NewConfirmed}</p>`)
            creatElemHtml('DIV', document.querySelector('.ua-div'), 'corona-recov', 'beforeend', `<h6>${obj.Countries[i].TotalRecovered}</h6> <p>+${obj.Countries[i].NewRecovered}</p>`)
            creatElemHtml('DIV', document.querySelector('.ua-div'), 'corona-death', 'beforeend', `<h6>${obj.Countries[i].TotalDeaths}(${(obj.Countries[i].TotalDeaths*100/obj.Countries[i].TotalConfirmed).toFixed(1)})%</h6> <p>+${obj.Countries[i].NewDeaths}(${(obj.Countries[i].NewDeaths*100/obj.Countries[i].NewConfirmed).toFixed(1)})%</p>`)
        }
    }

});
// -----------Знаки зодиаку------------

creatElem('DIV', document.querySelector('.corona-div'), 'zodiak-title', 'afterend')
creatElemText('H5', document.querySelector('.zodiak-title'), 'aside-right-title', 'beforeend', 'Знак задіака')
creatElem('DIV', document.querySelector('.zodiak-title'), 'zodiak-div', 'afterend')
let arrZodiak = ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png', 'img/6.png', 'img/7.png', 'img/8.png', 'img/9.png', 'img/10.png', 'img/11.png', 'img/12.png'];
let arrZodName = ['Овер', 'Телець', 'Близнюки', 'Рак', 'Лев', 'Діва', 'Терези', 'Скорпіон', 'Стрілець', 'Козоріг', 'Водолій', 'Риби'];
let arrZodUrl = [
    'https://orakul.com/horoscope/astrologic/general/aries/today.html',
    'https://orakul.com/horoscope/astrologic/general/taurus/today.html',
    'https://orakul.com/horoscope/astrologic/general/gemini/today.html',
    'https://orakul.com/horoscope/astrologic/general/cancer/today.html',
    'https://orakul.com/horoscope/astrologic/general/lion/today.html',
    'https://orakul.com/horoscope/astrologic/general/virgo/today.html',
    'https://orakul.com/horoscope/astrologic/general/libra/today.html',
    'https://orakul.com/horoscope/astrologic/general/scorpio/today.html',
    'https://orakul.com/horoscope/astrologic/general/sagittarius/today.html',
    'https://orakul.com/horoscope/astrologic/general/capricorn/today.html',
    'https://orakul.com/horoscope/astrologic/general/aquarius/today.html',
    'https://orakul.com/horoscope/astrologic/general/pisces/today.html'
]
for (let i = 0; i < arrZodiak.length; i++) {
    creatElem('DIV', document.querySelector('.zodiak-div'), `znak-${i}`, 'beforeend')
    document.querySelector(`.znak-${i}`).classList.add('znak-div');
    creatElemAtr('IMG', document.querySelector(`.znak-${i}`), 'znak-img', 'beforeend', 'src', arrZodiak[i])
    creatElemText('P', document.querySelector(`.znak-${i}`), 'znak-name', 'beforeend', arrZodName[i])
}
for (let i = 0; i < arrZodName.length; i++) {
    document.querySelector(`.znak-${i}`).addEventListener('click', () => {
        window.location.href = arrZodUrl[i];
    })
}
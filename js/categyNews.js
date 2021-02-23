// let key_news = `6a98f8309087427598cfab7b6dcb84ad`;//777
let key_news = `23051c5d7b8a4cc8960bf32511403bed`;//103101
let country = ['ua', 'ru', 'us']
let arrCategory = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology']
let arrNav = document.querySelectorAll('.nav-list li')
let arrCount = document.querySelectorAll('.country-list li')
// ---------------Замовчування------------------
arrNav[0].classList.add('active');
arrCount[0].classList.add('active-country')
let category_item = 0;
let country_item = 0;
let cc = [];
let urlNewsCaregor = `http://newsapi.org/v2/top-headlines?country=${country[country_item]}&apiKey=${key_news}`;
let newsCategor = new loadAPI(urlNewsCaregor);
newsCategor.load_API(showNewsCategory);
// ---------------Пошук новин---------------------------
search_news.addEventListener('change', function () {
    for (let i = 0; i < arrNav.length; i++) {//удаляємо клас active
        arrNav[i].classList.remove('active');
    }
    let container = document.querySelector('.section-news');
    ContainerRemove(container)
    urlNewsCaregor = `http://newsapi.org/v2/everything?q=${this.value}&sortBy=popularity&apiKey=${key_news}`
    newsCategor = new loadAPI(urlNewsCaregor);
    newsCategor.load_API(showNewsCategory);

})
icon_search.addEventListener('click', function () {
    for (let i = 0; i < arrNav.length; i++) {//удаляємо клас active
        arrNav[i].classList.remove('active');
    }
    ContainerRemove(container)
    urlNewsCaregor = `http://newsapi.org/v2/everything?q=${search_news.value}&sortBy=popularity&apiKey=${key_news}`
    newsCategor = new loadAPI(urlNewsCaregor);
    newsCategor.load_API(showNewsCategory);

})
// ---------------Вибір країни---------------------------
for (let i = 0; i < arrCount.length; i++) {
    arrCount[i].addEventListener('click', function () {
        for (let i = 0; i < arrCount.length; i++) {//удаляємо клас active-country
            arrCount[i].classList.remove('active-country');
        }
        let container = document.querySelector('.section-news');
        ContainerRemove(container)
        arrCount[i].classList.add('active-country')
        urlNewsCaregor = `http://newsapi.org/v2/top-headlines?country=${country[i]}&category=${arrCategory[category_item]}&apiKey=${key_news}`;
        country_item = i;
        console.log('ELSE')
        newsCategor = new loadAPI(urlNewsCaregor);
        newsCategor.load_API(showNewsCategory);
        search_news.value = '';
        // console.log(category_item)
    })
}
// -----------------навігація по категоріям-------------------------

for (let i = 0; i < arrNav.length; i++) {
    arrNav[i].addEventListener('click', function () {//навігація по категоріям

        for (let i = 0; i < arrNav.length; i++) {//удаляємо клас active
            arrNav[i].classList.remove('active');
        }
        let container = document.querySelector('.section-news');
        ContainerRemove(container)
        startWire();
        arrNav[i].classList.add('active')
        urlNewsCaregor = `http://newsapi.org/v2/top-headlines?country=${country[country_item]}&category=${arrCategory[i]}&apiKey=${key_news}`;
        category_item = i;
        console.log('ELSE')
        newsCategor = new loadAPI(urlNewsCaregor);
        newsCategor.load_API(showNewsCategory);
        search_news.value = '';
    })
}
// ----Функція видалення основних новин по категоріям
function ContainerRemove(obj) {
    while (obj.firstChild) {
        obj.removeChild(obj.firstChild)
    }
}

// ----Функція виведення основних новин по категоріям
function showNewsCategory(obj) {

    creatElem('DIV', section, 'title-category', 'beforeend')
    creatElemText('H2', document.querySelector('.title-category'), 'title-text', 'beforeend', 'Новини дня')
    for (let i = 0; i < obj.articles.length; i++) {
        creatElem('ARTICLE', section, `article-${i}`, 'beforeend')
        document.querySelector(`.article-${i}`).classList.add('article-category', 'row')
        creatElemAtr('IMG', document.querySelector(`.article-${i}`), `img-category`, 'beforeend', 'src', `${obj.articles[i].urlToImage}`)
        document.querySelector(`.article-${i} .img-category`).classList.add('col-5')
        creatElem('DIV', document.querySelector(`.article-${i}`), `div-category-${i}`, 'beforeend')
        document.querySelector(`.div-category-${i}`).classList.add('col-7')
        creatElemText('DIV', document.querySelector(`.div-category-${i}`), 'author-category', 'beforeend', obj.articles[i].source.name)
        let title_category = obj.articles[i].title;
        creatElemAtr('A', document.querySelector(`.div-category-${i}`), 'a-category', 'beforeend', 'href', `${obj.articles[i].url}`)
        document.querySelector(`.div-category-${i} .a-category`).textContent = title_category.substr(0, title_category.indexOf('-'))
        let date_category = obj.articles[i].publishedAt;
        creatElemText('P', document.querySelector(`.div-category-${i}`), 'data-category', 'beforeend', date_category.substr(0, date_category.indexOf('T')))
        creatElemText('P', document.querySelector(`.div-category-${i}`), 'p-category', 'beforeend', `${obj.articles[i].description}`)
        cc[i] = title_category.substr(0, title_category.indexOf('-'));

    }

    startWire();
}
// ---Вивід Info---------
console.log(cc)
creatElemText('P', document.querySelector('.inforun-div'), 'inforun-p', 'beforeend', 'НОВИНИ')
let Info = document.querySelector('.inforun-p')
console.log(Info)
let speed = 90;
let pause = 1500;
let timerID = null;
let wireRunning = false;
let currentMessage = 0;
let offset = 0;

function stopWrite() {
    if (wireRunning)
        clearTimeout(timerID);
    wireRunning = false;
}
function startWire() {
    stopWrite();
    showWire();
}
function showWire() {
    let text = cc[currentMessage];
    if (offset < text.length) {
        if (text.charAt(offset) == " ")
            offset++;
        let partialMessage = text.substring(0, offset + 1);
        Info.innerHTML = partialMessage;
        offset++;
        timerID = setTimeout("showWire()", speed);
        wireRunning = true
    }
    else {
        offset = 0;
        currentMessage++;
        if (currentMessage == cc.length)
            currentMessage = 0;
        timerID = setTimeout("showWire()", pause);
        wireRunning = true
    }
}
// -----footer---------
let years_footer = new Time(new Date())
years_footer.showFooter();
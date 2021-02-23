//--Робота з header---
// ----header-top--------
let arrCountry = ['Україна', 'Росія', 'США']
creatElem('h1', headerTop, 'h1-icon', 'beforeend');
document.querySelector('.h1-icon').innerHTML = '<span>The whole</span> world news'
creatElem('UL', headerTop, 'country-list', 'beforeend');
for (let i = 0; i < arrCountry.length; i++) {
    creatElem('LI', document.querySelector('.country-list'), `list-county${i}`, 'beforeend');
    document.querySelector(`.list-county${i}`).textContent = arrCountry[i];
}
creatElem('IMG', headerTop, 'img-icon', 'beforeend');
document.querySelector('.img-icon').src = 'img/icon_header.png'
// -----header-nav---------
let arrUlNav = ['Головне', 'Бізнес', 'Розваги', 'Здоров’я', 'Наука', 'Спорт', 'Технології'];
creatElem('UL', headerNav, 'nav-list', 'beforeend');
for (let i = 0; i < arrUlNav.length; i++) {
    creatElem('LI', document.querySelector('.nav-list'), `list-${i}`, 'beforeend');
    document.querySelector(`.list-${i}`).textContent = arrUlNav[i];
}
creatElemAtr('INPUT', document.querySelector('.nav-list'), 'input-news', 'afterend', 'type', 'text')
creatElem('I', document.querySelector('.input-news'), 'news-search', 'afterend')
let search_news = document.querySelector('.input-news');
document.querySelector('.news-search').classList.add('fas', 'fa-search')
let icon_search = document.querySelector('.news-search')
// -----header-info---------
creatElem('DIV', headerInfo, 'inforun-div', 'beforeend')



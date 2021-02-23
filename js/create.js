// --Створення структури сторінки
// ----------------------------------------------------
let body = document.querySelector('body')
console.log(body)
// ----------------------------------------------------
/*elem-елемент який створюється
where -  в що вставляється
classElem - клас елемента
metod-куда вставляється
text - текст
atr - атрибут
img - зсилка
html-текст із тегами
*/
function creatElem(elem, where, classElem, metod) {
    let crEl = document.createElement(elem);
    crEl.classList.add(classElem);
    where.insertAdjacentElement(metod, crEl)
}
// ----------------------------------------------------
function creatElemText(elem, where, classElem, metod, text) {
    let crEl = document.createElement(elem);
    crEl.classList.add(classElem);
    crEl.textContent = text;
    where.insertAdjacentElement(metod, crEl)
}
// ----------------------------------------------------
function creatElemHtml(elem, where, classElem, metod, html) {
    let crEl = document.createElement(elem);
    crEl.classList.add(classElem);
    crEl.innerHTML = html;
    where.insertAdjacentElement(metod, crEl)
}
// ----------------------------------------------------
function creatElemAtr(elem, where, classElem, metod, atr, url) {
    let crEl = document.createElement(elem);
    crEl.classList.add(classElem);
    crEl.setAttribute(atr, url);
    where.insertAdjacentElement(metod, crEl)
}
// -------------------Heder top---------------------------------------
creatElem('HEADER', body, `container`, 'afterbegin');
let header = document.querySelector('header')
creatElem('DIV', header, `row`, 'afterbegin');
creatElem('DIV', document.querySelector('header .row'), `header-top`, 'afterbegin');
let headerTop = document.querySelector('header .row .header-top')
headerTop.classList.add('col-12')
// -------------------Heder nav---------------------------------------
creatElem('DIV', headerTop, `header-nav`, 'afterend');
let headerNav = document.querySelector('header .row .header-nav')
headerNav.classList.add('col-12')
// -------------------Heder bg---------------------------------------
creatElem('DIV', headerNav, `header-bg`, 'afterend');
let headerBg = document.querySelector('header .row .header-bg')
headerBg.classList.add('col-12')
// -------------------------------------------------
// -------------------info---------------------------------------
creatElem('DIV', headerBg, `header-info`, 'afterend');
let headerInfo = document.querySelector('header .row .header-info')
headerInfo.classList.add('col-12')
// -------------------main---------------------------------------
creatElem('MAIN', header, `container`, 'afterend');
let main = document.querySelector('main')
creatElem('DIV', main, `row`, 'afterbegin');
// --Left aside--------------
creatElem('ASIDE', document.querySelector('main .row'), `aside-left`, 'beforeend');
let asideLeft = document.querySelector('.aside-left');
asideLeft.classList.add('col-0');
// -----------------------
// --section--------------
creatElem('SECTION', asideLeft, `col-9`, 'afterend');
let section = document.querySelector('section');
section.classList.add('section-news')
// -----------------------
// --Right aside--------------
creatElem('ASIDE', section, `aside-right`, 'afterend');
let asideRight = document.querySelector('.aside-right');
asideRight.classList.add('col-3');
// -------------------footer---------------------------------------
creatElem('FOOTER', main, `container`, 'afterend');
creatElem('DIV', document.querySelector('footer'), `row`, 'afterbegin');
creatElem('DIV', document.querySelector('footer .row'), `footer-top`, 'afterbegin');
let footerTop = document.querySelector('.footer-top');
footerTop.classList.add('col-12')

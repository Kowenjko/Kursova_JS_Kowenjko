
let urlNews = `http://newsapi.org/v2/top-headlines?language=ru&apiKey=${key_news}`;
let news = new loadAPI(urlNews);
news.load_API(showNewsRuning);

// ----Функція додовання інформації до бігучої ленти 
function showNewsRuning(obj) { 
    creatElem('UL', headerBg, 'ul-bg', 'beforeend')
    // headerBg.style.backgroundImage = `url(${obj.articles[0].urlToImage})`
    createLi(obj.articles.length);//Виводи основний список новин
    createLi(3);// Добавляємо 3 початкові в кінець що виводити по кругу
    function createLi(item) {
        for (let i = 0; i < item; i++) {
            let srcImg = obj.articles[i].urlToImage;
            let li = document.createElement('LI');
            let div_author = document.createElement('DIV');//Блок  хто автор
            let a_list_title = document.createElement('A'); // зсилка на новини
            let span_list_date = document.createElement('SPAN'); // дата публікації

            div_author.classList.add('li-author')
            div_author.textContent = obj.articles[i].source.name;
            a_list_title.setAttribute('href', `${obj.articles[i].url}`)

            let title_list = obj.articles[i].title;
            let list_date = obj.articles[i].publishedAt


            a_list_title.textContent = title_list.substr(0, title_list.indexOf('-'));//Удаляємо все після '-'
            span_list_date.textContent = list_date.substr(0, list_date.indexOf('T'));//Удаляємо все після 'T'
            li.style.backgroundImage = `url(${srcImg})`

            li.append(div_author)
            li.append(a_list_title)
            li.append(span_list_date)
            document.querySelector('.ul-bg').insertAdjacentElement('beforeend', li);
            li.style.width = `${headerBg.offsetWidth / 3}px`
        }
    }
    document.querySelector('.ul-bg').style.whidth = `${(headerBg.offsetWidth / 3) * obj.articles.length}px`
    showImgNews();
}

// ----Функція виведення бігучої ленти новин
function showImgNews() {//Варіант 1 
    let ul = document.querySelector('.ul-bg');
    let li = document.querySelectorAll('.ul-bg li')
    let widthItem = 0;
    let widthLi = headerBg.offsetWidth / 3;
    let widthUl = widthLi * (li.length + 1);
    console.log(widthUl)
    console.log(widthLi)
    function showImg() {
        if ((widthItem < (widthUl - widthLi * 3))) {
            ul.style.left = `-${widthItem}px`
            ul.style.transition = '2s linear'
            setTimeout(showImg, 4000);
        }
        else {
            widthItem = 0;
            ul.style.left = `-${widthItem}px`
            ul.style.transition = '0s linear'
            setTimeout(showImg, 0);
        }
        widthItem += widthLi;
    }
    showImg()
}
// ----------------

// function showImgNews() { //Варіант 2
//     let timeOnSlide = 4,//4
//         timeBetweenSlides = 2,//2
//         animationstring = 'animation',
//         animation = false,
//         keyframeprefix = '',
//         domPrefixes = 'Webkit Moz O Khtml'.split(' '),
//         pfx = ''
//     let slidy = document.querySelector('.ul-bg')
//     if (slidy.style.animationName !== undefined) { animation = true; }
//     if (animation === false) {
//         for (let i = 0; i < domPrefixes.length; i++) {
//             if (slidy.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
//                 pfx = domPrefixes[i];
//                 animationstring = pfx + 'Animation';
//                 keyframeprefix = '-' + pfx.toLowerCase() + '-';
//                 animation = true;
//                 break;
//             }
//         }
//     }

//     if (animation === false) {
//     } else {
//         let images = document.querySelectorAll('.ul-bg li')
//         // firstImg = images[0],
//         //     firstImg_1 = images[1],
//         //     imgWrap = firstImg.cloneNode(false),
//         //     imgWrap_1 = firstImg_1.cloneNode(false),
//         //     slidy.appendChild(imgWrap);
//         // slidy.appendChild(imgWrap_1);
//         let imgCount = images.length - 2,//визначаємо де закінчиться картинка
//             totalTime = (timeOnSlide + timeBetweenSlides) * (imgCount - 1),
//             slideRatio = (timeOnSlide / totalTime) * 100,
//             moveRatio = (timeBetweenSlides / totalTime) * 100,
//             basePercentage = 100 / imgCount,
//             position = 0,
//             css = document.createElement("style");
//         console.log(imgCount)
//         css.type = "text/css";
//         css.innerHTML += ".ul-bg { text-align: left; margin: 0; font-size: 0; position: relative; width: " + (imgCount * 100) + "%; }\n";
//         css.innerHTML += ".ul-bg li { float: left; width: " + basePercentage + "%; }\n";
//         css.innerHTML += "@" + keyframeprefix + "keyframes slidy {\n";
//         for (i = 0; i < (imgCount - 1); i++) {
//             position += slideRatio;
//             css.innerHTML += position + "% { left: -" + (i * 100 / 3) + "%; }\n";
//             position += moveRatio;
//             css.innerHTML += position + "% { left: -" + ((i + 1) * 100 / 3) + "%; }\n";
//         }
//         css.innerHTML += "}\n";
//         css.innerHTML += ".ul-bg { left: 0%; " + keyframeprefix + "transform: translate3d(0,0,0); " + keyframeprefix + "animation: " + totalTime + "s slidy infinite; }\n";
//         document.body.appendChild(css);
//     }
// }




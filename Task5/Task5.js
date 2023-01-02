//Загрузка данных из localStorage
function reloadPage(){
    if(localStorage.getItem('images') != null){
        div.innerHTML = localStorage.getItem('images');
    }
    if(localStorage.getItem('limit') != null){
        limitInput.value = localStorage.getItem('limit');
    }
    if(localStorage.getItem('strNum') != null){
        strNumInput.value = localStorage.getItem('strNum');
    }
}

const div = document.querySelector('.request-result');
const button = document.querySelector('.button');
const limitInput = document.querySelector('.input-2');
const strNumInput = document.querySelector('.input-1');

reloadPage();

//Создание промисов
function createPromise(limit, strNum){
    const limitPromise = new Promise((resolve) => {
        if(+limit < 1 || +limit > 10 || isNaN(limit)){
            resolve(false);
        } else {
            resolve(limit);
        }
    });
    
    const strNumPromise = new Promise((resolve) => {
        if(+strNum < 1 || +strNum > 10 || isNaN(strNum)){
            resolve(false);
        } else {
            resolve(strNum);
        }
    });

    return {
        limitPromise,
        strNumPromise
    }
}

//Проверка значений в инпутах
async function check(){
    const limit = limitInput.value;
    const strNum = strNumInput.value;
    const promisesObj = await createPromise(limit, strNum);

    const limitRes = await promisesObj.limitPromise;
    const strNumRes = await promisesObj.strNumPromise;

    if(!limitRes && !strNumRes){
        div.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
        return;
    } else if (!limitRes){
        div.innerHTML = 'Лимит вне диапазона от 1 до 10';
        return;
    } else if (!strNumRes){
        div.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
        return;
    } else {
        localStorage.setItem('limit', limitRes);
        localStorage.setItem('strNum', strNumRes);
        pushRequest(`https://picsum.photos/v2/list?page=${strNumRes}&limit=${limitRes}`);
    }
}

button.addEventListener('click', check);

//Отправка запроса
function pushRequest(url){
    fetch(url)
        .then(response => response.json())
        .then(json => displayResultRequest(json))
        .catch(error => {
            div.innerHTML = `<span class="attention">${error}</span>`;
        });
};

//Вставка картинок из результата запроса в HTML
function displayResultRequest(json){
    let images = '';

    json.forEach((item, index) => {
        const img = `
            <div class="card">
                <img class="img-card" src="${item.download_url}" alt="img_${index}">
                <p>${item.author}</p>
            </div>
        `;

        images += img;
    });

    div.innerHTML = images;
    localStorage.setItem('images', images);
}
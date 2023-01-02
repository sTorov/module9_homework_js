const div = document.querySelector('.request-result');
const button = document.querySelector('.button');

button.addEventListener('click', () => {
    let inputs = document.getElementsByClassName('input');
    let width = inputs[0].value;
    let height = inputs[1].value;

    if(+width >= 100 && width <= 300 && !isNaN(width) &&
        +height >= 100 && height <= 300 && !isNaN(height)){
            pushRequest(`https://picsum.photos/${width}/${height}`);
    } else {
        div.innerHTML = `Одно из чисел вне диапазона от 100 до 300`   
    }
});

function pushRequest(url){
    fetch(url)
        .then(response => {
            div.innerHTML = `<img src="${response.url}">`;
        })
        .catch(error => {
            div.innerHTML = `<span class="attention">${error}</span>`;
        });
};
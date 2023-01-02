const button = document.querySelector('.button');
const div = document.querySelector('.request-result')

function pushRequest(url, callback){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = function(){
        if(xhr.status != 200){
            div.innerHTML = `Статус запроса: ${xhr.status}.`;
        } else if (callback) {
            const result = JSON.parse(xhr.response);
            callback(result);
        }
    };

    xhr.onerror = function(){
        div.innerHTML = `<span class="attention">
                            Ошибка! Статус запроса: ${xhr.status}.
                        </span>`;
    };

    xhr.send();
};

function displayResultRequest(json){
    let result = '';

    json.forEach((item, index) => {
        const card = `
            <div class="card">
                <img class="img-card" src="${item.download_url}" alt=img_${index}>
                <p>${item.author}</p>
            </div>
        `;

        result += card;
    });

    div.innerHTML= result;
};

button.addEventListener('click', () => {
    const value = document.querySelector('.input').value;

    if(+value >= 1 && +value <= 10 && !isNaN(+value)){
        pushRequest(`https://picsum.photos/v2/list?limit=${value}`, displayResultRequest);
    } else {
        div.innerHTML = 'Необходимо ввести число от 1 до 10!';
    }
});
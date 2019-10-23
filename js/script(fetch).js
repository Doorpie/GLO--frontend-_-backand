window.addEventListener('DOMContentLoaded', () => {
    function init() {

        // делаем запрос к серверу через промисы
        //  fetch('////')
        //  .then(data => data.json())
        //  Выносим в отдельную функцию с проверкой ошибкок
        getResource('http://localhost:3000/people')
        
            // переносим данные в функцию
            .then(data => createCards(data))
            // вывод ошибки
            .catch(err => console.error(err));

        // удаляем кнопку
        this.remove();
    }

    // асинхронная функция  // получаем данные бд (data - ответ от сервера)
    async function getResource(url) {
        // await ожидает ответ от сервера // в res переносится ответ объекта
        const res = await fetch(url);

        //  если не 200 fetch.api
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        // возращаем чистый оъект
        return await res.json();
    }

    // создаем карточки
    function createCards(response){
        // перебираем данные массива
        response.forEach(item => {
            // создаем карточку данных
            let card = document.createElement('div');

            // подключаем стили (класс) к блоку
            card.classList.add('card');

            // устанавливаем путь к иконке в зависимости от пола
            let icon;
            if (item.sex === "male") {
                icon = "icons/mars.png"
            } else {
                icon = "icons/female.png"
            }

            // заолняем карточку (другие кавычки)
            card.innerHTML = `
                <img src="${item.photo}" alt="persone">
                <div class="name">${item.name} ${item.surname}</div>
                <div class="sex">
                    <img src =${icon} alt=${item.sex}>
                </div>
                <div class="age">${item.age}</div>
            `;

            // вставляет карту в div с классом "app"
            document.querySelector('.app').appendChild(card);
        });
    }

    // Включает функция при нажатии на кнопку ({"once": true} - сраотает только один раз)
    document.querySelector('button').addEventListener('click', init, {"once": true});

});
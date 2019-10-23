window.addEventListener('DOMContentLoaded', () => {
    function init() {
        // создвем запрос
        let request = new XMLHttpRequest();

        // получаем бд
        request.open('GET', 'http://localhost:3000/people');
        // создаем запрос из бд на определенные данные
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        //  отправляем запрос в бд
        request.send();


        //  отслеживание текущих данных запроса
        request.addEventListener('readystatechange', function(){
            // 4(стадия) - Операция полность завершена // 200-300 ок
            if (request.readyState === 4 && request.status == 200) {
                //  получаем даннфе в виде json и их парсим в обычный объект.
                let data = JSON.parse(request.response);
                //  перебираем полученный массив данных
                data.forEach(item => {
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

            } else {
                console.error('Что-то пошло не так');
            }
        });
        
        // удаляем кнопку
        this.remove();
    }


    // Включает функция при нажатии на кнопку ({"once": true} - сраотает только один раз)
    document.querySelector('button').addEventListener('click', init, {"once": true});

});
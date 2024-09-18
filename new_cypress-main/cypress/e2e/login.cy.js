describe('Проверка авторизации', function () {

    it('Верный логин и верный пароль', function () {
         cy.visit('https://login.qa.studio/'); // Зашли на сайт
         cy.get('#mail').type('german@dolnikov.ru');  // Ввели верный логин
         cy.get('#pass').type('iLoveqastudio1');  // Ввели верный пароль
         cy.get('#loginButton').click();  // Нажали войти
         cy.get('#messageHeader').contains('Авторизация прошла успешно');  // Проверяем, что текст после авт. виден
         cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Естиь крестик и он виден
     })


     it('Проверка логики восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').click();  // Нажали восстановить пароль
        cy.get('#mailForgot').type('german@dolnikov.ru');  // Ввели почту для восстановления
        cy.get('#restoreEmailButton').click();  // Нажали отправить код
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Видим текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Естиь крестик и он виден
    })


    it('Верный логин и НЕверный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('german@dolnikov.ru');  // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio2');  // Ввели неверный пароль
        cy.get('#loginButton').click();  // Нажали войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет');  // Проверяем, что текст после авт. виден
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Естиь крестик и он виден
    })

    it('НЕверный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('german@dolnikof.ru');  // Ввели неверный логин
        cy.get('#pass').type('iLoveqastudio1');  // Ввели верный пароль
        cy.get('#loginButton').click();  // Нажали войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет');  // Проверяем, что текст после авт. виден
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Естиь крестик и он виден
    }) 

    it(' Логин без @ и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('germandolnikov.ru');  // Ввели  логин c ошибкой валидации (без@)
        cy.get('#pass').type('iLoveqastudio1');  // Ввели верный пароль
        cy.get('#loginButton').click();  // Нажали войти
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');  // Проверяем, что текст после авт. виден
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Естиь крестик и он виден
    }) 

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('GerMan@Dolnikov.ru');  // Ввели  логин c заглавными и строчными буквами
        cy.get('#pass').type('iLoveqastudio1');  // Ввели верный пароль
        cy.get('#loginButton').click();  // Нажали войти
        cy.get('#messageHeader').contains('Авторизация прошла успешно');  // Проверяем, что текст после авт. виден
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден
    }) 
 }) 

 // ПОКЕМОНЫ E-2-E

 describe('Покупка аватара', function () {                               
    it(' e2e проверка на покупку нового аватара для тренера', function () {   
         cy.visit('https://pokemonbattle.ru/');                         
         cy.get('input[type="email"]').type('USER_LOGIN'); // вводим верный логин
         cy.get('input[type="password"]').type('USER_PASSWORD'); // вводим верный пароль
         cy.get('button[type="submit"]').click(); // нажимаем кнопку Подтвердить
         cy.wait(2000); // закладываем время ожидания
         cy.get('.header__container > .header__id').click({ force: true }); // нажимаем в шапке на аву тренера
         cy.get('[href="/shop"]').click();                               // нажимаем кнопку Магазин
         cy.get('.available > button').first().click({ force: true });   // нажимаем -  купить у первого доступного аватара
         cy.get('.credit').type('4620869113632996'); // вводим номер карты
         cy.get('.k_input_ccv').type('125'); // вводим CVV карты
         cy.get('.k_input_date').type('1225'); // вводим срок действия карты
         cy.get('.k_input_name').type('NAME'); // вводим имя владельца карты
         cy.get('.pay-btn').click(); // нажимаем кнопку - оплатить
         cy.get('#cardnumber').type('56456'); // вводим код подтверждения СМС
         cy.get('.payment__submit-button').click(); // нажимаем кнопку Отправить
         cy.contains('Покупка прошла успешно').should('be.visible'); // проверяем наличие и видимость сообщения о успешной покупке
     });
 });
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 
/*Напишите программу, которая будет принимать на вход несколько аргументов:
дату и время в формате «час-день-месяц-год». Задача программы — создавать для каждого аргумента
таймер с обратным отсчётом: посекундный вывод в терминал состояния таймеров (сколько осталось).
По истечении какого-либо таймера, вместо сообщения о том, сколько осталось, требуется показать
сообщение о завершении его работы. Важно, чтобы работа программы основывалась на событиях.
 */
const EventEmitter = require('events'); //подключаем модуль работы с событиями
const emitter = new EventEmitter();
console.clear();
const INPUT_DATA = process.argv.slice(2); //получаем массив всех введённых пользователем дат

let preparedTimes = prepareTimes(INPUT_DATA); //Превращаем введенную пользователем строку в значение юникстайм в миллисекундах

function prepareTimes (data) {
    let times = [];
    data.forEach(data => {

        let stringSplit = (data.split('-')); //Разбили строку в массив, передаём в обратном порядке в конструктор даты
        let date = new Date(stringSplit[4], stringSplit[3] - 1, stringSplit[2] , stringSplit[1], stringSplit[0]);
        let time = date.getTime();//Переводим дату в миллисекунды. Это нужно для нахождения разницы между двумя датами.
        // Не нашел иного пути
        times.push(time);
});
    return times;
}


function showTimers (time) {
    let difference = time - new Date(); //Разница между текущим временем и нужным для таймера
    let fakeDate = new Date(difference); //Для использования всех методов ниже нужна дата. Поэтому создаю ненастоящую дату,
    //такую, которая бы наступила с начала отсчёта.
    let years = fakeDate.getFullYear() - 1970;
    let months = fakeDate.getMonth();
    let days = fakeDate.getDate();
    let hours = fakeDate.getHours();
    let minutes = fakeDate.getMinutes();
    let seconds = fakeDate.getSeconds();
    console.log("Осталось: years: " + years + " months: " + months + " days: " + days + " hours: " + hours + " minutes: "  + minutes + " seconds: " + seconds);
}


const startTimers = async () => { //Скопировал конструкцию по образцу с урока, плохо понимаю синтаксис асинхронности
    preparedTimes.forEach(time =>{
        emitter.emit('timer', time);
    })
    await new Promise(resolve=>setTimeout(resolve, 1000));
    await startTimers(preparedTimes);
}

emitter.on("timer", (time) => showTimers(time))

startTimers(preparedTimes);

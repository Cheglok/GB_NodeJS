// Программа принимает команду: npm run hw2task2 00-24-31-10-2021 55-16-31-11-2022, время считается по гринвичу
const EventEmitter = require('events'); //подключаем модуль работы с событиями
const emitter = new EventEmitter();
console.clear();
const INPUT_DATA = process.argv.slice(2); //получаем массив всех введённых пользователем дат
console.log(INPUT_DATA); //Для наглядности после очистки консоли напишем какие даты введены

if(checkInput(INPUT_DATA)){
    let preparedTimes = prepareTimes(INPUT_DATA);

    const startTimers = async () => { //Скопировал конструкцию по образцу с урока, плохо понимаю синтаксис асинхронности
        preparedTimes.forEach(time => {
            emitter.emit('timer', time);
        })
        await new Promise(resolve => setTimeout(resolve, 1000));
        await startTimers(preparedTimes);
    }
    emitter.on("timer", (time) => showTimers(time))

    startTimers(preparedTimes);
}

function checkInput(inputData) {
    for(let i = 0; i < inputData.length; i++) {
        if (!inputData[i].match(/^\d\d-\d\d-\d\d-\d\d-\d\d\d\d$/)) {
            console.log("Введены некорректные параметры, введите все нужные даты в формате MM-HH-DD-MM-YYYY через пробел");
            return false;
        }
    }
    return true;
}

function prepareTimes(data) {
    let times = [];
    data.forEach((string) => {
        let stringSplit = (string.split('-')); //Разбили строку в массив, передаём в обратном порядке в конструктор даты
        let date = new Date(stringSplit[4], stringSplit[3] - 1, stringSplit[2], stringSplit[1], stringSplit[0]);
        let time = date.getTime();//Переводим дату в миллисекунды. Это нужно для нахождения разницы между двумя датами.
        // Не нашел иного пути
        times.push(time);
    });
    return times;
}


function showTimers(time) {
    let difference = time - new Date(); //Разница между текущим временем и нужным для таймера
    let fakeDate = new Date(difference); //Для использования всех методов ниже нужна дата. Поэтому создаю ненастоящую дату,
    //такую, которая бы наступила с начала отсчёта.
    let years = fakeDate.getFullYear() - 1970;
    let months = fakeDate.getMonth();
    let days = fakeDate.getDate() - 1; //Коррекция для человеческого ввода значения месяца
    let hours = fakeDate.getHours();
    let minutes = fakeDate.getMinutes();
    let seconds = fakeDate.getSeconds();
    console.log("Осталось: years: " + years + " months: " + months + " days: " + days + " hours: " + hours + " minutes: " + minutes + " seconds: " + seconds);
}
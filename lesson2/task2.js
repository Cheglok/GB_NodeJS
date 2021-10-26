/*Напишите программу, которая будет принимать на вход несколько аргументов:
дату и время в формате «час-день-месяц-год». Задача программы — создавать для каждого аргумента
таймер с обратным отсчётом: посекундный вывод в терминал состояния таймеров (сколько осталось).
По истечении какого-либо таймера, вместо сообщения о том, сколько осталось, требуется показать
сообщение о завершении его работы. Важно, чтобы работа программы основывалась на событиях.
 */
const EventEmitter = require('events');
const emitter = new EventEmitter();
console.clear();
const TIMERS_DATA = process.argv.slice(2);
let preparedDates = [];

function prepareTimes (data) {
    data.forEach(data => {
        let date = new Date(data).toLocaleString('en-US', { timeZone: 'Asia/Yekaterinburg' });
        preparedDates.push(date);
});
}
prepareTimes(TIMERS_DATA);
DATA.forEach(data =>{
    console.log(new Date(data).toLocaleString('en-US', { timeZone: 'Asia/Yekaterinburg' }).getTime() - Date.now().getTime())
})

// const startTimers= async (preparedTimers) => {
//     preparedTimers.forEach(time =>{
//         emitter.emit('timer', time);
//     })
//     await new Promise(resolve=>setTimeout(resolve, 1000));
//     await startTimers();
// }
//
// function printTimer(timer) {
//
// }
//
// emitter.on('timer', printTimer(timer))
//
// startTimers();
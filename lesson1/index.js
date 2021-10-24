const colors = require('colors');
const[start, end] = process.argv.slice(2);
let simpleNumbers = [];

if((Number.isInteger(+start) && start > 0) && (Number.isInteger(+end) && end > 0) && +end > +start) {
    findSimpleNumbers(start, end);
    printSimpleNumbers(simpleNumbers);
}
else console.log("Переданные параметры некорректны.\n".inverse +
    "Введите два целых положительных числа, первое должно быть меньше второго".rainbow);


function findSimpleNumbers(start, end) {
    for (let i = start; i <= end; i++) {
        for (let j = 2; j <= i; j++){
            if (j > Math.sqrt(i)) {
                simpleNumbers.push(+i);
                break;
            }
            else if((i % j) == 0) break
        }
    }
}

function printSimpleNumbers(arr) {
    if(arr.length == 0) {
        console.log("Простых чисел в этом диапазоне нет".red.bold);
        return;
    }
    let i = 0;
    while (i < arr.length) {
        console.log(colors.green.bold(arr[i++]));
        if(arr[i]) console.log(colors.yellow(arr[i++]));
        if(arr[i]) console.log(colors.red(arr[i++]));
    }
}



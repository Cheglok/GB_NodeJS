const fs = require('fs');
const ACCESS_LOG = './lesson3/test.log';
const INPUT_IP_ADDRESSES = process.argv.slice(2);

const reader = fs.createReadStream(ACCESS_LOG, 'utf-8')
const lineReader = require('readline').createInterface({
    input: reader,
})
reader.on('error', (err) => console.log(err));

let writeStreams = [];

INPUT_IP_ADDRESSES.forEach((address) => {
    writeStreams[address] = fs.createWriteStream(address + '.log',  { flags: 'a', encoding: 'utf8' });
    writeStreams[address].on('error', (err) => console.log(err));
});

lineReader.on('line', (line) => {
    INPUT_IP_ADDRESSES.forEach((address) =>{
        if(line.includes(address)) {
            writeStreams[address].write(line + '\n');
        }
    })
})

lineReader.on('close', () => console.log("Завершено чтение файла"));
lineReader.on('error', (err) => console.log('err'));

//Если есть вариант сделать через Pipe, подскажите как. У меня не получилось
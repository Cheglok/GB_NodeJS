const fs = require('fs');
const ACCESS_LOG = './lesson3/test.log';
const INPUT_IP_ADDRESSES = process.argv.slice(2);

const lineReader = require('readline').createInterface({
    input: fs.createReadStream(ACCESS_LOG, 'utf-8'),
})
let writeStreams = [];

INPUT_IP_ADDRESSES.forEach((address) => {
    writeStreams[address] = fs.createWriteStream(address + '.log',  { flags: 'a', encoding: 'utf8' });
});

lineReader.on('line', (line) => {
    INPUT_IP_ADDRESSES.forEach((address) =>{
        if(line.includes(address)) {
            writeStreams[address].write(line + '\n');
        }
    })
})
const fs = require('fs');
const ACCESS_LOG = './lesson3/test.log';
const INPUT_IP_ADDRESSES = process.argv.slice(2);

const lineReader = require('readline').createInterface({
    input: fs.createReadStream(ACCESS_LOG, 'utf-8'),
})
INPUT_IP_ADDRESSES.forEach((address) => {

});

lineReader.on('line', (line) => {
    INPUT_IP_ADDRESSES.forEach((address) =>{
        if(line.includes(address)) {
            const writeStream = fs.createWriteStream(address + '.log',  { flags: 'a', encoding: 'utf8' });
            writeStream.write(line + '\n');
        }
    })
})
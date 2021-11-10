const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const currentDirectory = process.cwd();
let directory = process.cwd();
let list = [];

const server = http.createServer((request, response) =>{
   response.setHeader('Content-Type', 'text/html');
   const {filePath} = url.parse(request.url, true).query; //Для навигации использовать адреса с параметрами
   if(filePath) {       //если в адресной строке передан параметр, смотрим файл это или папка
      if(fs.lstatSync(filePath).isDirectory()) { //Если папка, то сканируем содержимое и выводим в виде ссылок
         directory = filePath;
         list = fs.readdirSync(filePath);
         response.end(showList(list));
      } else {                         //Если по указанному адресу файл, то читаем его и перенаправляем поток в браузер
         const readStream = fs.createReadStream(filePath, 'utf-8');
         response.writeHead(200, { 'Content-Type': 'text/html'});
         readStream.pipe(response);
      }
   } else {
      list = fs.readdirSync(currentDirectory); //Если параметр пустой, то сканируем и выводим текущую папку
      response.end(showList(list));
   }
});

server.listen(5555, 'localhost');


function showList(list) {        //Все объекты в директории считаны в массив, для каждого элемента создаётся ссылка,
   let html = "";                //в которой есть параметр filePath, содержащий полный путь до данного объекта
   list.forEach(item => {
      let filePath = path.resolve(directory, item);
      filePath = path.normalize(filePath);
      html += "<a href='?filePath=" + filePath + "'>" + item + "</a><br>"
   })
   return html;
}
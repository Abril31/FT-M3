var fs = require("fs");
var http = require("http");
/* ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️ */
/* AQUÍ DEBAJO PUEDES ESCRIBIR LA CONSTANTE DEL PUERTO */
const PORT = 3001;

/* ⚠️ LA LÍNEA SIGUIENTE TIENE QUE QUEDAR COMO ESTÁ PARA PODER EXPORTAR EL SERVIDOR ⚠️ */
module.exports =
  /* AQUÍ DEBAJO YA PUEDES ESCRIBIR TÚ CÓDIGO REEMPLAZANDO EL VALOR DE NULL POR EL SERVIDOR */
  3001;

const server = http
  .createServer((request, response) => {
    console.log(`Server raised in port ${PORT}`);
    const { url } = request;
    if (url === "/api") {
      fs.readFile("utils/dogsData.json", (err, data) => {
        if (err) {
          response.writeHead(404, {
            "Content-Type": "text/plain",
          });
          return response.end("json not found");
        } else {
          response.writeHead(200, {
            "Content-Type": "application/json",
          });
          return response.end(data);
        }
      });
      return;
    }

    if (url === "/allDogs") {
      fs.readFile("utils/allDogs.html", "UTF8", (err, data) => {
        if (err) {
          response.writeHead(404, {
            "Content-Type": "text/plain",
          });
          return response.end("html not found");
        } else {
          response.writeHead(200, {
            "Content-Type": "text/html",
          });
          response.end(data);
        }
      });
      return;
      }
      
      response.writeHead(404, {
        "Content-Type": "text/plain",
      });
      response.end("Route not found");
    })
  
  .listen(PORT, "localhost");

module.exports = server;

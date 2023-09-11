const express = require("express");
const server = express();

let publications = [];

server.use(express.json());

server.post("/posts", (req, res) => {
  // creando la ruta posts
  const { author, title, contents } = req.body; //Extraer las props del body

  if (!author || !title || !contents) {
    //si alguna de estas props no hay,
    return (
      res
        .status(400)
        //se devuleve un error que es un objeto
        .json({
          error:
            "No se recibieron los parámetros necesarios para crear la publicación",
        })
    );
  }
  //caso contrario se crea un objeto(publicación) añadiendo una nueva prop id.
  let newPublication = {
    id: publications.length + 1,
    author,
    title,
    contents,
  };
  publications.push(newPublication);
  res.status(200).json(newPublication);
});
/*🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈*/

// server.use(express.json());

server.get("/posts", (req, res) => {
  const { author, title } = req.query;

  const authorFound = publications.find((author) => {
    publications.author === author;
  });

  const titleFound = publications.find((title) => {
    publications.title === title;
  });

  if (authorFound && titleFound) {
    res.status(200).send(`${author} - ${title}`);
  } else {
    res.status(404).json({
      error: "No existe ninguna publicación con dicho título y autor indicado",
    });
  }
});
/*🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈*/

server.get("/posts/:author", (req, res) => {
  //:author se usa req.params
  const { author } = req.params; //obtener el autor de la url
  let authorMatched = publications.filter((publication) => {
    return publication.author === author;
  });
  if (authorMatched.length > 0) {
    //Ver si hay publicaciones
    res.status(200).json(authorMatched); //respondemos con las publicaciones esncontradas
  } else {
    res.status(404).json({
      error: "No existe ninguna publicación del autor indicado",
    });
  }
});
/*🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈*/

server.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  //buscar la publicación por id
  let foundPublication = publications.find(
    (publication) => publication.id === Number(id)
  );
  //verificar si existe el post
  if (!foundPublication) {
    res.status(404).json({
      error:
        "No se recibió el id correcto necesario para modificar la publicación",
    });
  } else {
    //verificar si se recibieron los parámetros necesarios
    if (title && contents) {
      //actualizar la publicación
      foundPublication.title = title;
      foundPublication.contents = contents;
      //Responder con los datos actualizados
      res.status(200).json(foundPublication);
    } else {
      res.status(400).json({
        error:
          "No se recibieron los parámetros necesarios para modificar la publicación",
      });
    }
  }
});
/*🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈*/
server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({
      error: "No se recibió el id de la publicación a eliminar",
    });
  } else {
    //Crear un nuevo array sin la publicación
    let newDelete = publications.filter(
      (publication) => publication.id !== +id
    );
    //Verificar si se encontró la publiacción con el ID indicado
    if (newDelete.length === publications.length) {
      res.status(400).json({
        error:
          "No se recibió el id correcto necesario para eliminar la publicación",
      });
    } else {
      //Actualizar el array de publicaciones con el nuevo array filtrado
      publications.length = 0;
      Array.prototype.push.apply(publications, newDelete);
      res.status(200).json({
        success: true,
      });
    }
  }
});
//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };

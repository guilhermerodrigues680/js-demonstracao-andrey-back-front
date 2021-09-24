// https://expressjs.com/pt-br/starter/hello-world.html
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

// http://expressjs.com/en/resources/middleware/cors.html#installation
app.use(cors());

// https://expressjs.com/pt-br/guide/using-middleware.html#middleware.application
// Meu middleware de log
app.use((req, res, next) => {
  const reqStartTime = new Date();
  res.on("finish", () => {
    // Date, Request Type, Request URL, Status Code da resposta
    console.log(reqStartTime.toLocaleString("pt-BR"), req.method, req.originalUrl, res.statusCode);
  });
  next();
});

// https://expressjs.com/pt-br/starter/static-files.html
app.use("/app", express.static(__dirname + "/front"));

// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
// Ao acessar a raiz redireciona para o front (307 == Redirecionamento Temporario)
app.get("/", (req, res) => {
  res.redirect(307, "/app");
});

app.get("/valores-cedula", (req, res) => {
  let usuId = req.query.usu_id;
  console.log("ID do usuario, usu_id:", usuId);

  // Verificação se o client/front enviou um usuId vazio
  if (!usuId) {
    res.status(400).send("ERRO: É necessário fornecer o ID do usuário");
    return;
  }

  // Verificacao se a string usuId que o client/front enviou contém um número válido
  if (isNaN(usuId)) {
    res.status(400).send("ERRO: É necessário fornecer um número válido para o ID do usuário");
    return;
  }

  // Sendo uma string contendo um número válido, converte em number
  let usuIdNumber = parseInt(usuId);
  if (usuIdNumber < 0) {
    res.status(400).send("ERRO: O ID do usuário não pode ser negativo.");
    return;
  }

  res.status(200).send(`Recebi o id de usuário ${usuIdNumber}.`);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

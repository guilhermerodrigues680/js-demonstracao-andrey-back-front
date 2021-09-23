const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    const name = req.query.name;
    console.log('Requisição no / , name:', name);

    // if (name === null || name === undefined || name === "") {
    if (!name) {
        console.log("ERRO no / , O nome está vazio.");
        res.status(400).send("É necessário fornecer um nome");
        return;
    }
    
    const response = name.toUpperCase();
    console.log('Resposta no / , response:', response);
    res.status(200).send(response);
});

app.get("/valores-cedula", (req, res) => {
    let usuId = req.query.usu_id;
    console.log("ID do usuario, usu_id:", usuId);

    if (usuId === undefined || usuId === null) {
        res.status(400).send("ERRO: É necessário fornecer o ID do usuário")
        return
    }

    let usuIdNumber = parseInt(usuId)
    // console.log("O tipo de dado do usuId é: ",typeof usuId)
    // console.log("O tipo de dado do usuIdNumber é: ",typeof usuIdNumber)
    // console.log(usuId, usuIdNumber)
    if (usuIdNumber < 0) {
        res.status(400).send("ERRO: O ID do usuário não pode ser negativo.")
        return
    }
    
    console.log("REQUEST /valores-cedula");
    // res.status(200).send("Recebi o id de usuário " + usuIdNumber + ".");
    res.status(200).send(`Recebi o id de usuário ${usuIdNumber}.`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

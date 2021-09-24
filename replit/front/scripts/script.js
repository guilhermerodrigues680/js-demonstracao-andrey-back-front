const inputIdUsuario = document.querySelector("#input-id-usuario");
const btnEnviar = document.querySelector("#btn-enviar");
const respostaApi = document.querySelector("#resposta-api");

btnEnviar.addEventListener("click", async () => {
  console.log("O botao foi clicado");

  const usuId = inputIdUsuario.value;
  console.log("usuId", usuId);

  // const url = `http://localhost:3000/valores-cedula?usu_id=${usuId}`;
  const url = `/valores-cedula?usu_id=${usuId}`;
  console.debug(url);

  try {
    let apiRes = await axios.get(url);
    console.log("apiRes", apiRes);
    console.log("data", apiRes.data);
    respostaApi.innerHTML = `Resposta: ${apiRes.data}, Status: ${apiRes.status}`;
  } catch (error) {
    console.log("Deu um erro", error);
    respostaApi.innerHTML = `Resposta: ${error.response.data}`;
  }
});

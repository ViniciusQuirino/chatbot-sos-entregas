const { Requests } = require("./request.js");

function sosregistrarcodigo(msg, etapaRetrieve, client) {
  let message = msg.body.toLowerCase();
  if (
    (message === "/registrar/.")
  ) {
    client.sendMessage(msg.from, "Digite o código.");

    Requests.updateEtapa(msg.from, { etapa: "x" });
  }

  if (etapaRetrieve.etapa === "x") {
    Requests.createClient({ codigo: msg.body });
    Requests.updateEtapa(msg.from, { etapa: "y", codigo: msg.body });
    client.sendMessage(msg.from, "Digite o nome do cliente");
  }

  if (etapaRetrieve.etapa === "y") {
    Requests.updateClient(etapaRetrieve.codigo, { nome: msg.body });
    Requests.updateEtapa(msg.from, { etapa: "a" });
    client.sendMessage(msg.from, "Cliente cadastrado com sucesso.");
  }
}

module.exports = { sosregistrarcodigo };

const { Requests } = require("./request.js");
const {
  desejacadastrarmaisnumeros,
  jacadastrouotoken,
  obrigadocadastroefetuadocomsucesso,
  naoexistenumerotelefonedessetamanho,
  naoesquecadoddd,
} = require("./middlewares.js");

function clientecadastro(msgNumber, msg, etapaRetrieve, client) {
  if (msgNumber) {
    if (msg.body === msgNumber.codigo + "/registrar") {
      client.sendMessage(
        msg.from,
        `É necessário o preenchimento de algumas informações para o cadastro da empresa.

1 - Quero cadastrar o token.      
2 - Quero cadastrar ou editar os números de WhatsApp que poderão fazer o pedido de entrega em nome da empresa.`
      );
      Requests.updateEtapa(msg.from, {
        etapa: "1",
        codigo: msgNumber.codigo,
      });
    }
  }

  if (etapaRetrieve.etapa === "1") {
    if (msg.body === "1") {
      client.sendMessage(
        msg.from,
        `Ok, agora nos informe o token por favor.

Lembrando que é através do token que nosso sistema entende o lugar de coleta da entrega.

Ex de resposta:
b395777131256287462da50f7e0a7656db39`
      );
      Requests.updateEtapa(msg.from, { etapa: "2" });
    }
    if (msg.body === "2") {
      client.sendMessage(
        msg.from,
        `Registre todos os números telefones que podem fazer o pedido por esse ChatBot.

Lembrando os numero cadastrado juntamente com o código da empresa pode efetuar um pedido de entrega.

Você pode cadastrar até 5 números, caso tenha menos não se preocupe, está tudo certo.

Nos envie na resposta um numero por vez!

Ex de resposta:
14981574852`
      );
      Requests.updateEtapa(msg.from, { etapa: "4" });
    }
  }

  if (etapaRetrieve.etapa === "2") {
    if (msg.body.length > 30) {
      Requests.updateClient(etapaRetrieve.codigo, { token: msg.body });
      Requests.updateEtapa(msg.from, { etapa: "3" });
      client.sendMessage(
        msg.from,
        `Obrigado, o token foi cadastrado com sucesso!

Você já cadastrou o numero de telefone ?

1 - Já cadastrei
2 - Ainda não cadastrei`
      );
    } else {
      client.sendMessage(
        msg.from,
        `O token está errado, copia e cole novamente.`
      );
    }
  }
  if (etapaRetrieve.etapa === "3") {
    if (msg.body === "1") {
      obrigadocadastroefetuadocomsucesso(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "a" });
    }
    if (msg.body === "2") {
      client.sendMessage(
        msg.from,
        `Registre todos os números telefones que podem fazer o pedido por esse ChatBot.
    
Lembrando os numero telefones cadastrado juntamente com o código da empresa pode efetuar um pedido de entrega.

Você pode cadastrar até 5 números, caso tenha menos não se preocupe, está tudo certo.

Nos envie na resposta um numero por vez!

Ex de resposta:
14981574852`
      );
      Requests.updateEtapa(msg.from, { etapa: "20" });
    }
  }
  // ----------------Quero cadastrar o token, não precisa pergunta se já cadastrou!----------------------------------------------------------------
  if (etapaRetrieve.etapa === "20") {
    if (msg.body.length === 11) {
      Requests.updateClient(etapaRetrieve.codigo, {
        telefoneum: "55" + msg.body + "@c.us",
      });
      Requests.updateEtapa(msg.from, { etapa: "21" });

      desejacadastrarmaisnumeros(client, msg.from);
    } else if (msg.body.length > 11) {
      naoexistenumerotelefonedessetamanho(client, msg.from);
    } else if (msg.body.length < 11 && msg.body !== "1") {
      naoesquecadoddd(client, msg.from);
    }
  }

  if (etapaRetrieve.etapa === "21") {
    if (msg.body === "1") {
      obrigadocadastroefetuadocomsucesso(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "a" });
    }

    if (msg.body.length === 11) {
      Requests.updateClient(etapaRetrieve.codigo, {
        telefonedois: "55" + msg.body + "@c.us",
      });
      Requests.updateEtapa(msg.from, { etapa: "22" });

      desejacadastrarmaisnumeros(client, msg.from);
    } else if (msg.body.length > 11) {
      naoexistenumerotelefonedessetamanho(client, msg.from);
    } else if (msg.body.length < 11 && msg.body !== "1") {
      naoesquecadoddd(client, msg.from);
    }
  }
  if (etapaRetrieve.etapa === "22") {
    if (msg.body === "1") {
      obrigadocadastroefetuadocomsucesso(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "a" });
    }

    if (msg.body.length === 11) {
      Requests.updateClient(etapaRetrieve.codigo, {
        telefonetres: "55" + msg.body + "@c.us",
      });
      Requests.updateEtapa(msg.from, { etapa: "23" });

      desejacadastrarmaisnumeros(client, msg.from);
    } else if (msg.body.length > 11) {
      naoexistenumerotelefonedessetamanho(client, msg.from);
    } else if (msg.body.length < 11 && msg.body !== "1") {
      naoesquecadoddd(client, msg.from);
    }
  }
  if (etapaRetrieve.etapa === "23") {
    if (msg.body === "1") {
      obrigadocadastroefetuadocomsucesso(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "a" });
    }

    if (msg.body.length === 11) {
      Requests.updateClient(etapaRetrieve.codigo, {
        telefonequatro: "55" + msg.body + "@c.us",
      });
      Requests.updateEtapa(msg.from, { etapa: "24" });

      desejacadastrarmaisnumeros(client, msg.from);
    } else if (msg.body.length > 11) {
      naoexistenumerotelefonedessetamanho(client, msg.from);
    } else if (msg.body.length < 11 && msg.body !== "1") {
      naoesquecadoddd(client, msg.from);
    }
  }

  if (etapaRetrieve.etapa === "24") {
    if (msg.body === "1") {
      obrigadocadastroefetuadocomsucesso(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "a" });
    }

    if (msg.body.length === 11) {
      Requests.updateClient(etapaRetrieve.codigo, {
        telefonecinco: "55" + msg.body + "@c.us",
      });

      desejacadastrarmaisnumeros(client, msg.from);
    } else if (msg.body.length > 11) {
      naoexistenumerotelefonedessetamanho(client, msg.from);
    } else if (msg.body.length < 11 && msg.body !== "1") {
      naoesquecadoddd(client, msg.from);
    }
  }
  // -----------Quero cadastrar ou editar os números de WhatsApp, precisa pergunta se já cadastrou o token----
  if (etapaRetrieve.etapa === "4") {
    if (msg.body.length === 11) {
      Requests.updateClient(etapaRetrieve.codigo, {
        telefoneum: "55" + msg.body + "@c.us",
      });
      Requests.updateEtapa(msg.from, { etapa: "5" });

      desejacadastrarmaisnumeros(client, msg.from);
    } else if (msg.body.length > 11) {
      naoexistenumerotelefonedessetamanho(client, msg.from);
    } else if (msg.body.length < 11 && msg.body !== "1") {
      naoesquecadoddd(client, msg.from);
    }
  }

  if (etapaRetrieve.etapa === "5") {
    if (msg.body === "1") {
      jacadastrouotoken(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "10" });
    }

    if (msg.body.length === 11) {
      Requests.updateClient(etapaRetrieve.codigo, {
        telefonedois: "55" + msg.body + "@c.us",
      });
      Requests.updateEtapa(msg.from, { etapa: "6" });

      desejacadastrarmaisnumeros(client, msg.from);
    } else if (msg.body.length > 11) {
      naoexistenumerotelefonedessetamanho(client, msg.from);
    } else if (msg.body.length < 11 && msg.body !== "1") {
      naoesquecadoddd(client, msg.from);
    }
  }
  if (etapaRetrieve.etapa === "6") {
    if (msg.body === "1") {
      jacadastrouotoken(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "10" });
    }

    if (msg.body.length === 11) {
      Requests.updateClient(etapaRetrieve.codigo, {
        telefonetres: "55" + msg.body + "@c.us",
      });
      Requests.updateEtapa(msg.from, { etapa: "7" });

      desejacadastrarmaisnumeros(client, msg.from);
    } else if (msg.body.length > 11) {
      naoexistenumerotelefonedessetamanho(client, msg.from);
    } else if (msg.body.length < 11 && msg.body !== "1") {
      naoesquecadoddd(client, msg.from);
    }
  }
  if (etapaRetrieve.etapa === "7") {
    if (msg.body === "1") {
      jacadastrouotoken(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "10" });
    }

    if (msg.body.length === 11) {
      Requests.updateClient(etapaRetrieve.codigo, {
        telefonequatro: "55" + msg.body + "@c.us",
      });
      Requests.updateEtapa(msg.from, { etapa: "8" });

      desejacadastrarmaisnumeros(client, msg.from);
    } else if (msg.body.length > 11) {
      naoexistenumerotelefonedessetamanho(client, msg.from);
    } else if (msg.body.length < 11 && msg.body !== "1") {
      naoesquecadoddd(client, msg.from);
    }
  }

  if (etapaRetrieve.etapa === "8") {
    if (msg.body === "1") {
      jacadastrouotoken(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "10" });
    }

    if (msg.body.length === 11) {
      Requests.updateClient(etapaRetrieve.codigo, {
        telefonecinco: "55" + msg.body + "@c.us",
      });
      // Requests.updateEtapa(msg.from, { etapa: "105" });

      desejacadastrarmaisnumeros(client, msg.from);
    } else if (msg.body.length > 11) {
      naoexistenumerotelefonedessetamanho(client, msg.from);
    } else if (msg.body.length < 11 && msg.body !== "1") {
      naoesquecadoddd(client, msg.from);
    }
  }

  // --------------------Já cadastrou o token?----------------------------------------------------
  if (etapaRetrieve.etapa === "10") {
    if (msg.body === "1") {
      obrigadocadastroefetuadocomsucesso(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "a" });
    }

    if (msg.body === "2") {
      client.sendMessage(
        msg.from,
        `Ok, agora nos informe o token por favor.

Lembrando que é através do token que nosso sistema entende o lugar de coleta da entrega.

Ex de resposta:
b395777131256287462da50f7e0a7656db39`
      );

      Requests.updateEtapa(msg.from, { etapa: "11" });
    }
  }

  if (etapaRetrieve.etapa === "11") {
    if (msg.body.length > 30) {
      Requests.updateClient(etapaRetrieve.codigo, { token: msg.body });
      Requests.updateEtapa(msg.from, { etapa: "a" });

      obrigadocadastroefetuadocomsucesso(client, msg.from);
    } else {
      client.sendMessage(
        msg.from,
        `O token está errado, copia e cole novamente.`
      );
    }
  }
}

module.exports = { clientecadastro };

const { Requests } = require("./request.js");
const CronJob = require("cron").CronJob;

// ---------------------------Verificar código e numero de telefone------------------------
function codigoetelefone(from, msgNumber) {
  if (msgNumber !== null) {
    if (
      from == msgNumber.telefoneum ||
      from == msgNumber.telefonedois ||
      from == msgNumber.telefonetres ||
      from == msgNumber.telefonequatro ||
      from == msgNumber.telefonecinco
    ) {
      return true;
    }
    return false;
  }

  return false;
}
//----------------------------VERIFICAR SE A CONVERSA COMEÇA COM NUMEROS------------------------------------------

async function checkingNumbers(msg) {
  const message = msg.body.toLowerCase();

  const cg = message.substring(0, 3);

  const zero = message.includes("0");
  const one = message.includes("1");
  const two = message.includes("2");
  const three = message.includes("3");
  const four = message.includes("4");
  const five = message.includes("5");
  const six = message.includes("6");
  const seven = message.includes("7");
  const eight = message.includes("8");
  const nine = message.includes("9");

  if (
    zero ||
    one ||
    two ||
    three ||
    four ||
    five ||
    six ||
    seven ||
    eight ||
    nine
  ) {
    let listDelivery = message.includes("entregas/");
    if (!listDelivery) {
      const checkingCompanies = await Requests.retrieveClient(cg);

      if (checkingCompanies === null) {
        return false;
      } else {
        return checkingCompanies;
      }
    }
    let final = message.slice(message.length - 3);
    const checkingCompanies = await Requests.retrieveClient(final);

    if (checkingCompanies === null) {
      return false;
    } else {
      return checkingCompanies;
    }
  }
  return true;
}

// --------------------------VERIFICAR ENDEREÇO---------------------------------------------
function checkingAddress(msg) {
  let message = msg.body.toLowerCase();

  const igaracuone = message.includes("igaracu do tiete");
  const igaracutwo = message.includes("igaraçu do tiete");
  const igaracuthree = message.includes("igaraçu do tietê");
  const igaracufour = message.includes("igaracu do tietê");
  const barra = message.includes("barra bonita");
  const barratwo = message.includes("barra bomita");
  const zero = message.includes("0");
  const one = message.includes("1");
  const two = message.includes("2");
  const three = message.includes("3");
  const four = message.includes("4");
  const five = message.includes("5");
  const six = message.includes("6");
  const seven = message.includes("7");
  const eight = message.includes("8");
  const nine = message.includes("9");

  if (message.length > 20) {
    if (
      igaracuone ||
      igaracutwo ||
      igaracuthree ||
      igaracufour ||
      barra ||
      barratwo
    ) {
      if (
        zero ||
        one ||
        two ||
        three ||
        four ||
        five ||
        six ||
        seven ||
        eight ||
        nine
      ) {
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
}

async function listarentregasequantidade(msg, client) {
  let message = msg.body.toLowerCase();
  let listar = message.includes("listar/entregas");

  if (listar) {
    let final = message.slice(message.length - 5);
    const data = final.replace("/", "");

    if (data.length == 4) {
      try {
        let response = await Requests.listEntregasEmpresa(
          data,
          msg.from,
          client
        );
        client.sendMessage(
          msg.from,
          `Data: ${final}
Quantidade de entregas: ${response}`
        );
      } catch (error) {
        client.sendMessage(
          msg.from,
          `A data precisa ter 5 digitos, não se esqueça`
        );
      }
    }
  }
}

async function listartodosclientescadastrados(msg, client) {
  let message = msg.body.toLowerCase();
  let listar = message.includes("listar/clientes");

  if (listar) {
    const response = await Requests.listAllClient();
    let texto = "";
    for (let dados of response) {
      texto += `
----------------------
Código: ${dados.codigo}
Nome: ${dados.nome ? dados.nome : "Sem registro"}
Telefone 1: ${dados.telefoneum ? dados.telefoneum.slice(0, 13) : "Sem registro"}
Telefone 2: ${
        dados.telefonedois ? dados.telefonedois.slice(0, 13) : "Sem registro"
      }
Telefone 3: ${
        dados.telefonetres ? dados.telefonetres.slice(0, 13) : "Sem registro"
      }
Telefone 4: ${
        dados.telefonequatro
          ? dados.telefonequatro.slice(0, 13)
          : "Sem registro"
      }
Telefone 5: ${
        dados.telefonecinco ? dados.telefonecinco.slice(0, 13) : "Sem registro"
      }`;
    }
    client.sendMessage(msg.from, texto);
    client.sendMessage(
      msg.from,
      `Quantidade de clientes cadastrados: ${response.length}`
    );
  }
}

async function buscardadosdecadastradodaempresa(msg, client, msgNumber) {
  if (msgNumber) {
    if (msg.body === msgNumber.codigo + "/dados") {
      const dados = `Código: ${msgNumber.codigo}
Nome: ${msgNumber.nome}
Token: ${msgNumber.token}
Telefone 1: ${
        msgNumber.telefoneum
          ? msgNumber.telefoneum.slice(0, 13)
          : "Sem registro"
      }
Telefone 2: ${
        msgNumber.telefonedois
          ? msgNumber.telefonedois.slice(0, 13)
          : "Sem registro"
      }
Telefone 3: ${
        msgNumber.telefonetres
          ? msgNumber.telefonetres.slice(0, 13)
          : "Sem registro"
      }
Telefone 4: ${
        msgNumber.telefonequatro
          ? msgNumber.telefonequatro.slice(0, 13)
          : "Sem registro"
      }
Telefone 5: ${
        msgNumber.telefonecinco
          ? msgNumber.telefonecinco.slice(0, 13)
          : "Sem registro"
      }`;

      client.sendMessage(msg.from, dados);
    }
  }
}

async function ativarchatbot(msg, client) {
  let message = msg.body.toLowerCase();

  let ativar = message.slice(0, 6);
  let telefone = message.split("/");

  if (ativar == "ativar") {
    if (
      msg.from == "5514996977366@c.us" ||
      msg.from == "5514991342480@c.us" ||
      msg.from == "5514998536591@c.us"
    ) {
      try {
        await Requests.updateEtapa(`55${telefone[1]}@c.us`, {
          ativado: true,
          etapa: "a",
        });
        client.sendMessage(msg.from, "Chatbot ativado.");
      } catch (error) {
        client.sendMessage(
          msg.from,
          "Não existe esse numero no banco de dados. Não se esqueça do ddd."
        );
      }
    }
  }
}

async function desativarchatbot(msg, client) {
  let message = msg.body.toLowerCase();

  let desativar = message.slice(0, 9);
  let telefone = message.split("/");

  if (desativar == "desativar") {
    if (
      msg.from == "5514996977366@c.us" ||
      msg.from == "5514991342480@c.us" ||
      msg.from == "5514998536591@c.us"
    ) {
      try {
        await Requests.updateEtapa(`55${telefone[1]}@c.us`, {
          ativado: false,
          etapa: "des",
        });
        client.sendMessage(msg.from, "Chatbot desativado.");
      } catch (error) {
        client.sendMessage(
          msg.from,
          "Não existe esse numero no banco de dados. Não se esqueça do ddd."
        );
      }
    }
  }
}

function deletarentregas(msg, client) {
  let message = msg.body.toLowerCase();
  if (message == "deletar/entregas") {
    Requests.deletarEntregasEmpresa();
    client.sendMessage(msg.from, "Todas as entregas foram deletadas.");
  }
}

function deletarcliente(msg, client) {
  let message = msg.body.toLowerCase();
  let listar = message.includes("deletar/cliente");
  if (listar) {
    let final = message.slice(message.length - 3);
    Requests.deleteClient(final);

    client.sendMessage(msg.from, "Cliente deletado com sucesso!");
  }
}

function desejacadastrarmaisnumeros(client, from) {
  client.sendMessage(
    from,
    `Voce quer cadastrar mais numero ? Se sim basta digitar o numero que deseja cadastrar. Caso contrario escolha a opçao 1:

1 - Não quero cadastrar mais nenhum numero telefone`
  );
}

function jacadastrouotoken(client, from) {
  client.sendMessage(
    from,
    `Obrigado, o numero de telefone foi cadastrado com sucesso!

Você já cadastrou o token ?

1 - Já cadastrei
2 - Ainda não cadastrei o token`
  );
}

function obrigadocadastroefetuadocomsucesso(client, from) {
  client.sendMessage(
    from,
    `Obrigado, seu cadastro foi finalizado com sucesso

A partir de agora você já pode fazer um pedido de entrega pelo WhatApp, basta nos informar seu código e seguir o passo a passo.

Para começar a fazer seu pedido, digite o apenas seu código.
Ex de resposta: 255`
  );
}

function naoexistenumerotelefonedessetamanho(client, from) {
  client.sendMessage(
    from,
    `Esse numero de telefone não é valido pois tem mais de 11 digitos.`
  );
}

function naoesquecadoddd(client, from) {
  client.sendMessage(
    from,
    `Esse numero de telefone não é valido, talvez você está se esquecendo de colocar o ddd :(`
  );
}

function temalgumaobservacao(client, from) {
  client.sendMessage(
    from,
    `Tem alguma *Informação ou Observação* para facilitar nosso entregador?

Escreva oque quiser, nosso motoboy irá ver sua *Informação*

Pode colocar o máximo de informação possível!

_Ex: telefone do cliente caso o motoqueiro não encontre a casa._`
  );
}

function temalgumaobservacaofisica(from, client) {
  client.sendMessage(
    from,
    `Tem alguma *Informação ou Observação* para facilitar nosso entregador?

Escreva oque quiser, nosso motoboy irá ver sua *Informação*

Pode colocar o máximo de informação possível!

_Ex: telefone do cliente caso o motoqueiro não encontre a casa._`
  );
}

function voltar(from, body, client) {
  if (body === "cancela" || body === "cancelar" || body === "voltar") {
    Requests.updateEtapa(from, { etapa: "a" });
    client.sendMessage(from, `Você voltou para o inicío. Comece novamente!`);
  }
}

function digiteoenderecodecoleta(from, client) {
  client.sendMessage(
    from,
    `Digite o endereço de *COLETA* por favor.

Precisamos que seja nesse formato do exemplo:

*RUA, NUMERO DA CASA E NOME DA CIDADE*`
  );
}

async function obrigadoseupedidofoifeitocomsucesso(
  body,
  from,
  client,
  response
) {
  const data = {
    id: response.id,
    status: "open",
    paymentMethod: response.formadepagamento,
    notes: response.obs,
    deliveryPoint: {
      address: response.entrega,
    },
  };

  const responseFood = await fetch(
    "https://app.foodydelivery.com/rest/1.2/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "a630bf2f5ac5444fb761f47bffd5817f",
      },
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log(err));

  if (responseFood.errorCode) {
    console.log(responseFood);
    client.sendMessage(
      from,
      "Por algum motivo ouve uma falha no lançamento da entrega, tente novamente começando do início ⚠️"
    );
    Requests.updateEtapa(from, { etapa: "a" });
  } else {
    const dados = {
      telefone: from,
      iddatabase: response.id,
      entrega: response.entrega,
      entregaidfood: responseFood.uid,
    };

    fetch("https://database-sos.up.railway.app/webhook/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));

    const splitArray = response.obs.split("-");

    client.sendMessage(
      from,
      `Obrigado, seu pedido foi feito com sucesso! 😁
            
Assim que um de nossos entregadores aceitar seu pedido você será notificado.

Lembrando que coletas são de 0 a 15 minutos em dias normais.

Numero do pedido: ${response.id}
Lugares: ${splitArray[0]}

Endereço de coleta: ${splitArray[1]}
Endereço de entrega: ${response.entrega}

Observação: ${splitArray[2]} - ${splitArray[3]}
Forma de pagamento: ${response.formadepagamento == "pix" ? "Pix" : "Dinheiro"}`
    );

    if (body == "1") {
      client.sendMessage(
        from,
        `Assim que terminar de fazer o pix, nos envie o comprovante. 😃`
      );

      client.sendMessage(
        from,
        `CNPJ
SOS Entregas

Banco Cora`
      );

      client.sendMessage(from, `32418164000120`);

      Requests.updateEtapa(from, { etapa: "compr" });
    }
  }

  if (body == "2") {
    Requests.updateEtapa(from, { etapa: "a" });
  }
}

function cronJob() {
  const date = new Date();
  const h = date.getHours();
  const job = new CronJob("0 * * * *", async () => {
    if (h >= 10 && h <= 23) {
      Requests.requestCronJob();
    }
  });
  job.start();
}

async function listarQuantidadeDeEntregasDaEmpresa(
  codigotelefone,
  msg,
  client
) {
  let message = msg.body.toLowerCase();
  let listDelivery = message.includes("entregas/");

  if (codigotelefone && listDelivery) {
    let final = message.slice(message.length - 3);
    const result = await Requests.listarQuantidadeDeEntregasDeUmaEmpresa(final);

    let texto = "";
    for (let dados of result) {
      const pagamento = getClass(dados.formadepagamento);
      function getClass(status) {
        const map = {
          money: "dinheiro",
          pix: "pago",
          card: "cartão",
        };

        return map[status];
      }

      texto += `
----------------------
Numero do pedido: ${dados.id}
Telefone: ${dados.telefone.slice(2, 13)}
Endereço: ${dados.entrega}
Forma de pagamento: ${pagamento}
Obs: ${dados.obs}`;
    }
    client.sendMessage(msg.from, texto);
    client.sendMessage(
      msg.from,
      `Quantidade de entregas hoje: ${result.length}`
    );
  }
}

module.exports = {
  checkingNumbers,
  checkingAddress,
  codigoetelefone,
  desejacadastrarmaisnumeros,
  jacadastrouotoken,
  obrigadocadastroefetuadocomsucesso,
  naoexistenumerotelefonedessetamanho,
  naoesquecadoddd,
  temalgumaobservacao,
  voltar,
  listarentregasequantidade,
  listartodosclientescadastrados,
  buscardadosdecadastradodaempresa,
  deletarentregas,
  deletarcliente,
  ativarchatbot,
  desativarchatbot,
  digiteoenderecodecoleta,
  temalgumaobservacaofisica,
  obrigadoseupedidofoifeitocomsucesso,
  cronJob,
  listarQuantidadeDeEntregasDaEmpresa,
};

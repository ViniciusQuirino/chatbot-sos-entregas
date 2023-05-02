const { Requests } = require("./request.js");

// ---------------------------Verificar código e numero de telefone------------------------
function codigoetelefone(from, msgNumber) {
  if (msgNumber !== null) {
    if (
      from == msgNumber.telefoneum ||
      from == msgNumber.telefonedois ||
      from == msgNumber.telefonetres ||
      from == msgNumber.telefonequatro ||
      from == msgNumber.telefonequatro
    ) {
      return true;
    }
    return false;
  }

  return false;
}

//----------------------------VERIFICAR SE A CONVERSA COMEÇA COM NUMEROS------------------------------------------

async function checkingNumbers(msg, client) {
  const cg = msg.body.substring(0, 3);

  const message = cg.toLowerCase();
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
    const checkingCompanies = await Requests.retrieveClient(cg);

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

  const igaracu = message.includes("igaracu do tiete sp");
  const igaraçu = message.includes("igaraçu do tiete sp");
  const barra = message.includes("barra bonita sp");
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
  const rua = message.includes("rua");
  const av = message.includes("av");
  const avn = message.includes("avn");
  const avenida = message.includes("avenida");

  if (message.length > 27) {
    if (
      igaracu ||
      igaraçu ||
      barra ||
      zero ||
      one ||
      two ||
      three ||
      four ||
      five ||
      six ||
      seven ||
      eight ||
      nine ||
      rua ||
      av ||
      avn ||
      avenida
    ) {
      return true;
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
    `Tem alguma observação para facilitar para nosso motoboy ?

Escreva oque quiser, nosso motoboy irá ver sua observação

Se possivel colocar numero de telefone do cliente, assim não precisamos entrar em contato com o estabelecimento caso o motoboy tenha problemas na hora da entrega.`
  );
}

function voltar(from, body, client) {
  if (body === "voltar") {
    Requests.updateEtapa(from, { etapa: "a" });
    client.sendMessage(from, `Você voltou para o inicío. Comece novamente!`);
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
};

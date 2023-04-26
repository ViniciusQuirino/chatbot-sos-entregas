const { Requests } = require("./request.js");

// ---------------------------Verificar código e numero de telefone------------------------
function codigoetelefone(from, retrieve) {
  if (retrieve !== null) {
    if (
      from == retrieve.telefoneum ||
      from == retrieve.telefonedois ||
      from == retrieve.telefonetres ||
      from == retrieve.telefonequatro ||
      from == retrieve.telefonequatro
    ) {
      Requests.createEntregaEmpresa(from, retrieve.token);

      return true;
    }
  }

  return false;
}

//----------------------------VERIFICAR SE A CONVERSA COMEÇA COM NUMEROS------------------------------------------

async function checkingNumbers(msg) {
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
    return checkingCompanies;
  }

  return false;
}

// --------------------------VERIFICAR ENDEREÇO---------------------------------------------
function checkingAddress(msg) {
  const message = msg.body.toLowerCase();

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

  if (message.length > 30) {
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

module.exports = {
  checkingNumbers,
  checkingAddress,
  codigoetelefone,
  desejacadastrarmaisnumeros,
  jacadastrouotoken,
  obrigadocadastroefetuadocomsucesso,
  naoexistenumerotelefonedessetamanho,
  naoesquecadoddd,
};

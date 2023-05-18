const { Requests } = require("./request.js");
const {
  voltar,
  digiteoenderecodecoleta,
  checkingAddress,
  temalgumaobservacaofisica,
  obrigadoseupedidofoifeitocomsucesso,
} = require("./middlewares.js");

// msgNumber = Dados do cliente
// etapaRetrieve = verifica se é numero privado e retorna a etapa
// codigotelefone = verifica se o numero enviado é igual ao numero de telefone cadastrado do código

async function fisica(msg, etapaRetrieve, client) {
  let message = msg.body.toLowerCase();
  if (etapaRetrieve.etapa == "a") {
    client.sendMessage(
      msg.from,
      `Olá, eu sou o assistente virtual da empresa SOS Entregas e estou aqui para te ajudar. Oque você deseja nesse momento ?

Digite apenas o numero da opção.

1 - Preciso fazer uma entrega e consultar os valores.
2 - Falar com um representante.`
    );
    Requests.updateEtapa(msg.from, { etapa: "b" });
  }

  if (etapaRetrieve.etapa == "b") {
    voltar(msg.from, message, client);
    if (msg.body == "1") {
      client.sendMessage(
        msg.from,
        `Segue os valores, favor selecionar a opção que se enquadra no seu ponto de coleta com o lugar entrega.

1 - Barra x Barra 8,00
2 - Barra x Igaraçu 9,00
3 - Cohab da Barra pra cima x Igaraçu 12,00

4 - Igaraçu x Igaraçu 7,00
5 - Igaraçu x Barra 9,00
6 - Igaraçu x Cohab da Barra pra cima 12,00

7 - Áreas Rurais, chácaras e condomínio Solicitar Consulta`
      );
      Requests.updateEtapa(msg.from, { etapa: "c" });
    }

    if (msg.body == "2") {
      let telefone = msg.from.slice(2, 13);
      client.sendMessage(
        msg.from,
        `Agradecemos por entrar em contato conosco. Pedimos que aguarde um minuto, pois um de nossos representantes estará prontamente disponível para atendê-lo. `
      );
      // CRIS
      client.sendMessage("5514991342480@c.us", `${telefone}`);
      client.sendMessage(
        "5514991342480@c.us",
        `Atenção! Temos um cliente aguardando para falar com um de nossos representantes.

O chatbot foi desativado temporariamente. Por favor, não se esqueça de reativá-lo após o término da conversa, para que o cliente possa continuar a receber assistência automatizada.`
      );
      // VIERA
      client.sendMessage("5514996977366@c.us", `${telefone}`);
      client.sendMessage(
        "5514996977366@c.us",
        `Atenção! Temos um cliente aguardando para falar com um de nossos representantes.

O chatbot foi desativado temporariamente. Por favor, não se esqueça de reativá-lo após o término da conversa, para que o cliente possa continuar a receber assistência automatizada.`
      );

      Requests.updateEtapa(msg.from, { ativado: false, etapa: "ç" });
    } else if (msg.body != "1" && msg.body != "2" && message !== "voltar") {
      client.sendMessage(
        msg.from,
        `Desculpa, não consegui entender sua resposta.
  
Vamos tentar novamente. Oque você deseja nesse momento ?

Por favor, escolha uma das opções, digite apenas o numero. ⬇️

1 - Preciso fazer uma entrega e consultar os valores.
2 - Falar com um representante.`
      );
    }
  }

  if (etapaRetrieve.etapa == "c") {
    voltar(msg.from, message, client);
    if (msg.body == "1") {
      digiteoenderecodecoleta(msg.from, client);
      Requests.createEntregaEmpresa({
        telefone: msg.from,
        obs: "Barra x Barra 8,00",
      });
      Requests.updateEtapa(msg.from, { etapa: "d" });
    }
    if (msg.body == "2") {
      digiteoenderecodecoleta(msg.from, client);
      Requests.createEntregaEmpresa({
        telefone: msg.from,
        obs: "Barra x Igaraçu 9,00",
      });
      Requests.updateEtapa(msg.from, { etapa: "d" });
    }
    if (msg.body == "3") {
      digiteoenderecodecoleta(msg.from, client);
      Requests.createEntregaEmpresa({
        telefone: msg.from,
        obs: "Cohab da Barra pra cima x Igaraçu 12,00",
      });
      Requests.updateEtapa(msg.from, { etapa: "d" });
    }
    if (msg.body == "4") {
      digiteoenderecodecoleta(msg.from, client);
      Requests.createEntregaEmpresa({
        telefone: msg.from,
        obs: "Igaraçu x Igaraçu 7,00",
      });
      Requests.updateEtapa(msg.from, { etapa: "d" });
    }
    if (msg.body == "5") {
      digiteoenderecodecoleta(msg.from, client);
      Requests.createEntregaEmpresa({
        telefone: msg.from,
        obs: "Igaraçu x Barra 9,00",
      });
      Requests.updateEtapa(msg.from, { etapa: "d" });
    }
    if (msg.body == "6") {
      digiteoenderecodecoleta(msg.from, client);
      Requests.createEntregaEmpresa({
        telefone: msg.from,
        obs: "Igaraçu x Cohab da Barra pra cima 12,00",
      });
      Requests.updateEtapa(msg.from, { etapa: "d" });
    }
    if (msg.body == "7") {
      digiteoenderecodecoleta(msg.from, client);
      await Requests.updateEtapa(msg.from, { etapa: "40" });
      Requests.createEntregaEmpresa({
        telefone: msg.from,
        obs: "Áreas Rurais, chácaras e condomínio",
      });
    } else if (
      msg.body != "1" &&
      msg.body != "2" &&
      msg.body != "3" &&
      msg.body != "4" &&
      msg.body != "5" &&
      msg.body != "6" &&
      msg.body != "7" &&
      message !== "voltar"
    ) {
      client.sendMessage(
        msg.from,
        `Desculpa, não consegui entender sua resposta.
  
Vamos tentar novamente. Qual se enquadra no seu ponto de coleta com o lugar da entrega ?

Por favor, escolha uma das opções ⬇️

1 - Barra x Barra 8,00
2 - Barra x Igaraçu 9,00
3 - Cohab da Barra pra cima x Igaraçu 12,00

4 - Igaraçu x Igaraçu 7,00
5 - Igaraçu x Barra 9,00
6 - Igaraçu x Cohab da Barra pra cima 12,00

7 - Áreas Rurais, chácaras e condomínio Solicitar Consulta`
      );
    }
  }

  if (etapaRetrieve.etapa == "d") {
    voltar(msg.from, message, client);
    const address = checkingAddress(msg);
    if (address) {
      client.sendMessage(
        msg.from,
        `Digite o endereço de ENTREGA por favor.
        
Precisamos que seja nesse formato do exemplo, nome da rua, numero da casa e cidade.

Exemplo: rua major pompeu 000 barra bonita

Exemplo 2: rua antonio manfio 00 igaraçu do tietê`
      );

      Requests.updateEntregaEmpresa({
        telefone: msg.from,
        obs: msg.body,
        b: "b",
      });
      Requests.updateEtapa(msg.from, { etapa: "e" });
    } else if (!address && message !== "voltar") {
      client.sendMessage(
        msg.from,
        `Esse endereço não é valido, tente novamente!
        
Precisamos que seja no formato do exemplo. Rua, numero e cidade.

Rua major pompeu 000 barra bonita`
      );
    }
  }

  if (etapaRetrieve.etapa == "e") {
    voltar(msg.from, message, client);
    const address = checkingAddress(msg);
    if (address) {
      client.sendMessage(
        msg.from,
        `Sobre o pagamento, escolha uma das alternativas.

1 - O produto e a entrega já está pago
2 - O produto já está pago porem o motoqueiro precisar receber a entrega.
3 - O motoqueiro precisa receber a entrega e o produto.`
      );

      Requests.updateEntregaEmpresa({
        telefone: msg.from,
        entrega: msg.body,
      });
      Requests.updateEtapa(msg.from, { etapa: "f" });
    } else if (!address && message !== "voltar") {
      client.sendMessage(
        msg.from,
        `Esse endereço não é valido, tente novamente!
        
Precisamos que seja no formato do exemplo. Rua, numero e cidade.

Rua major pompeu 000 barra bonita`
      );
    }
  }

  if (etapaRetrieve.etapa == "f") {
    voltar(msg.from, message, client);
    if (msg.body == "1") {
      temalgumaobservacaofisica(msg.from, client);
      Requests.updateEntregaEmpresa({
        telefone: msg.from,
        obs: "O produto e a entrega já está pago.",
        b: "b",
      });
      Requests.updateEtapa(msg.from, { etapa: "g" });
    }
    if (msg.body == "2") {
      temalgumaobservacaofisica(msg.from, client);
      Requests.updateEntregaEmpresa({
        telefone: msg.from,
        obs: "O produto já está pago porem o motoqueiro precisar receber a entrega.",
        b: "b",
      });
      Requests.updateEtapa(msg.from, { etapa: "g" });
    }
    if (msg.body == "3") {
      temalgumaobservacaofisica(msg.from, client);
      Requests.updateEntregaEmpresa({
        telefone: msg.from,
        obs: "O motoqueiro precisa receber a entrega e o produto.",
        b: "b",
      });
      Requests.updateEtapa(msg.from, { etapa: "g" });
    } else if (
      msg.body != "1" &&
      msg.body != "2" &&
      msg.body != "3" &&
      message !== "voltar"
    ) {
      client.sendMessage(
        msg.from,
        `Desculpa, não consegui entender sua resposta.
  
Vamos tentar novamente. Sobre o pagamento, por favor, escolha uma das opções ⬇️

1 - O produto e a entrega já está pago
2 - O produto já está pago porem o motoqueiro precisar receber a entrega.
3 - O motoqueiro precisa receber a entrega e o produto.`
      );
    }
  }

  if (etapaRetrieve.etapa == "g") {
    voltar(msg.from, message, client);
    if (message != "voltar") {
      client.sendMessage(
        msg.from,
        `Qual é a forma de pagamento da ENTREGA ?
  
1 - Pix (preferência por pix)
2 - Dinheiro`
      );

      Requests.updateEntregaEmpresa({
        telefone: msg.from,
        obs: `Obs: ${msg.body}`,
        b: "b",
      });
      Requests.updateEtapa(msg.from, { etapa: "h" });
    }
  }

  if (etapaRetrieve.etapa == "h") {
    voltar(msg.from, message, client);
    let um = msg.body.includes("1");
    let dois = msg.body.includes("2");
    if (um) {
      const response = await Requests.updateEntregaEmpresa({
        telefone: msg.from,
        formadepagamento: "pix",
      });
      obrigadoseupedidofoifeitocomsucesso(msg.from, client, response);
    } else if (dois) {
      const response = await Requests.updateEntregaEmpresa({
        telefone: msg.from,
        formadepagamento: "money",
      });

      obrigadoseupedidofoifeitocomsucesso(msg.from, client, response);
    } else if (!um && !dois && message !== "voltar") {
      client.sendMessage(
        msg.from,
        `Desculpa, não consegui entender sua resposta.
  
Vamos tentar novamente. Qual é a forma de pagamento da ENTREGA ?

Por favor, escolha uma das opções ⬇️
  
1 - Pix (preferência por pix)
2 - Dinheiro`
      );
    }
  }

  // ---------------------ZONAS RURAIS------------------------------------------------
  if (etapaRetrieve.etapa == "40") {
    voltar(msg.from, message, client);
    const address = checkingAddress(msg);
    if (address) {
      client.sendMessage(
        msg.from,
        `Digite o endereço de ENTREGA por favor.
      
Precisamos que seja nesse formato do exemplo, nome da rua, numero da casa e cidade.

Exemplo: rua major pompeu 000 barra bonita

Exemplo 2: rua antonio manfio 00 igaraçu do tietê`
      );

      Requests.updateEntregaEmpresa({
        telefone: msg.from,
        obs: msg.body,
        b: "b",
      });
      Requests.updateEtapa(msg.from, { etapa: "41" });
    } else if (!address && message !== "voltar") {
      client.sendMessage(
        msg.from,
        `Esse endereço não é valido, tente novamente!
      
Precisamos que seja no formato do exemplo. Rua, numero e cidade.

Rua major pompeu 000 barra bonita`
      );
    }
  }

  if (etapaRetrieve.etapa == "41") {
    voltar(msg.from, message, client);
    const address = checkingAddress(msg);
    if (address) {
      Requests.updateEtapa(msg.from, { etapa: "42" });
      Requests.updateEntregaEmpresa({
        telefone: msg.from,
        entrega: msg.body,
      });
      client.sendMessage(
        msg.from,
        `Neste momento, estamos realizando a consulta do valor da entrega para você. Pedimos que aguarde um momento enquanto buscamos essa informação em nosso sistema. Estamos empenhados em fornecer-lhe uma resposta precisa e rápida.`
      );

      // CRIS
      client.sendMessage(
        "5514991342480@c.us",
        `Você deseja mesmo assim finalizar o pedido de entrega ?
  
Escolha por favor uma das opções

1 - Sim, desejo continuar
2 - Não.`
      );
      client.sendMessage(
        "5514991342480@c.us",
        `Atenção! Temos um cliente aguardando para consultar o valor da entrega.`
      );

      // VIERA
      client.sendMessage(
        "5514996977366@c.us",
        `Você deseja mesmo assim finalizar o pedido de entrega ?
  
Escolha por favor uma das opções

1 - Sim, desejo continuar
2 - Não.`
      );
      client.sendMessage(
        "5514996977366@c.us",
        `Atenção! Temos um cliente aguardando para consultar o valor da entrega.`
      );
    } else if (!address && message !== "voltar") {
      client.sendMessage(
        msg.from,
        `Esse endereço não é valido, tente novamente!
      
Precisamos que seja no formato do exemplo. Rua, numero e cidade.

Rua major pompeu 000 barra bonita`
      );
    }
  }

  if (etapaRetrieve.etapa == "42") {
    voltar(msg.from, message, client);
    if (msg.body == "1") {
      Requests.updateEtapa(msg.from, { etapa: "f" });
      client.sendMessage(
        msg.from,
        `Sobre o pagamento, por favor, escolha uma das opções ⬇️

1 - O produto e a entrega já está pago
2 - O produto já está pago porem o motoqueiro precisar receber a entrega.
3 - O motoqueiro precisa receber a entrega e o produto.`
      );
    }
    if (msg.body == "2") {
      client.sendMessage(
        msg.from,
        `Ok, mesmo assim agradecemos pelo seu contato
        
Até a próxima! Tenha um ótimo dia!`
      );
      Requests.updateEtapa(msg.from, { etapa: "a" });
    }

    if (msg.body != "1" && msg.body != "2" && message !== "voltar") {
      client.sendMessage(
        msg.from,
        `Desculpa, não consegui entender sua resposta.
        
Vamos tentar novamente. Você deseja mesmo assim finalizar o pedido de entrega ?

Por favor, escolha uma das opções ⬇️

1 - Sim, desejo continuar
2 - Não.`
      );
    }
  }
}

module.exports = { fisica };

const { Requests } = require("./request.js");
const { checkingAddress, temalgumaobservacao } = require("./middlewares.js");
const { voltar } = require("./middlewares.js");
// msgNumber = Dados do cliente
// etapaRetrieve = verifica se é numero privado e retorna a etapa
// codigotelefone = verifica se o numero enviado é igual ao numero de telefone cadastrado do código

async function empresa(msg, msgNumber, etapaRetrieve, codigotelefone, client) {
  let message = msg.body.toLowerCase();
 
  if (!codigotelefone && !msgNumber && etapaRetrieve.etapa === "a") {
    client.sendMessage(msg.from, `Digite o código corretamente`);
  }
  const a = msg.body.charAt(3);
  if (codigotelefone && etapaRetrieve.etapa === "a" && a !== "/") {
    client.sendMessage(
      msg.from,
      `Olá ${msgNumber.nome}, bora fazer mais um pedido de entrega ?!😁

Digite o endereço de ENTREGA por favor.
        
Precisamos que seja nesse formato do exemplo, nome da rua, numero da casa e cidade.
        
Exemplo: rua major pompeu 000 barra bonita
        
Exemplo 2: rua antonio manfio 00 igaraçu do tietê`
    );
    Requests.updateEtapa(msg.from, { etapa: "b" });
    Requests.createEntregaEmpresa({
      telefone: msg.from,
      tokencoleta: msgNumber.token,
      codigo: msg.body,
    });
  }

  if (etapaRetrieve.etapa === "b") {
    voltar(msg.from, message, client);
    const address = checkingAddress(msg);

    if (address) {
      Requests.updateEntregaEmpresa({
        telefone: msg.from,
        entrega: msg.body + " sp",
      });
      client.sendMessage(
        msg.from,
        `Qual é a forma de pagamento ?
  
1 - Cartão
2 - Dinheiro
3 - Pago, Pix, Pagamento online`
      );
      Requests.updateEtapa(msg.from, { etapa: "c" });
    } else if (!address && message !== "voltar") {
      client.sendMessage(
        msg.from,
        `Esse endereço não é valido, tente novamente!
        
precisamos que seja no formato do exemplo. Rua, numero e cidade.

rua major pompeu 000 barra bonita`
      );
    }
  }

  if (etapaRetrieve.etapa === "c") {
    voltar(msg.from, message, client);
    let um = msg.body.includes("1");
    let dois = msg.body.includes("2");
    let tres = msg.body.includes("3");
    if (um) {
      Requests.updateEntregaEmpresa({
        telefone: msg.from,
        formadepagamento: "card",
      });
      temalgumaobservacao(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "d" });
    }
    if (dois) {
      Requests.updateEntregaEmpresa({
        telefone: msg.from,
        formadepagamento: "money",
      });
      temalgumaobservacao(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "d" });
    }

    if (tres) {
      Requests.updateEntregaEmpresa({
        telefone: msg.from,
        formadepagamento: "pix",
      });
      temalgumaobservacao(client, msg.from);
      Requests.updateEtapa(msg.from, { etapa: "d" });
    }

    if (!um && !dois && !tres && message !== "voltar") {
      client.sendMessage(
        msg.from,
        `Desculpa, não consegui entender sua resposta.
  
Vamos tentar novamente, qual é a forma de pagamento ?

Por favor, escolha uma das opções ⬇️

1 - Cartão
2 - Dinheiro
3 - Pago, Pix, Pagamento online`
      );
    }
  }

  if (etapaRetrieve.etapa === "d") {
    voltar(msg.from, message, client);
    if (message !== "voltar") {
      const response = await Requests.updateEntregaEmpresa({
        telefone: msg.from,
        obs: msg.body,
      });

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
            Authorization: response.tokencoleta,
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => console.log(err));

      if (responseFood.errorCode) {
        client.sendMessage(
          msg.from,
          "Por algum motivo ouve uma falha no lançamento da entrega, tente novamente começando do início ⚠️"
        );
        Requests.updateEtapa(msg.from, { etapa: "a" });
      } else {
        const dados = {
          telefone: msg.from,
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

        client.sendMessage(
          msg.from,
          `Obrigado, seu pedido foi feito com sucesso! 😁
      
Assim que um de nossos entregadores aceitar seu pedido você será notificado.

Lembrando que coletas são de 0 a 15 minutos em dias normais.

Numero do pedido: ${response.id}
Endereço de entrega: ${response.entrega}
Observação: ${response.obs}`
        );

        Requests.updateEtapa(msg.from, { etapa: "a" });
      }
    }
  }
}

module.exports = { empresa };

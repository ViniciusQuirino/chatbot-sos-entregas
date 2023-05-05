// const { Requests } = require("./request.js");
// const { voltar } = require("./middlewares.js");

// // msgNumber = Dados do cliente
// // etapaRetrieve = verifica se é numero privado e retorna a etapa
// // codigotelefone = verifica se o numero enviado é igual ao numero de telefone cadastrado do código

// async function fisica(msg, etapaRetrieve, client) {
//   if (etapaRetrieve.etapa == "a" && msg.from != "5514996056869@c.us") {
//     client.sendMessage(
//       msg.from,
//       `Olá, eu sou o assistente virtual da empresa SOS Entregas e estou aqui para te ajudar. Oque você deseja nesse momento ?

// 1 - Fazer um pedido de entrega.
// 2 - Consultar valores de entrega.
// 3 - Falar com um representante.`
//     );
//   }
//   Requests.updateEtapa(msg.from, { etapa: "b" });

//   if (etapaRetrieve.etapa == "b") {
//       if(msg.body == "1"){
        
//       }

//     if (msg.body == "3") {
//       let telefone = msg.from.slice(2, 13);
//       client.sendMessage(
//         msg.from,
//         `Obrigado, aguarde um minuto um de nossos representantes irá te atender.`
//       );

//       client.sendMessage(
//         "5514996056869@c.us",
//         `Tem um cliente querendo falar com um representante.

// O chatbot foi desativado. Não se esqueça de ativar novamente para esse cliente após o final da conversa.`
//       );
//       client.sendMessage("5514996056869@c.us", `${telefone}`);

// //       client.sendMessage(
// //         "5514996056869@c.us",
// //         `Tem um cliente querendo falar com um representante.

// // O chatbot foi desativado. Não se esqueça de ativar novamente para esse cliente após o final da conversa.`
// //       );
// //       client.sendMessage("5514996056869@c.us", `${telefone}`);

//       await Requests.updateEtapa(msg.from, { ativado: false, etapa: "ç" });
//     }
//   }
// }

// module.exports = { fisica };

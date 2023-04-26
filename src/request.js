const { api } = require("./api");

class Requests {
  static async createClient(body) {
    api.post("/clientes", body);
  }
  static async updateClient(codigo, body) {
    api.patch(`/clientes/${codigo}`, body);
  }

  static async retrieveClient(codigo) {
    const response = await api.get(`/clientes/${codigo}`);

    return response.data;
  }

  static async retrieveEtapa(msg) {
    const final = msg.from.slice(msg.from.length - 4);
    if (final === "c.us") {
      const responseRetrieve = await api.get(`/etapas/${msg.from}`);

      if (responseRetrieve.data === null) {
        const responsePost = await api.post(`/etapas`, {
          telefone: msg.from,
          etapa: "a",
        });

        return responsePost.data;
      }
      return responseRetrieve.data;
    }
  }

  static async updateEtapa(from, body) {
    console.log(from);
    await api.patch(`/etapas/${from}`, body);

    return true;
  }

  static async createEntregaEmpresa(telefone, token) {
    await api.post(`/entregas`, {
      telefone: telefone,
      tokencoleta: token,
    });
  }
}

module.exports = { Requests };

const { api } = require("./api");

class Requests {
  static async createClient(body) {
    await api.post("/clientes", body);
  }
  static async updateClient(codigo, body) {
    await api.patch(`/clientes/${codigo}`, body);
  }

  static async retrieveClient(codigo) {
    let response = await api.get(`/clientes/${codigo}`);

    return response.data;
  }

  static async retrieveEtapa(msg) {
    let final = msg.from.slice(msg.from.length - 4);
    if (final === "c.us") {
      let responseRetrieve = await api.get(`/etapas/${msg.from}`);

      if (responseRetrieve.data === null) {
        let responsePost = await api.post(`/etapas`, {
          telefone: msg.from,
          etapa: "a",
        });

        return responsePost.data;
      }
      return responseRetrieve.data;
    }
  }

  static async updateEtapa(from, body) {
    await api.patch(`/etapas/${from}`, body);

    return true;
  }

  static async createEntregaEmpresa(data) {
    await api.post(`/entregas`, data);
  }

  static async updateEntregaEmpresa(data) {
    let response = await api.patch(`/entregas`, data);
    return response.data;
  }
}

module.exports = { Requests };

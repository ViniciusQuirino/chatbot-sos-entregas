const { api } = require("./api");

class Requests {
    static async createClient(body) {
        const response = await api.post("/clientes", body);

        return response;
    }
    static async updateClient(codigo, body) {
        await api.patch(`/clientes/${codigo}`, body);
    }

    static async retrieveClient(codigo) {
        let response = await api.get(`/clientes/${codigo}`);

        return response.data;
    }

    static async listAllClient() {
        let response = await api.get(`/clientes`);

        return response.data;
    }

    static async deleteClient(codigo) {
        let response = await api.delete(`/clientes/${codigo}`);

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
        const response = await api.patch(`/etapas/${from}`, body);

        return response.data;
    }

    static async createEntregaEmpresa(data) {
        await api.post(`/entregas`, data);
    }

    static async updateEntregaEmpresa(data) {
        let response = await api.patch(`/entregas`, data);
        return response.data;
    }
    static async listEntregasEmpresa(data, from, client) {
        let response = await api.get(`/entregas/${data}`);

        let texto = "";
        for (let dados of response.data) {
            texto += `
----------------------
Entrega: ${dados.id}
Endereço: ${dados.entrega ? dados.entrega : "Sem registro"}
Obs: ${dados.obs ? dados.obs : "Sem registro"}
Pagamento: ${dados.formadepagamento ? dados.formadepagamento : "Sem registro"}`;
        }
        client.sendMessage(from, texto);

        return response.data.length;
    }

    static async listarQuantidadeDeEntregasDeUmaEmpresa(codigo) {
        let response = await api.get(`/entregas/company/${codigo}`);

        return response.data;
    }

    static async requestCronJob() {
        let response = await api.get(`/entregas`);
        return response.data;
    }

    static async deletarEntregasEmpresa() {
        await fetch("https://database-sos.up.railway.app/webhook", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => res)
            .catch((err) => console.log(err));

        await api.delete("/entregas");
    }

    static async buscartelefonenobanco(telefone) {
        const response = await api.get(`/fisica/${telefone}`);

        return response.data;
    }

    static async excluirnumerocliente(empresa, numero) {
        let response = await api.delete(`/clientes/${empresa}/${numero}`);
        return response.data;
    }
}

module.exports = { Requests };

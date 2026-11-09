const form = document.getElementById("formChamado");
const lista = document.getElementById("listaChamados");

async function carregarChamados() {
    const resposta = await fetch("/chamados");
    const chamados = await resposta.json();

    lista.innerHTML = "";

    chamados.forEach(chamado => {
        lista.innerHTML += `
            <div class="chamado">
                <h3>${chamado.nome}</h3>
                <p><strong>Equipamento:</strong> ${chamado.equipamento}</p>
                <p><strong>Problema:</strong> ${chamado.descricao}</p>
                <p><strong>Estado:</strong> ${chamado.estado}</p>

                <div class="acoes">
                    <button onclick="editarChamado(${chamado.id})">Editar</button>
                    <button onclick="excluirChamado(${chamado.id})">Excluir</button>
                </div>
            </div>
        `;
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const chamado = {
        nome: document.getElementById("nome").value,
        equipamento: document.getElementById("equipamento").value,
        descricao: document.getElementById("descricao").value,
        estado: document.getElementById("estado").value
    };

    await fetch("/chamados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(chamado)
    });

    form.reset();
    carregarChamados();
});

async function excluirChamado(id) {
    await fetch(`/chamados/${id}`, {
        method: "DELETE"
    });

    carregarChamados();
}

async function editarChamado(id) {
    const nome = prompt("Nome:");
    const equipamento = prompt("Equipamento:");
    const descricao = prompt("Descrição:");
    const estado = prompt("Estado:");

    if (!nome || !equipamento || !descricao || !estado) {
        return;
    }

    await fetch(`/chamados/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome,
            equipamento,
            descricao,
            estado
        })
    });

    carregarChamados();
}

carregarChamados();

const uri = 'http://localhost:4000';

//Obtendo o título do servidor
const titulo = document.querySelector('header h1'); //DOM
fetch(uri)
    .then(resp => resp.json())
    .then(resp => titulo.innerHTML = resp.titulo);

//Obtendo as consultas do servidor e exibindo na tabela
const corpo = document.querySelector('table tbody'); //DOM
fetch(uri + '/telefone')
    .then(resp => resp.json())
    .then(resp => {
        resp.forEach(c => {
            const linha = document.createElement('tr')
            linha.innerHTML = `
                <td>${c.telefone_id}</td>
                <td contenteditable="true">${c.telefone}</td>
                <td contenteditable="true">${c.nome}</td>
                <td contenteditable="true">${c.obs}</td>
                <td><button onclick="alterar(this)">*</button><button onclick="excluir(${c.telefone_id})">-</button></td>
            `;
            corpo.appendChild(linha);
        });
    });

//Enviando uma nova consulta para o servidor
const form = document.querySelector('form'); //DOM
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const body = {
        telefone: form.telefone.value,
        nome: form.nome.value,
        obs: form.obs.value
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/10.3.1' },
        body: JSON.stringify(body)
    };

    fetch(uri + '/telefone', options)
        .then(resp => resp.status)
        .then(resp => resp === 201 ? window.location.reload() : alert(resp))
        .catch(err => console.error(err));
});

//Alterar uma consulta no servidor
function alterar(botao) {
    const linha = botao.parentNode.parentNode;
    const id = linha.children[0].innerText;
    const telefone = linha.children[1].innerText;
    const nome = linha.children[2].innerText;
    const obs = linha.children[3].innerText;

    const body = {
        telefone: telefone,
        nome: nome,
        obs: obs
    };

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/10.3.1' },
        body: JSON.stringify(body)
    };

    fetch(uri + '/telefone/' + id, options)
        .then(resp => resp.status)
        .then(resp => resp === 202 ? window.location.reload() : alert(resp))
        .catch(err => console.error(err));
}

//Excluir uma consulta do servidor
function excluir(id) {
    fetch(uri + '/telefone/' + id, { method: 'DELETE' })
        .then(resp => resp.status)
        .then(resp => resp === 204 ? window.location.reload() : alert(resp))
        .catch(err => console.error(err));
}

const form = document.getElementById('formTarefa');
const descricaoInput = document.getElementById('descricao');
const listaTarefas = document.getElementById('tarefas');

const url = 'http://localhost:5000/tarefas';

async function carregarTarefas() {
    const response = await fetch(url);
    const tarefas = await response.json();
    listaTarefas.innerHTML = '';
    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${tarefa.descricao} - <strong>${tarefa.status}</strong>
            <button onclick="concluirTarefa(${tarefa.id})">Concluir</button>
            <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
        `;
        listaTarefas.appendChild(li);
    });
}

async function adicionarTarefa(event) {
    event.preventDefault();
    const descricao = descricaoInput.value;
    const novaTarefa = { descricao };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaTarefa),
    });

    if (response.ok) {
        descricaoInput.value = '';
        carregarTarefas();
    }
}

async function excluirTarefa(id) {
    await fetch(`${url}/${id}`, { method: 'DELETE' });
    carregarTarefas();
}

async function concluirTarefa(id) {
    await fetch(`${url}/${id}`, { method: 'PUT' });
    carregarTarefas();
}

form.addEventListener('submit', adicionarTarefa);

carregarTarefas();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tarefas = [
    { id: 1, descricao: 'Estudar Node.js', status: 'pendente' },
    { id: 2, descricao: 'Fazer compras', status: 'pendente' }
];


app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

// Rota para adicionar tarefa
app.post('/tarefas', (req, res) => {
    const novaTarefa = req.body;
    novaTarefa.id = tarefas.length + 1;
    novaTarefa.status = 'pendente';
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

// Rota para excluir tarefa
app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    tarefas = tarefas.filter(tarefa => tarefa.id !== parseInt(id));
    res.status(204).send();
});

// Rota para concluir tarefa
app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const tarefa = tarefas.find(t => t.id === parseInt(id));
    if (tarefa) {
        tarefa.status = 'concluído';
        res.json(tarefa);
    } else {
        res.status(404).send('Tarefa não encontrada');
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

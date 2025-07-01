document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript carregado com sucesso!');
    
    const input = document.getElementById('exampleFormControlInput1');
    const btn = document.getElementById('btnAdicionar');
    const lista = document.querySelector('.lista_tar ul');
    // Carrega tarefas ao iniciar
    carregarTarefas();

    btn.addEventListener('click', function () {
        const titulo = input.value.trim();
        if (!titulo) return;

        fetch('/tarefa/adicionar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo })
        })
        .then(res => {
            if (!res.ok) return res.text().then(text => { throw new Error(text); });
            return res.json();
        })
        .then(tarefa => {
            adicionarTarefaNaLista(tarefa);
            input.value = '';
        })
        .catch(err => {
            alert('Erro ao adicionar tarefa: ' + err.message);
            console.error(err);
        });
    });

    function carregarTarefas() {
        fetch('/tarefa/listar')
            .then(res => res.json())
            .then(tarefas => {
                lista.innerHTML = '';
                tarefas.forEach(adicionarTarefaNaLista);
            });
    }

    function adicionarTarefaNaLista(tarefa) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span style="font-weight: bold;">Tarefa: ${tarefa.id}</span>
            <div class="vr" style="margin: 0 0 0 10px;"></div>
            <button type="button" class="btn btn-${tarefa.andamento ? 'success' : 'danger'} btn-sm btn-checklist" style="margin: 0 0 0 10px;">
                <i class="fa-solid fa-circle-check"></i>
            </button>
            <div class="vr" style="margin: 0 0 0 10px;"></div>
            <span class="titulo-tarefa" style="margin: 0 10px 0 10px;">${tarefa.titulo}</span>
            <button type="button" class="btn btn-warning btn-sm btn-editar" style="margin: 0 10px 0 10px;"><i class="fa-solid fa-pen-to-square"></i></button>
            <div class="vr"></div>
            <button type="button" class="btn btn-danger btn-sm btn-deletar" style="margin: 0 0 0 10px;"><i class="fa-solid fa-trash"></i></button>
        `;

        // Botão checklist
        li.querySelector('.btn-checklist').addEventListener('click', function () {
            fetch(`/tarefa/concluir/${tarefa.id}`, {
                method: 'PUT'
            })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao concluir tarefa');
                return res.json();
            })
            .then(tarefaConcluida => {
                this.classList.remove('btn-danger');
                this.classList.add('btn-success');
                tarefa.andamento = true;
            })
            .catch(err => alert(err.message));
        });

        // Botão deletar
        li.querySelector('.btn-deletar').addEventListener('click', function () {
            if (confirm('Deseja realmente deletar esta tarefa?')) {
                fetch(`/tarefa/deletar/${tarefa.id}`, { method: 'DELETE' })
                    .then(res => {
                        if (!res.ok) throw new Error('Erro ao deletar tarefa');
                        li.remove();
                    })
                    .catch(err => alert(err.message));
            }
        });

        // Botão editar
        li.querySelector('.btn-editar').addEventListener('click', function () {
            const novoTitulo = prompt('Novo título da tarefa:', tarefa.titulo);
            if (novoTitulo && novoTitulo.trim() !== '') {
                fetch(`/tarefa/editar/${tarefa.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ titulo: novoTitulo, andamento: tarefa.andamento })
                })
                .then(res => {
                    if (!res.ok) throw new Error('Erro ao editar tarefa');
                    return res.json();
                })
                .then(tarefaEditada => {
                    li.querySelector('.titulo-tarefa').textContent = tarefaEditada.titulo;
                    tarefa.titulo = tarefaEditada.titulo; // Atualiza objeto local
                })
                .catch(err => alert(err.message));
            }
        });

        lista.appendChild(li);
    }
});
// Seleciona os elementos do HTML (input, botão e a lista UL)
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

// Função simples para criar uma tag <li>
function criaLi() {
    const li = document.createElement('li');
    return li;
}

// Captura o evento de tecla pressionada no input
inputTarefa.addEventListener('keypress', function(e) {
    // 13 é o código da tecla ENTER
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return; // Se estiver vazio, não faz nada
        criaTarefa(inputTarefa.value);
    }
});

// Limpa a caixa de texto e coloca o cursor nela novamente
function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

// Cria o botão de "Apagar" ao lado de cada tarefa
function criaBotaoApagar(li) {
    li.innerText += ' '; // Adiciona um espaço para o botão não colar no texto
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    
    // Adiciona classe e atributo para estilização e acessibilidade
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar essa tarefa');
    
    li.appendChild(botaoApagar); // Coloca o botão dentro do <li>
}

// Função principal que orquestra a criação da tarefa
function criaTarefa(textInput) {
    const li = criaLi();
    li.innerText = textInput;
    tarefas.appendChild(li); // Adiciona o <li> na lista <ul>
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas(); // Salva sempre que criar uma nova
}

// Captura o clique no botão de "Adicionar tarefa"
btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

// Captura cliques em qualquer lugar do documento (para funcionar nos botões criados dinamicamente)
document.addEventListener('click', function(e) {
    const el = e.target;

    // Se o elemento clicado tiver a classe 'apagar'
    if (el.classList.contains('apagar')) {
        el.parentElement.remove(); // Remove o pai do botão (o <li>)
        salvarTarefas(); // Salva a lista atualizada (sem o item removido)
    }
});

// Salva as tarefas no LocalStorage do navegador
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    // Percorre cada <li> existente
    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        // Remove a palavra 'Apagar' que vem do botão e limpa espaços nas pontas
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    // Transforma o array em uma string JSON (texto) para poder salvar
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

// Lê o LocalStorage e recria as tarefas na tela ao recarregar a página
function adicionaTarefasSalvas() {
    const tarefasSalvas = localStorage.getItem('tarefas');

    if (!tarefasSalvas) return;

    const listaTarefas = JSON.parse(tarefasSalvas); // Transforma texto de volta em Array JavaScript

    for (let tarefa of listaTarefas) {
        criaTarefa(tarefa);
    }
}

// Executa a função assim que o código carrega
adicionaTarefasSalvas();
// cronômetro
let timer;
let isRunning = false;
let remainingTime = 25 * 60; 
const timerDisplay = document.getElementById('timer');

const startTimer = () => {
    timerDisplay.textContent = formatTime(remainingTime);

    timer = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timer);
            return;
        }
        remainingTime--;
        timerDisplay.textContent = formatTime(remainingTime);
    }, 1000);
};

// formato do cronômetro (minutos:segundos)
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// botões 
const startPomodoro = () => {
    if (!isRunning) {
        clearInterval(timer);
        remainingTime = 25 * 60;
        startTimer();
        toggleButtons('pause');
        isRunning = true;
    }
};

const startBreak = () => {
    if (!isRunning) {
        clearInterval(timer);
        remainingTime = 5 * 60; 
        startTimer();
        toggleButtons('pause');
        isRunning = true;
    }
};

const toggleButtons = (action) => {
    const startPauseButton = document.getElementById('startPauseButton');
    const breakButton = document.getElementById('breakButton');
    const pauseButton = document.getElementById('pauseButton');

    if (action === 'pause') {
        startPauseButton.classList.add('hidden');
        breakButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
        pauseButton.textContent = 'Pausar';
    } else {
        startPauseButton.classList.remove('hidden');
        breakButton.classList.remove('hidden');
        pauseButton.classList.add('hidden');
    }
};

const togglePauseResume = () => {
    if (isRunning) {
        pauseTimer();
    } else {
        resumeTimer();
    }
};

const pauseTimer = () => {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('pauseButton').textContent = 'Continuar'; 
};

const resumeTimer = () => {
    startTimer();
    isRunning = true;
    document.getElementById('pauseButton').textContent = 'Pausar'; 
};

document.getElementById('startPauseButton').addEventListener('click', startPomodoro);
document.getElementById('breakButton').addEventListener('click', startBreak);
document.getElementById('pauseButton').addEventListener('click', togglePauseResume);

// lista de tarefas
let tarefas = [];

function adicionarTarefa() {
    const input = document.getElementById('tarefa');
    const novaTarefa = input.value.trim();

    if (novaTarefa) {
        tarefas.push(novaTarefa);
        input.value = '';
        atualizarLista();
    }
}

function atualizarLista() {
    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = '';

tarefas.forEach((tarefa, index) => {
    const item = document.createElement('li');
    item.textContent = tarefa;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✔'; 
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => excluirTarefa(index, item);

    item.appendChild(deleteBtn);
    lista.appendChild(item);
});

const tarefasJson = JSON.stringify(tarefas);
console.log(tarefasJson);
}

function excluirTarefa(index, item) {
    item.classList.add('remover'); 

    setTimeout(() => {
        tarefas.splice(index, 1);
        atualizarLista();
    }, 500); 
}


        
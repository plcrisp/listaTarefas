"use strict";
let listElement = document.querySelector("#app ul");
let inputTarefa = document.querySelector("#tarefa");
let inputDeadline = document.querySelector("#deadline");
let buttonElement = document.querySelector("#app button");
let listaSalva = localStorage.getItem("@listagem_tarefas");
let tarefas = listaSalva !== null && JSON.parse(listaSalva) || [];
function listarTarefas() {
    listElement.innerHTML = "";
    tarefas.map((item) => {
        let todoElement = document.createElement("li");
        let tarefaText = document.createElement("span");
        tarefaText.textContent = `${item.t} até `;
        let deadlineText = document.createElement("span");
        deadlineText.textContent = `${item.data} `;
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        let posicao = tarefas.indexOf(item);
        linkElement.setAttribute("onclick", `deletarTarefa(${posicao})`);
        linkElement.setAttribute("style", "margin-left: 10px");
        let linkText = document.createTextNode("Excluir");
        linkElement.appendChild(linkText);
        todoElement.appendChild(tarefaText);
        todoElement.appendChild(deadlineText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    });
}
listarTarefas();
function adicionarTarefa() {
    if (inputTarefa.value === "" && inputDeadline.value === "") {
        alert("Digite alguma tarefa tarefa e sua deadline!");
        return false;
    }
    else if (inputTarefa.value === "") {
        alert("Digite alguma tarefa tarefa!");
        return false;
    }
    else if (inputDeadline.value === "") {
        alert("Digite a deadline da sua tarefa!");
        return false;
    }
    else if (inputDeadline.value[2] != '/' || inputDeadline.value[5] != '/') {
        alert("Insira uma data válida!");
    }
    else {
        let tarefaDigitada = {
            t: inputTarefa.value,
            data: inputDeadline.value,
        };
        tarefas.push(tarefaDigitada);
        inputTarefa.value = "";
        inputDeadline.value = "";
        listarTarefas();
        salvarDados();
    }
}
buttonElement.onclick = adicionarTarefa;
function deletarTarefa(posicao) {
    tarefas.splice(posicao, 1);
    listarTarefas();
    salvarDados();
}
function salvarDados() {
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}

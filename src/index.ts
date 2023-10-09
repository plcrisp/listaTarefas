let listElement = document.querySelector("#app ul") as HTMLUListElement;
let inputTarefa = document.querySelector("#tarefa") as HTMLInputElement;
let inputDeadline = document.querySelector("#deadline") as HTMLInputElement;
let buttonElement = document.querySelector("#app button") as HTMLElement;


let listaSalva = localStorage.getItem("@listagem_tarefas");
let tarefas: Tarefa[] = listaSalva !== null && JSON.parse(listaSalva) || [];

type Tarefa = {
    t: string;
    data: string;
}

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

function adicionarTarefa(){
    if(inputTarefa.value === "" && inputDeadline.value === ""){
        alert("Digite alguma tarefa tarefa e sua deadline!");
        return false;
    }else if(inputTarefa.value === ""){
        alert("Digite alguma tarefa tarefa!");
        return false;
    }else if(inputDeadline.value === ""){
        alert("Digite a deadline da sua tarefa!");
        return false;
    }else{
        let tarefaDigitada: Tarefa = {
            t: inputTarefa.value,
            data: inputDeadline.value,
        } 
        tarefas.push(tarefaDigitada);

        inputTarefa.value = "";
        inputDeadline.value = "";

        listarTarefas();

        salvarDados();
    }
}

buttonElement.onclick = adicionarTarefa;

function deletarTarefa(posicao: number){
    tarefas.splice(posicao, 1);

    listarTarefas();
    salvarDados();
}

function salvarDados(){
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas))
}
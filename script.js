const elementosSalvo = () => {
  const salvos = localStorage;
  for (let index = 0; index <= salvos.length; index += 1) {
    const elemento = salvos.getItem(index);
    if (elemento != undefined){
      criadorTarefa(elemento);
    }
  }
};

const salvarInformacao = () => {
  const tarefas = document.querySelectorAll('.conteudoTarefa');
  let numeroTarefa = 0;
  tarefas.forEach((tarefa) => {
    numeroTarefa += 1;
    localStorage.setItem(numeroTarefa, tarefa.innerHTML);
  });
};

const verificadorInput = () => {
  const tarefa = document.querySelector('#tarefaConteudo');
  tarefa.addEventListener("keyup", (key) => {
    if (key.keyCode === 13)  {
      if (tarefa.value.length != 0) {
        criadorTarefa(tarefa.value);
        salvarInformacao();
        tarefa.value = "";
      } else {
        alert("Digite uma tarefa");
      };
    };
  });
};

const criadorTarefa = (conteudo) => {
  const tarefas = document.querySelector('.tarefas');
  const tarefa = document.createElement('li');
  const conteudoTarefa = document.createElement('p');
  const icones = document.createElement('div');

  tarefa.classList.add('tarefa');
  conteudoTarefa.classList.add('conteudoTarefa');

  conteudoTarefa.innerHTML = conteudo;

  tarefas.appendChild(tarefa);
  tarefa.appendChild(conteudoTarefa);

};

window.onload = () => {
  elementosSalvo();
  verificadorInput();
};

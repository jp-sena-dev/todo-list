const mostrandoElementosSalvo = () => {
  for (let index = 0; index <= localStorage.length; index += 1) {
    let elemento = localStorage[index];
    if (elemento != undefined){
      criadorTarefa(elemento);
    };
  };
};

const salvarInformacao = () => {
  localStorage.clear();
  const tarefas = document.querySelectorAll('.conteudoTarefa');
  // localStorage.setItem('tarefas', JSON.stringify([1, 2, 3, 4]));
  tarefas.forEach((tarefa, index) => {
    localStorage.setItem(index, tarefa.innerHTML);
  });
};

const verificadorInput = () => {
  const tarefa = document.querySelector('#tarefaConteudo');
  tarefa.addEventListener("keyup", (tecla) => {
    if (tecla.key === 'Enter')  {
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

const clickDeletar = (tarefa, icone, conteudoHtml) => {
  icone.addEventListener("click", () => {
    tarefa.classList.add('deletado');
    setTimeout(() => {
      const conteudo = conteudoHtml.innerHTML;
      console.log(tarefa)
      tarefa.remove();
      salvarInformacao();
    }, 500);
  });
};

const criadorTarefa = (conteudo) => {
  const tarefas = document.querySelector('.tarefas');
  const tarefa = document.createElement('li');
  const conteudoTarefa = document.createElement('p');
  const icones = document.createElement('div');
  const iconeLixiera = document.createElement('i');
  const iconeEditar = document.createElement('i'); 

  tarefa.classList.add('tarefa');
  conteudoTarefa.classList.add('conteudoTarefa');
  iconeLixiera.classList.add('icon-delete');
  iconeEditar.classList.add('icon-edit');

  conteudoTarefa.innerHTML = conteudo;

  tarefas.appendChild(tarefa);
  tarefa.appendChild(conteudoTarefa);
  tarefa.appendChild(icones);
  icones.appendChild(iconeEditar);
  icones.appendChild(iconeLixiera);

  clickDeletar(tarefa, iconeLixiera, conteudoTarefa);
  // adicionarVerificadorClick(iconeEditar);
};

window.onload = () => {
  mostrandoElementosSalvo();
  verificadorInput();
};

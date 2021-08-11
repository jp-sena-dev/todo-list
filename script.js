/* mostrando elementos do localStorage */
const mostrandoElementosSalvo = () => {
  for (let index = 0; index <= localStorage.length; index += 1) {
    if (localStorage[index] != undefined){
      let informacoes = localStorage[index];
      criadorTarefa(informacoes);
    } else if (localStorage[`${index}concluido`]) {
      criadorTarefa(localStorage[`${index}concluido`], "S");
    };
  };
};

/* salvando informações no localStorage */
const salvarInformacao = () => {
  localStorage.clear();
  const tarefas = document.querySelectorAll(".tarefa");
  // localStorage.setItem('tarefas', JSON.stringify([1, 2, 3, 4]));
  tarefas.forEach((tarefa, index) => {
    const conteudo = tarefa.firstChild;
    if (tarefa.classList.length > 1) {
      localStorage.setItem(`${index}concluido`, conteudo.innerHTML);
    } else {
      localStorage.setItem(index, conteudo.innerHTML);
    }
  });
};


/* quando apertar a tecla enter */
const verificadorInput = () => {
  const tarefa = document.querySelector("#tarefaConteudo");
  tarefa.addEventListener("keyup", (tecla) => {
    if (tecla.key === 'Enter')  {
      if (tarefa.value.length != 0) {
        criadorTarefa(tarefa.value);
        salvarInformacao();
        tarefa.value = "";
      } else {
        alert('Digite uma tarefa');
      };
    };
  });
};

/* deletando tarefa */
const clickDeletar = (tarefa, icone) => {
  icone.addEventListener("click", () => {
    tarefa.classList.add("deletado");
    setTimeout(() => {
      tarefa.remove();
      salvarInformacao();
    }, 300);
  });
};

/* editar */
const clickEditar = (tarefa, icone) => {
  icone.addEventListener("click", () => {
    const quantidadeEditor = document.querySelectorAll(".editando");
    if (quantidadeEditor.length != 1) {
      const input = document.createElement("input");
      const conteudoTarefa = tarefa.children[0];

      input.classList.add("editando");
  
      input.value = conteudoTarefa.innerHTML;
      tarefa.insertBefore(input, conteudoTarefa);
      input.focus();

      conteudoTarefa.remove();
      opcoesEditar(tarefa, input);
    };
  });
};

const opcoesEditar = (tarefa, input) => {
  const conteudo = document.createElement("p");
  input.addEventListener("blur", () => {
    conteudo.innerHTML = input.value;
    tarefa.insertBefore(tarefa.appendChild(conteudo), input);
    input.remove();
    conteudo.classList.add("conteudoTarefa");
    salvarInformacao();
  });
  input.addEventListener("keyup", (tecla) => {
    if (tecla.key === 'Enter') {
      input.blur();
    };
  });
};

const concluido = (checkbox, tarefa, taConcluido) => {
  if (taConcluido == "concluido") {
    checkbox.checked = true;
    tarefa.classList.add("concluido");
  };
  checkbox.addEventListener("click", () => {
    if (checkbox.checked == true) {
      tarefa.classList.add("concluido");
      console.log(tarefa);
    } else {
      tarefa.classList.remove("concluido");
      console.log(tarefa);
    };
    salvarInformacao();
  });
};

/* mostrar tarefa na tela com todos os elementos */
const criadorTarefa = (...conteudo) => {
  const tarefas = document.querySelector(".tarefas");
  const tarefa = document.createElement("li");
  const caixaVerificador = document.createElement("input");
  const conteudoTarefa = document.createElement("p");
  const icones = document.createElement("div");
  const iconeLixiera = document.createElement("i");
  const iconeEditar = document.createElement("i"); 
  
  tarefa.classList.add("tarefa");
  conteudoTarefa.classList.add("conteudoTarefa");
  iconeLixiera.classList.add("icon-delete");
  iconeEditar.classList.add("icon-edit");
  
  conteudoTarefa.innerHTML = conteudo[0];
  
  clickDeletar(tarefa, iconeLixiera);
  clickEditar(tarefa, iconeEditar);
  
  tarefas.appendChild(tarefa);
  tarefa.appendChild(conteudoTarefa);
  tarefa.appendChild(icones);
  icones.appendChild(iconeEditar);
  icones.appendChild(iconeLixiera);

  //checkbox 
  tarefa.appendChild(caixaVerificador);

  caixaVerificador.setAttribute("type", "checkbox");
  caixaVerificador.classList.add('marcador');
  concluido(caixaVerificador, tarefa, conteudo.length > 1? "concluido":"n");
  
};

window.onload = () => {
  mostrandoElementosSalvo();
  verificadorInput();
};

const quantidadeCaracteres = 147;
/* mostrando elementos do localStorage */
const mostrandoElementosSalvo = () => {
  for (let index = 0; index <= localStorage.length; index += 1) {
    if (localStorage[index] != undefined){
      let informacoes = localStorage[index];
      criadorTarefa(informacoes);
    } else if (localStorage[`${index}concluido`]) {
      criadorTarefa(localStorage[`${index}concluido`], "s");
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
const inputPricipal = () => {
  const tarefa = document.querySelector("#tarefaConteudo");
  tarefa.addEventListener("keyup", (tecla) => {
    if (tecla.key === 'Enter')  {
      if (tarefa.value.length > quantidadeCaracteres || tarefa.value.length == 0) {
        alerta();
      } else{
        criadorTarefa(tarefa.value);
        salvarInformacao();
        tarefa.value = "";
      };
    };
  });
};

/* alerta do input */
const alerta = () => {
  const alerta = document.querySelector("#alerta");

  alerta.classList.add("aparente");
  setTimeout(() => {
    alerta.classList.remove("aparente");
  }, 2500);
};

/*deletando tarefas concluidas */
const cancelarExcluir = () => {
  const botaoCancelar = document.querySelector("#deletarConcluidoCancelar");
  botaoCancelar.addEventListener("click", () => {
    const telaDeletar = document.querySelector("#deletarConcluidoTela");
    telaDeletar.classList.remove("aparente");
  });
};

const excluir = () => {
  const botaoCancelar = document.querySelector("#deletarConcluidoConfirmar");
  botaoCancelar.addEventListener("click", () => {
    const tarefasConcluido = document.querySelectorAll(".concluido");
    const telaDeletar = document.querySelector("#deletarConcluidoTela");
    telaDeletar.classList.remove("aparente");
    tarefasConcluido.forEach((tarefa) => {
      tarefa.remove();
    });
    salvarInformacao();
  });
};

const deletarConcluidos = () => {
  const iconeDeletar = document.querySelector(".deletarConcluido");
  iconeDeletar.addEventListener("click", () => {
    const telaDeletar = document.querySelector("#deletarConcluidoTela");
    telaDeletar.classList.add("aparente");
    cancelarExcluir();
    excluir();
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
  let conteudo = document.createElement("p");
  input.addEventListener("blur", () => {
    if (input.value.length > quantidadeCaracteres || input.value.length <= 0) {
      alerta();
      input.focus();
    } else {
      conteudo.innerHTML = input.value;
      tarefa.insertBefore(tarefa.appendChild(conteudo), input);
      input.remove();
      conteudo.classList.add("conteudoTarefa");
      salvarInformacao();
    };
  });
  input.addEventListener("keyup", (tecla) => {
    if (tecla.key === 'Enter') {
      if (input.value.length > quantidadeCaracteres) {
        alerta();
      }else {
        input.blur();
      };
    };
  });
};

const tarefaConcluido = (checkbox, tarefa, concluido) => {
  if (concluido == "s") {
    checkbox.checked = true;
    tarefa.classList.add("concluido");
  };
  checkbox.addEventListener("click", () => {
    if (checkbox.checked == true) {
      tarefa.classList.add("concluido");
    } else {
      tarefa.classList.remove("concluido");
    };
    salvarInformacao();
  });
};

/* mostrar tarefa na tela com todos os elementos */
const criadorTarefa = (conteudo, concluido = "n") => {
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
  
  conteudoTarefa.innerHTML = conteudo;
  
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
  tarefaConcluido(caixaVerificador, tarefa, concluido);
  
};

window.onload = () => {
  mostrandoElementosSalvo();
  inputPricipal();
  deletarConcluidos();
};

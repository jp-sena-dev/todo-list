/*número de caracteres */
const quantidadeCaracteres = 146;

/* alerta de algo errado */
const alerta = (erro) => {
  const alerta = document.querySelector('#alerta');
  const texto = document.createElement('p');
  const quantidadeTexto = document.querySelector('.pAlerta');
  
  if (!quantidadeTexto){
    alerta.classList.add('aparente');
    texto.innerHTML = erro;
    alerta.appendChild(texto);
    texto.classList.add('pAlerta');
    setTimeout(() => {
      alerta.classList.remove('aparente');
      texto.classList.remove('pAlerta');
      texto.innerHTML = '';
    }, 2500);
  }

};

/* criando tarefas salvas no localStorage */
const mostrandoElementosSalvo = () => {
  for (let index = 0; index <= localStorage.length; index += 1) {
    if (localStorage[index]){
      let informacoes = localStorage[index];
      criadorTarefa(informacoes);
    } else if (localStorage[`${index}concluido`]) {
      criadorTarefa(localStorage[`${index}concluido`], true);
    }
  };
};
/* verifica se a tarefa tem a class concluido */
const concluido = (tarefa) => {
  let concluido = false;
  tarefa.classList.forEach((classe) => {
    if (classe == 'concluido'){
      concluido = true;
    }
  });
  return concluido;
};

/* salvando informações no localStorage */
const salvarInformacao = () => {
  localStorage.clear();
  const tarefas = document.querySelectorAll('.tarefa');
  tarefas.forEach((tarefa, index) => {
    const conteudo = tarefa.firstChild;
    if (concluido(tarefa)) {
      localStorage.setItem(`${index}concluido`, conteudo.innerHTML);
    } else {
      localStorage.setItem(index, conteudo.innerHTML);
    }
  });
};


/* quando apertar a tecla enter no input principal */
const inputPricipal = () => {
  const tarefa = document.querySelector('#tarefaConteudo');
  tarefa.addEventListener('keyup', (tecla) => {
    if (tecla.key === 'Enter')  {
      if (tarefa.value.length > quantidadeCaracteres || tarefa.value.length == 0) {
        alerta('Verifique a quantidade de caracteres');
      } else{
        criadorTarefa(tarefa.value);
        salvarInformacao();
        tarefa.value = '';
      }
    }
  });
};


/* botão cancelar (excluir concluídos) */
const cancelarExcluirConcluidos = () => {
  const botaoCancelar = document.querySelector('#deletarConcluidoCancelar');
  botaoCancelar.addEventListener('click', () => {
    const telaDeletar = document.querySelector('#deletarConcluidoTela');
    telaDeletar.classList.remove('aparente');
  });
};

/* botão confirmar (excluir concluídos) */
const excluirConcluidos = () => {
  const botaoCancelar = document.querySelector('#deletarConcluidoConfirmar');
  botaoCancelar.addEventListener('click', () => {
    const tarefasConcluido = document.querySelectorAll('.concluido');
    const telaDeletar = document.querySelector('#deletarConcluidoTela');
    telaDeletar.classList.remove('aparente');
    tarefasConcluido.forEach((tarefa) => {
      tarefa.remove();
    });
    salvarInformacao();
  });
};

/* tela de confirmação para deletar todos elementos concluídos */
const telaDeletarConcluidos = () => {
  const iconeDeletar = document.querySelector('.deletarConcluido');
  iconeDeletar.addEventListener('click', () => {
    const telaDeletar = document.querySelector('#deletarConcluidoTela');
    if (document.querySelector('.concluido')) {
      telaDeletar.classList.add('aparente');
      cancelarExcluirConcluidos();
      excluirConcluidos();
    } else {
      alerta('Conclua alguma tarefa');
    }
  });
};

/* deletando tarefa */
const clickDeletar = (tarefa, icone) => {
  icone.addEventListener('click', () => {
    tarefa.classList.add('deletado');
    setTimeout(() => {
      tarefa.remove();
      salvarInformacao();
    }, 300);
  });
};

/* editar */
const clickEditar = (tarefa, icone) => {
  icone.addEventListener('click', () => {
    const quantidadeEditor = document.querySelectorAll('.editando');
    if (quantidadeEditor.length !== 1) {
      const input = document.createElement('input');
      const conteudoTarefa = tarefa.children[0];

      input.classList.add('editando');
  
      input.value = conteudoTarefa.innerHTML;
      tarefa.insertBefore(input, conteudoTarefa);
      input.focus();

      conteudoTarefa.remove();
      opcoesEditar(tarefa, input);
    }
  });
};

/* interatividade enquanto esta editando a tarefa */
const opcoesEditar = (tarefa, input) => {
  let conteudo = document.createElement('p');
  input.addEventListener('blur', () => {
    if (input.value.length > quantidadeCaracteres || input.value.length <= 0) {
      alerta('Verifique a quantidade de caracteres');
      input.focus();
    } else {
      conteudo.innerHTML = input.value;
      tarefa.insertBefore(tarefa.appendChild(conteudo), input);
      input.remove();
      conteudo.classList.add('conteudoTarefa');
      salvarInformacao();
    }
  });
  input.addEventListener('keyup', (tecla) => {
    if (tecla.key === 'Enter') {
      if (input.value.length > quantidadeCaracteres) {
        alerta('Verifique a quantidade de caracteres');
      }else {
        input.blur();
      }
    }
  });
};

/* Check box (marcar como concluído) */
const tarefaConcluido = (checkbox, tarefa, concluido) => {
  if (concluido) {
    checkbox.checked = true;
    tarefa.classList.add('concluido');
  }
  checkbox.addEventListener('click', () => {
    if (checkbox.checked === true) {
      tarefa.classList.add('concluido');
    } else {
      tarefa.classList.remove('concluido');
    }
    salvarInformacao();
  });
};

/* mostrar tarefa na tela com todos os elementos */
const criadorTarefa = (conteudo, concluido = false) => {
  const tarefas = document.querySelector('.tarefas');
  const tarefa = document.createElement('li');
  const caixaVerificador = document.createElement('input');
  const conteudoTarefa = document.createElement('p');
  const icones = document.createElement('div');
  const iconeLixiera = document.createElement('i');
  const iconeEditar = document.createElement('i'); 

  tarefa.classList.add('tarefa');
  conteudoTarefa.classList.add('conteudoTarefa');
  iconeLixiera.classList.add('icon-delete');
  iconeEditar.classList.add('icon-edit');
  
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

  caixaVerificador.setAttribute('type', 'checkbox');
  caixaVerificador.classList.add('marcador');
  tarefaConcluido(caixaVerificador, tarefa, concluido);
};

window.onload = () => {
  telaDeletarConcluidos();
  mostrandoElementosSalvo();
  inputPricipal();
};

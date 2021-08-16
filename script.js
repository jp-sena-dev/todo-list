/*número de caracteres */
const quantidadeCaracteres = 146;

/* alerta de algo errado */
const alertaErro = (textoErro) => {
  const alerta = document.querySelector('#alerta');
  const alertaParagrafo = document.createElement('p');
  const temaLerta = document.querySelector('.pAlerta');
  
  if (!temaLerta){
    alerta.classList.add('aparente');
    alerta.appendChild(alertaParagrafo);
    alertaParagrafo.innerHTML = textoErro;
    alertaParagrafo.classList.add('pAlerta');
    setTimeout(() => {
      alerta.classList.remove('aparente');
      alertaParagrafo.classList.remove('pAlerta');
      alertaParagrafo.innerHTML = '';
    }, 2500);
  }

};

/* criando tarefas salvas no localStorage */
const mostrandoElementosSalvo = () => {
  for (let chaveTarefa = 0; chaveTarefa <= localStorage.length; chaveTarefa += 1) {
    if (localStorage[chaveTarefa]){
      let informacoesTarefa = localStorage[chaveTarefa];
      criadorTarefa(informacoesTarefa);
    } else if (localStorage[`${chaveTarefa}concluido`]) {
      criadorTarefa(localStorage[`${chaveTarefa}concluido`], true);
    }
  };
};

/* verifica se a tarefa tem a class concluido */
const tarefaConcluida = (tarefa) => {
  let taConcluido = false;
  tarefa.classList.forEach((classe) => {
    if (classe === 'concluido'){
      taConcluido = true;
    }
  });
  return taConcluido;
};

/* salvando informações no localStorage */
const salvarInformacao = () => {
  localStorage.clear();
  const tarefas = document.querySelectorAll('.tarefa');
  tarefas.forEach((tarefa, index) => {
    const conteudoTarefa = tarefa.firstChild;
    if (tarefaConcluida(tarefa)) {
      localStorage.setItem(`${index}concluido`, conteudoTarefa.innerHTML);
    } else {
      localStorage.setItem(index, conteudoTarefa.innerHTML);
    }
  });
};


/* quando apertar a tecla enter no input principal */
const inputPricipal = () => {
  const tarefaInput = document.querySelector('#inputTarefa');
  tarefaInput.addEventListener('keyup', (tecla) => {
    if (tecla.key === 'Enter')  {
      if (tarefaInput.value.length > quantidadeCaracteres) {
        alertaErro('O máximo de caracteres é 146');
      } else if (tarefaInput.value.length === 0) {
        alertaErro('Digite algo');
      } else{
        criadorTarefa(tarefaInput.value);
        tarefaInput.value = '';
        salvarInformacao();
      }
    }
  });
};


/* botão cancelar (excluir concluídos) */
const cancelarExcluirConcluidos = () => {
  const botaoCancelarDelete = document.querySelector('#deletarConcluidoCancelar');
  botaoCancelarDelete.addEventListener('click', () => {
    const telaDeletarConcluidos = document.querySelector('#deletarConcluidoTela');
    telaDeletarConcluidos.classList.remove('aparente');
  });
};

/* botão confirmar (excluir concluídos) */
const excluirConcluidos = () => {
  const botaoConfirmarDelete = document.querySelector('#deletarConcluidoConfirmar');
  botaoConfirmarDelete.addEventListener('click', () => {
    const tarefasConcluidas = document.querySelectorAll('.concluido');
    const telaDeletarConcluidos = document.querySelector('#deletarConcluidoTela');
    telaDeletarConcluidos.classList.remove('aparente');
    tarefasConcluidas.forEach((tarefaConcluida) => {
      tarefaConcluida.remove();
    });
    salvarInformacao();
  });
};

/* tela de confirmação para deletar todos elementos concluídos */
const telaDeletarTarefasConcluidas = () => {
  const iconeDeletarConcluidos = document.querySelector('.deletarConcluido');
  iconeDeletarConcluidos.addEventListener('click', () => {
    const telaDeletarConcluidos = document.querySelector('#deletarConcluidoTela');
    if (document.querySelector('.concluido')) {
      telaDeletarConcluidos.classList.add('aparente');
      cancelarExcluirConcluidos();
      excluirConcluidos();
    } else {
      alertaErro('Conclua alguma tarefa');
    }
  });
};

/* deletando tarefa */
const clickDeletarTarefa = (tarefa, icone) => {
  icone.addEventListener('click', () => {
    tarefa.classList.add('deletado');
    setTimeout(() => {
      tarefa.remove();
      salvarInformacao();
    }, 300);
  });
};

/* editar */
const clickEditarTarefa = (tarefa, icone) => {
  icone.addEventListener('click', () => {
    if (document.querySelectorAll('.editando')) {
      const inputEditar = document.createElement('input');
      const conteudoTarefa = tarefa.children[0];

      inputEditar.classList.add('editando');
  
      inputEditar.value = conteudoTarefa.innerHTML;
      tarefa.insertBefore(inputEditar, conteudoTarefa);
      inputEditar.focus();

      conteudoTarefa.remove();
      opcoesEditarTarefa(tarefa, inputEditar);
    }
  });
};

/* interatividade enquanto esta editando a tarefa */
const opcoesEditarTarefa = (tarefa, input) => {
  const paragrafo = document.createElement('p');  
  input.addEventListener('keyup', (tecla) => {
    if (tecla.key === 'Enter') {
      input.blur();
    }
  });

  input.addEventListener('blur', () => {
    if (input.value.length > quantidadeCaracteres) {
      alertaErro('O máximo de caracteres é 146');
      input.focus();
    } else if (input.value.length === 0) {
      alertaErro('Digite algo');
      input.focus();
    } else {
      paragrafo.innerHTML = input.value;
      tarefa.insertBefore(tarefa.appendChild(paragrafo), input);
      input.remove();
      paragrafo.classList.add('conteudoTarefa');
      salvarInformacao();
    }
  });
};

/* Check box (marcar como concluído) */
const marcandoTarefaConcluido = (checkbox, tarefa, concluido) => {
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
const criadorTarefa = (conteudo, taConcluido = false) => {
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
  
  clickDeletarTarefa(tarefa, iconeLixiera);
  clickEditarTarefa(tarefa, iconeEditar);
  
  tarefas.appendChild(tarefa);
  tarefa.appendChild(conteudoTarefa);
  tarefa.appendChild(icones);
  icones.appendChild(iconeEditar);
  icones.appendChild(iconeLixiera);

  //checkbox 
  tarefa.appendChild(caixaVerificador);

  caixaVerificador.setAttribute('type', 'checkbox');
  caixaVerificador.classList.add('marcador');
  marcandoTarefaConcluida(caixaVerificador, tarefa, taConcluido);
};

window.onload = () => {
  telaDeletarTarefasConcluidas();
  mostrandoElementosSalvo();
  inputPricipal();
};

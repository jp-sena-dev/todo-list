const checkKeyInput = () => {
  const taskInput = document.querySelector("#taskContent");
  taskInput.addEventListener("keyup", (key) => {
    if (key.keyCode === 13)  {
      if (taskInput.value.length != 0) {
        creatTask(taskInput.value);
        taskInput.value = " ";
      } else {
        alert("Digite uma tarefa");
      };
    };
  });
};

const creatTask = (content) => {
  const tasks = document.querySelector('.tasks');
  const task = document.createElement('li');
  const taskContent = document.createElement('p');
  const icons = document.createElement('div');

  taskContent.innerHTML = content;

  tasks.appendChild(task);
  task.appendChild(taskContent);

};

window.onload = () => {
  checkKeyInput();
};
